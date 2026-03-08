const validateEnrollment = (req,res,next) =>{
    const{ student_name, course_id} = req.body;
    if(!student_name || !course_id){
        return res.status(400).json({
            message:"filedsare required"
        })
    }
  next();
}
export default validateEnrollment;
