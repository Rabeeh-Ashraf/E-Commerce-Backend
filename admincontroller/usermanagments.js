const schema = require("../model/userschema");
//getting all viewers
const viewusers = async (req, res) => {
  try {
    //finding the users from schema
    const users = await schema.find({});
    //checking the users
    if (!users) {
      return res.status(404).json({
        message: "users not find",
      });
    }
    //listing the all viewers
    return res.status(200).json({
      message: "listed all the viewers",
      users,
    });
  } catch (error) {
    //catching error
    res.status(500).json({
      message: "server error",
    });
  }
};
//deleting the users
const deleteusers = async (req, res) => {
  try {
    //taking request from id
    const userid = req.params.id;
    await schema.findByIdAndDelete(userid);
    //success of deleting
    res.status(200).json({
      message: "deleted the user successfully",
    });
  } catch (error) {
    //catching the error
    res.status(400).json({
      message: "error in deleting user",
    });
  }
};
//blocking the user
const blockuser = async (req, res) => {
  try {
    //taking request from id
    const userid = req.params.id;
    //finding froom schema and blocking
    const blockeduser = await schema.findByIdAndUpdate(userid, {
      blocked: true,
    });
    //blocking success
    return res.status(200).json({
      message: "blocked the user successfully",
      blockeduser,
    });
  } catch (error) {
        res.status(400).json({
      message: "server error while blocking user",
    });
  }
};
//showing the blocked users 
const blockedusers = async (req, res) => {
  try {
    //finding from schema
    const users = await schema.find({blocked:true})
    //listing the blocked candidates
    res.status(200).json({
      messsage :"listed all the blocked candidates",
      users,
    })
  } catch (error) {
    res.status(500).json({
      message: " error in showing the blocked users",
    });
  }
};
//getting the userdetails
const userdetails = async(req,res)=>{
  try {
    const userid = req.params.id
    const userdetails = await schema.findById(userid)
     res.status(200).json({
      message : "the details is shown below",
      userdetails,
    })
  } catch (error) {
    res.status(500).json({
      message : " error in showing user details"
    })
  }
}

module.exports = { viewusers, deleteusers, blockuser, blockedusers,userdetails };
