import createHttpError from "http-errors";
import logger from "../configs/logger.config.js"
import ConversationModel from "../models/ConversationModel.js";
import UserModel from "../models/userModel.js";

export const doesConversationExist = async(sender_id, receiver_id)=>{
   let convos = await ConversationModel.find({
    isGroup: false,
    $and: [
        {users: {$elemMatch: {$eq: sender_id}}},
        {users: {$elemMatch: {$eq: receiver_id}}},
    ],
   })
   .populate("users", "-password")
   .populate("latestMessage");

   if(!convos)throw createHttpError.BadRequest(" oops.. something went wrong !");

   //populate message model
   convos = await UserModel.populate(convos, {
    path: "latestMessage.sender", //latest message ka sender ko nikal re
    select: "name email picture status" // jo jo chiz chahiye wo usko select kar ra hai
   })
   return convos[0]; //pehle return kar re
};

export const createConversation = async(data)=>{
    const newConvo = await ConversationModel.create(data);
    if(!newConvo){
        throw createHttpError.BadRequest(" oops.. something went wrong !");
    }
    return newConvo;
};



export const populateConversation = async (
    id,
    fieldToPopulate,
    fieldsToRemove
  ) => {
    const populatedConvo = await ConversationModel.findOne({ _id: id }).populate(
      fieldToPopulate,
      fieldsToRemove
    );
    if (!populatedConvo)
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    return populatedConvo;
  };


  export const getUserConversations = async (user_id) => {
    let conversations;
    await ConversationModel.find({
      users: { $elemMatch: { $eq: user_id } }, // what is this ??
    })
      .populate("users", "-password")
      .populate("admin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 }) //newest ones comes first
      .then(async (results) => {
        results = await UserModel.populate(results, {
          path: "latestMessage.sender",
          select: "name email picture status",
        });
        conversations = results;
      })
      .catch((err) => {
        throw createHttpError.BadRequest("Oops...Something went wrong !");
      });
    return conversations;
  };

  export const updateLatestMessage = async (convo_id, msg) => {
    const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
      latestMessage: msg,    
    //   sirf latest message update ho ra h
    });
    if (!updatedConvo)
      throw createHttpError.BadRequest("Oops...Something went wrong !");
  
    return updatedConvo;
  };