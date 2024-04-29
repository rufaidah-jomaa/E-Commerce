import connectDB from "./DB/connection.js";
import authRouter from "./src/modules/auth/auth.router.js";
import categoryRouter from "./src/modules/category/category.router.js";
import productRouter from "./src/modules/product/product.router.js";
import userRouter from "./src/modules/user/user.router.js";
import cors from "cors";
const initApp = (express, app) => {
  connectDB();
  var whitelist = ["http://example1.com", "http://example2.com"];
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.status(200).json("welcome");
  });
  app.use("/auth", authRouter);
  app.use("/category", categoryRouter);
  app.use("/product", productRouter);
  app.use("/user", userRouter);
  app.use("*", (req, res) => {
    return res.status(404).json("Page not found");
  });
};
export default initApp;
