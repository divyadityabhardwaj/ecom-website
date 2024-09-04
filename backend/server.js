import app from "./app.js";
import dotenv from "dotenv"; 
import { connectDatabase } from "./config/database.js";

//handling uncaught exceptions
// process.on("uncaughtException" , (err)=>{
//     console.log(`error: ${err.message}`);
//     console.log(`shutting down the server due to uncaught exception `);
//     process.exit(1);
// });

dotenv.config({path:"backend/config/config.env"})
connectDatabase() ; 


app.listen(process.env.PORT , () =>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

//unhandled promise rejection 

// process.on("unhandledRejection" , err=>{
//     console.log(`Error: ${error.message}`);
//     console.log(`Shutting down the server due to unhandled promise rejection `);

//     server.close(()=>{
//         process.exit(1);
//     });
// });