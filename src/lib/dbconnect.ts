import { log } from "console"
import mongoose from "mongoose"
import { promise } from "zod"


type connectionObject = {
    isConnected?: number
}

const connection: connectionObject ={}

async function dbObject (): Promise <void>  {
    if ( connection.isConnected ){
        console.log("database is alredy connected");
        return
    }

    try {
       const db = await mongoose.connect(process.env
        .MONGODB_URI || '' ,{})    

        connection.isConnected = db.connections[0].readyState

    console.log("Database connected successfully");
    
    } catch (error) {
       console.log("Database connection failled", error);

       process.exit(1)
       
        
    }
    
}

export default dbObject;
