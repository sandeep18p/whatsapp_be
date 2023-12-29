import express  from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload'
import cors from 'cors';


dotenv.config();
const app = express();

//morgan
if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}
//parse json request url
app.use(express.json());
//parse json request body
app.use(express.urlencoded({extended:true}));

//helmet
app.use(helmet()) ;
app.use(mongoSanitize()) ;

//enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(
    fileUpload ({
    useTempFiles: true,
}));

//cors
app.use(
    cors()
)

app.get("/", (req,res)=>{
 res.send("hello from server");
});
app.post("/test", (req,res)=>{
    res.send(req.body);
   });

export default app;