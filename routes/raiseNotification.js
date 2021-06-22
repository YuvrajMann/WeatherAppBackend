var Notification=require('../models/notifications');
var User=require('../models/users.js');
var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var authenticate = require("../authenticate");
var config = require("../config");

router.route('/raise').post(authenticate.verifyUser,(req,res,next)=>{
    var notify=req.body;
    notify['creator']=req.user._id;
    console.log(notify);
    Notification.create(notify).then((notification)=>{
        User.findById(req.user._id).then(user=>{
            let userNotifications=user.notifications;
            if(!userNotifications){
                userNotifications=[];
            }
            userNotifications.push(notification._id);
            console.log(userNotifications);
            user.notifications=userNotifications;
            user.save().then(resp=>{
                console.log(resp);
                res.statusCode=200;
                res.setHeader("Content-Type", "application/json");
                res.json(notification);
            })
            .catch(err=>{
                next(err);
            })
        })
        .catch((err)=>{
            next(err);
        })
    })
    .catch((err)=>{
        next(err);
    })
});

router.route('/allNotifications').get(authenticate.verifyUser,(req,res,next)=>{
    Notification.find({}).populate('creator').then((notifications)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(notifications);
    })
    .catch((err)=>{
        next(err);
    })
});

module.exports=router;
