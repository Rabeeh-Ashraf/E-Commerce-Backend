
const schema = require("../model/userschema");
const addressschema = require("../model/addressschema");
const bcrypt = require("bcrypt");
const addaddress = async(req,res)=>{
    try {
        const userId = req.user.id
        const {phonenumber,street,state,city,pin,country}=req.body

        if(phonenumber.length !==10){
          return res.status(400).json({
            message : "pls give a valid phonennumber"
          })
        }      
          if(!phonenumber||!street||!state||!city||!pin||!country){
          return res.status(400).json({
            message : "all fields are required "
          })
        }
        const existingaddress = await addressschema.findOne({userId})
        if(existingaddress){
        await addressschema.findByIdAndUpdate(existingaddress._id,{$set:{phonenumber,street,state,city,pin,country}},{new:true})
        return res.status(200).json({
          message : "updated existing address"
        })
        }
       
        const address = addressschema({
          userId,
          phonenumber,
          street,
          state,
          city,
          pin,
          country
        })
        
        
        await address.save()
        return res.status(200).json({
          message :"address updated successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message :"error in adding address"
        })
    }
}

const updateprofile = async (req, res) => {
  try {
    const userid = req.params.id;
    const update = req.body;
    const updatedprofile = await schema.findByIdAndUpdate(userid, update);
    if (!updatedprofile) {
      return res.status(404).json({
        message: " cannot update profile",
      });
    }
    return res.status(200).json({
      message: " updated profile successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "error in updating profile",
    });
  }
};
const profiledetails = async (req, res) => {
  try {
    const userid = req.params.id;
    const showprofile = await schema.findById(userid);
    return res.status(200).json({
      message: " profile is given below",
      showprofile,
    });
  } catch (error) {
    res.status(500).json({
      message: "error in showing details",
    });
  }
};
const changepassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password, newpassword } = req.body;
    const user = await schema.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const matching = await bcrypt.compare(password, user.password);
    if (!matching) {
      return res.status(400).json({
        message: "password is incorrect ",
      });
    }
    const hashedpassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedpassword;
    await user.save();
    res.status(200).json({
      messaage: "password successfully changed ",
    });
  } catch (error) {
    res.status(400).json({
      message: "error in changing password",
    });
  }
};
module.exports = { updateprofile, profiledetails, changepassword ,addaddress};
