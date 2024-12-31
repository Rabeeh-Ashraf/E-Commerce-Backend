const schema = require("../model/userschema")
const updateprofile = async (req,res)=>{
    try {
        const userid = req.params.id
        const update = req.body 
        const updatedprofile = await schema.findByIdAndUpdate(userid,update)
        if(!updatedprofile){
            return res.status(404).json({
                message : " cannot update profile"
            })
        }
        return res.status(200).json({
            message : " updated profile successfully"
        })
    } catch (error) {
        res.status(400).json({
            message : "error in updating profile"
        })
    }
}
const profiledetails = async (req,res)=>{
    try {
        const userid = req.params.id
        const showprofile = await schema.findById(userid)
        return res.status(200).json({
            message : " profile is given below",
            showprofile,
        })
    } catch (error) {
        res.status(500).json({
            message :  "error in showing details"
        })
    }
}
module.exports = {updateprofile,profiledetails}