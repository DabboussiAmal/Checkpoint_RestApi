const router = require('express').Router()
const User = require ('../models/User')

//CRUD
//Create
router.post('/create', async(req,res)=>{
    const {name , email , password} = req.body
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({status:true, msg:"User already exist!"})
        }
        const user = await User.create({
            name,
            email,
            password
        })
        return res.status(200).json({status:true, msg:"User created successfuly", data: user})

}
catch(err){
        return res.status(500).json({status:false, msg:err})
    }
})

//Read
router.get('/read', async(req,res)=>{
    try{
       const users = await User.find()
        return res.status(200).json({status:true, msg:"List of users", data: users})

}
catch(err){
        return res.status(500).json({status:false, msg:err})
    }

})

//Update
router.put('/update/:id', async(req,res)=>{
    let {id}=req.params
    const {name,email,password}=req.body
    try{
        const user = await User.findByIdAndUpdate(id, {...req.body}, {new:true});
        return res.status(200).json({status:true, msg:"user updated successfuly", data: user})

}
catch(err){
        return res.status(500).json({status:false, msg:err})
    }

})

//Delete
router.delete('/delete/:id', async(req,res)=>{
    let {id}=req.params
   
    try{
        const user = await User.findByIdAndDelete(id);
        return res.status(200).json({status:true, msg:"user deleted successfuly"})

      }
catch(err){
        return res.status(500).json({status:false, msg:err})
         }

})


module.exports = router