import createHttpError from "http-errors";
import { UserModel } from "../models/index.js";

export const findUser = async (userId)=>{
    const user = await UserModel.findById(userId);
    if(!user)throw createHttpError.BadRequest("please fill all the fields");
    return user;
}

export const searchUsers = async (keyword, userId) => {
    const users = await UserModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } }, //by name search
        { email: { $regex: keyword, $options: "i" } }, // oy by email
      ],
    }).find({
      _id: { $ne: userId },
    });
    return users;
  };
  