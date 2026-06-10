import dbObject from "@/lib/dbconnect";
import userModel from "@/model/user";
import bcrypt from "bcryptjs"

import { sendVerificationEmail} from "@/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(request:Request){
    await dbObject()

    try {
        const { username, email, password} = await request.json()

        const existingUserVerifiedByUsername = await userModel.findOne({
            username,
            isVerified:true,
        })

        if (existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "username is already taken "
            },{status : 400})

        }

        const existingUserbyEmail = await
         userModel.findOne({email})

         const verifyCode = Math.floor( 100000 + Math.random()
         * 900000).toString()
        
        if(existingUserbyEmail){
            true//Todos back here 
        }else {
            const hassedPassword = await bcrypt.hash(password,10)
            
            const expiryDate =new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new userModel({
                username,
                email,
                password:hassedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage: true,
                message : []
                                 
            })
               await newUser .save()
        }
        //send verification email 
        await sendVerificationEmail(
            email,
            username,
            verifyCode,
        )


        
    } catch (error) {
        console.error('Error registeriing user ',error)
        return Response.json( 
            {
                success:false,
                message: "Error registering user "
            },
            {
                status:400
            }
        )
        
    }
}
    