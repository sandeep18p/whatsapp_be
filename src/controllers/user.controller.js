import createHttpError from "http-errors";
import logger from "../configs/logger.config.js"
import { searchUsers as searchUsersService} from "../services/user.service.js"

export const searchUsers = async(req,res,next)=>{
    try{
        const keyword =  req.query.search;
        if(!keyword){
            logger.error("Please aff a search query first");
            throw createHttpError.BadRequest("Oops... Something went wrong !");
        }
        const users = await searchUsersService(keyword, req.user.userId);// req.user.userId ye yaha pe islie paas kar re hai because kyuki apan apan id send karke contact list search jab us hoga to khudko nhi dikhana hai
        res.status(200).json(users);
   
    }catch(error){

    }
}