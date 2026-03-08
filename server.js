import express from "express";
import cors from "cors";
import supabase from "./supabaseClient.js";
import logger from "./middleware/logger.js";
import courseRoutes from "./routes/courses.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.get("/health", async(req,res)=>{
    try{
        const {data,error}= await supabase
        .from("courses").select("*")
        if(error){
            return res.status(500).json({
                status:"error",
                message:error.message
            });
        }
        res.json({
            status:"success",
            message:"supabase connected"
        });
    }catch(err){
        res.status(500).json({
            status:"failed",
            message:"connection failed"
        })
    }
});

app.use("/",courseRoutes);

app.listen(process.env.PORT || 3000, () =>{
    console.log("server running on 3000")
})