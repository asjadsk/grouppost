import mongoose,{Schema,Document} from "mongoose";
import { unique } from "next/dist/build/utils";
import { DefaultDeserializer } from "node:v8"; 

export interface Message extends Document{
    content: string;
    createdAt:Date

}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt : {
        type:Date,
        required : true,
        default: Date.now
        
    }
})

export interface User extends Document{
    username: string;
    email:string;
    password:string;
    verifyCode:Date;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    message: Message[];


}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        trim:true,
        unique:true,
    },

    email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email"
       ]
    },
    password: {
        type: String,
        required:[true,"password is required"]
    },
    verifyCode:{
        type:Date,
        required:[true,"verifycode is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verifycodeExpiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false,
        
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
        
    },
    message:[MessageSchema]    
})

const userModel = (mongoose.models.User as mongoose.Model<User>)
 || mongoose.model<User>("User",UserSchema)

 export default userModel;