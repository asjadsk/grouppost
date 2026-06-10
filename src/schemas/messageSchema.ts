import {z} from "zod"

export const messageSchema = z.object({
    content : z.string()
    .min(10,{message:'content must be  atleast 10 character'})
    .max(100,{message:'content must be no longet than 100 characters'})

    
}) 