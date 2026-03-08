import express from "express";
import cors from "cors";
import supabase from "./supabaseClient.js";

const app = express();

app.use(cors());
app.use(express.json());

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
app.listen(process.env.PORT || 3000, () =>{
    console.log("server running")
})