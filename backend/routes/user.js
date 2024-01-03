const express = require('express');

const router = express.Router();

router.post('/user/add-user',async (req,res,next)=>{
    try{
 
     if(!req.body.phone1){
         throw new Error("Phone number is mandetory");
     }
 
     const name = req.body.user1;
     const email = req.body.email1;
     const phone = req.body.phone1;
 
     const data = await User.create({name:name,email:email,phone:phone});
     res.status(201).json({newUserDetail: data});
 
    }catch(err){
     // console.log(err);
     res.status(500).json({
         error:err
     })
    }
    
     console.log(req.body);
 })


 
 router.get("/user/get-user",async (req,res,next)=>{
    try{
        const users = await User.findAll();
        res.status(200).json({allUsers: users});

    }
    catch(err){
        console.log('Get user is failing',JSON.stringify(err));
        res.status(500).json({error:err});
    }
   
})



router.delete('/user/delete-user/:id',async (req,res)=>{
    try{
        if(req.params.id === 'undefined'){
            console.log("Id is missing..");
            res.status(400).json({err:'ID is missing'});
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
    
    const uID = req.params.id;
    await User.destroy({where:{id:uID}});
    res.sendStatus(200);
})







module.exports = router;