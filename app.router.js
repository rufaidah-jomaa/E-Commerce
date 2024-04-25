import connectDB from './DB/connection.js'
import authRouter from './src/modules/auth/auth.router.js'
import categoryRouter from './src/modules/category/category.router.js'
import productRouter from './src/modules/product/product.router.js'
import userRouter from './src/modules/user/user.router.js'
 const initApp = (express,app)=>{
    connectDB();
    app.use(express.json())
    app.get('/',(req,res)=>{
        return res.status(200).json("welcome")
    })
    app.use('/auth',authRouter)
    app.use('/category',categoryRouter)
    app.use('/product',productRouter)
    app.use('/user',userRouter)
    app.use('*',(req,res)=>{
        return res.status(404).json("Page not found")
    })
}
export default initApp;