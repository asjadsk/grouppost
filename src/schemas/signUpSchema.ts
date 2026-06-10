import {z } from 'zod'

export const usernameValidation = z.string() 
.min(2 ," please more than 2 characters")
.max(20,"username must be no more than 20 charater")
.regex(/^[a-zA-Z0-9_]{3,15}$/, "username must not contain special character")

export const signUpschema =
 z.object({
    userrname: usernameValidation,
    email: z.string()
    .email({message:'invalid email address'}),
    password:z.string()
    .min(6,{message: " password must be atleast 6 character"})
       
})