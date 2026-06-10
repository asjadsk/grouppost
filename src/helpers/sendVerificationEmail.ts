import{resend} from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";

import { ApiResponse } from "@/types/ApiResponse";
import { success } from "zod";

export async function sendVerificationEmail(
email:string,
username:string,
verifyCode:string
): Promise<ApiResponse>{
    try { 
        await resend.emails.send({
  from: 'you@example.com',
  to: 'user@gmail.com',
  subject: 'group-post message | verification code',
  react:VerificationEmail({ username,otp :verifyCode}),
});


        return { success:true , message: 
            'verification email send successfully'}      
        
    } catch (emailerror) {
    console.log("ERROR sending verification email",
        emailerror)
        return {success: false,message:'fail to send verification email'}   
    }
}