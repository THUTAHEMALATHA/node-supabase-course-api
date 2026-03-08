import express from "express";
import supabase from "../supabaseClient";
import validateEnrollment from "../middleware/validateEnrollment";
const router = express.Router();

router.get("/courses",async(req,res)=>{
    const {data, error} =await supabase
    .from("courses")
    .select("*")

    if(error){
        return res.status(500).json({error:error.message})
    }
    res.json(data);
})
// 
router.post("/enroll",validateEnrollment,async(req,res)=>{
    const{student_name, course_id} = req.body;

    const {data, error} =await supabase
    .from("enrollments")
    .insert([{student_name, course_id}])

    if(error){
        return res.status(500).json({error:error.message})
    }
    res.json({
        message:"success",
        data
    });
});
// 
router.get("/courses/:id/enrollments",async(req,res)=>{
    const courseId = req.params.id;

    const {data, error} =await supabase
    .from("enrollments")
    .select("*")
    .eq("course_id", courseId)

    if(error){
        return res.status(500).json({error:error.message})
    }
    res.json(data);
});

export default router;