import cartModel from "../../../DB/models/Cart.model.js";
import orderModel from "../../../DB/models/Order.model.js";
import productModel from "../../../DB/models/Product.model.js";
import userModel from "../../../DB/models/User.model.js";
import couponModel from "../../../DB/models/coupon.model.js";
import Stripe from "stripe";
import createInvoice from "../../services/pdf.js";
import { sendEmail } from "../../services/sendEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import fs from 'fs'

export const create = async (req, res) => {
  //return res.json(req.user._id)
  const { couponCode } = req.body;
  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart || cart.products.length == 0) {
    return res.json({ message: "cart is empty!" });
  }

  req.body.products = cart.products; // add to req.body the products

  if (req.body.couponCode) {
    const coupon = await couponModel.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(404).json({ message: "coupon not found!" });
    }
    if (coupon.expiredDate < new Date()) {
      return res.status(404).json({ message: "coupon expired!" });
    }
    if (coupon.usedBy.includes(req.user._id)) {
      return res.status(409).json({ message: "coupon already used" });
    }
    req.body.coupon = coupon;
  }
  if (req.body.coupon) {
    await couponModel.findOneAndUpdate(
      { _id: req.body.coupon._id },
      { $addToSet: { usedBy: req.user._id } }
    );
  }
  let finalProductsList = [];
  let totalPrice = 0;
  for (let product of req.body.products) {
    const checkProduct = await productModel.findOne({
      _id: product.productId,
      stock: { $gte: product.quantity },
    });
    if (!checkProduct) {
      return res
        .status(400)
        .json({ message: "product quantity not available" });
    }
    product = product.toObject();
    product.productName = checkProduct.name; //المعلومات تخزن جوا الداتابيس في المونجوز على شكل(Bson) .. Binary Json
    product.unitPrice = checkProduct.price;
    product.discount = checkProduct.discount;
    product.finalPrice = product.quantity * checkProduct.finalPrice;
    totalPrice += product.finalPrice;
    finalProductsList.push(product);
  }

  const user = await userModel.findById(req.user._id);

  if (!req.body.address) {
    req.body.address = user.Address;
  }
  if (!req.body.phone) {
    req.body.phone = user.phone;
  }

  //if(order.paymentType=='cart'){}
  /* const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data:{
            currency:'USD',
            unit_amount:(totalPrice - (totalPrice * ((req.body.coupon?.discountPercentage || 0))/100)),
            product_data:{name:user.username}
          },
          quantity:1
    }],
    mode:'payment',
    success_url: `http://www.facebook.com`,
    cancel_url: `http://www.youtube.com`,
     })
     return res.json(session)*/
  const order = await orderModel.create({
    userId: req.user._id,
    products: finalProductsList,
    amount:totalPrice -(totalPrice * (req.body.coupon?.discountPercentage || 0)) / 100,
    address: req.body.address,
    phoneNumber: req.body.phone,
    updatedBy: req.user._id,
  });
  if (order) {
   
    const invoice = {
      shipping: {
        name: user.username,
        address: order.address,
        phone:order.phoneNumber
      },
      items: order.products,
      subtotal: order.amount,
      paid: 0,
      invoice_nr: 1234,
    };
    const file="invoice.pdf"
  createInvoice(invoice,file);
  const x=''
    sendEmail(user.email,"Purchase Invoice ",user.username,x,"Invoice",true)

    for (const product of req.body.products) {
      await productModel.findOneAndUpdate(
        { _id: product.productId },
        {
          $inc: {
            stock: -product.quantity,
          },
        }
      );
    }
  }

  await cartModel.findOneAndUpdate({ userId: req.user._id }, { products: [] });

  return res.json({ message: "success", order });
};
export const getOrders = async (req, res) => {
  const orders = await orderModel.find({
    $or: [
      {
        status: "pending",
      },
      {
        status: "confirmed",
      },
    ],
  });
  return res.status(200).json({ message: "success", orders });
};

export const getMyOrders = async (req, res) => {
  const orders = await orderModel.find({ userId: req.user._id });
  return res.status(200).json({ message: "success", orders });
};

export const changeStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await orderModel.findById(orderId);
  if (!order) {
    return res.status(400).json({ message: "order not found" });
  }
  order.status = status;
  order.save();
  return res.status(200).json({ message: "success", order });
};
