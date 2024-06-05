import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import subCategoryModel from "../../../DB/models/SubCategory.model.js";
import cloudinary from "../../services/cloudinary.js";
import productModel from "../../../DB/models/Product.model.js";
import { pagination } from "../../services/pagination.js";

export const testProduct = (req, res, next) => {
  return res.json("Product");
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, discount, categoryId, subCategoryId } = req.body;

    const checkCategory = await categoryModel.findById(categoryId);
    if (!checkCategory) {
      return res.status(404).json({ message: "category not found!" });
    }

    const checkSubCategory = await subCategoryModel.findOne({
      _id: subCategoryId,
      categoryId: categoryId,
    });
    if (!checkSubCategory) {
      return res.status(404).json({ message: "subCategory not found!" });
    }

    req.body.slug = slugify(name);

    req.body.finalPrice = price - (price * discount) / 100;

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.mainImage[0].path,
      { folder: `${process.env.App_Name}/products/${name}` }
    );
    req.body.mainImage = { secure_url, public_id };

    req.body.subImages = [];
    for (const file of req.files.subImages) {
      //file : iteration
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.App_Name}/products/${name}/subImages` }
      );
      req.body.subImages.push({ secure_url, public_id });
    }

    req.body.createdBy = req.user._id;
    req.body.updatedBy = req.user._id;
    const product = await productModel.create(req.body);
    return res
      .status(200)
      .json({ message: "product added successfully!", product });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};

export const getDetails = async (req, res) => {
  const product = await productModel.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      //Populateبعملها كمان..populate النتيجة اللي جاي من اول
      path: "userId",
      select: "userName",
    },
  }); //productId
  if (!product) {
    return res.json({ message: "product not found" });
  }
  return res.status(200).json({ message: "success", product });
};

export const getProducts = async (req, res) => {
  const { skip, limit } = pagination(req.query.page, req.query.limit);
  let queryObj = { ...req.query };
  const execQuery = ["page", "limit", "sort", "search","fields"];
  execQuery.map((ele) => {
    delete queryObj[ele];
  });
  queryObj = JSON.stringify(queryObj);
  queryObj = queryObj.replace(
    /gt|gte|lt|lte|in|nin|eq/g,
    (match) => `$${match}`
  );
  queryObj = JSON.parse(queryObj);

  const mongooseQuery = productModel
    .find({price:1000},queryObj)
    .skip(skip)
    .limit(limit);
  if (req.query.search) {
     mongooseQuery.find({
      $or: [
        { name: { $regex: req.query.search } },
        { description: { $regex: req.query.search } },
      ],
    });
  }
  if (req.query.fields) {
     mongooseQuery.select(req.query.fields);
  }
  const products = await mongooseQuery.sort(req.query.sort);
  return res.json({ message: "success", products });
};
