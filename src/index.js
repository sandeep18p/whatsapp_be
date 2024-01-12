import mongoose from "mongoose";
import app from "./app.js";
import logger from './configs/logger.config.js'



const {DATABASE_URL}=process.env;
const PORT = process.env.PORT || 8000;
let server;


    //exit on mongo error
    mongoose.connection.on("error",(err)=>{
        logger.error(`Mongodb connection error : ${err}`);
        process.exit(1);//ye server close karta ahi
    })


    //mongodb debug mode
    if(process.env.NODE_ENV !== "production"){
      mongoose.set("debug",true);
    }

//connect to db
mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true}).then(()=>{
        logger.info('Connected to Mongodb')
    })





server=app.listen(PORT, () => {
    logger.info(`Server is running at ${PORT}`);
});

//handle server errors
const exitHandler =()=>{
    if(server){
     logger.info("Server closed");
     process.exit(1);
    }else{
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) =>{
logger.error(error);
exitHandler();
}
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);


//SIGTERM signal
process.on("SIGTERM", ()=>{
    if(server){
        logger.info("Server closed");
        process.exit(1);
       }
})
