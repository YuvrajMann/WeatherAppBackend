var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var authenticate = require("../authenticate");
var config = require("../config");
const axios = require("axios");
router.use(bodyParser.json());

router.route("/getByZipCode/forecast").post(authenticate.verifyUser,(req,res,next)=>{
    let zipCode=req.body.zipCode;
    let countryCode=req.body.countryCode;
    console.log(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&appid=${config.apiKey}`);
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&appid=${config.apiKey}`).then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp.data);
    })
    .catch((err)=>{
        console.log(err.response.data);
        let error=new Error(err.response.data.message);
        error.status=err.response.data.cod;
        next(error);
    })
});

router.route("/getByZipCode").post(authenticate.verifyUser,(req,res,next)=>{
    let zipCode=req.body.zipCode;
    let countryCode=req.body.countryCode;
    console.log(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${config.apiKey}`);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${config.apiKey}`).then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp.data);
    })
    .catch((err)=>{
        console.log(err.response.data);
        let error=new Error(err.response.data.message);
        error.status=err.response.data.cod;
        next(error);
    })
})
router.route("/getByCord/forecast").post(authenticate.verifyUser,(req,res,next)=>{
    let lat=req.body.lat;
    let long=req.body.long;
    console.log(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${config.apiKey}`);    

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${config.apiKey}`).then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp.data);
    })
    .catch((err)=>{
        console.log(err.response.data);
        let error=new Error(err.response.data.message);
        error.status=err.response.data.cod;
        next(error);
    })
});
router.route("/getByCord").post(authenticate.verifyUser,(req,res,next)=>{
    let lat=req.body.lat;
    let long=req.body.long;
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config.apiKey}`);    

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config.apiKey}`).then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp.data);
    })
    .catch((err)=>{
        console.log(err.response.data);
        let error=new Error(err.response.data.message);
        error.status=err.response.data.cod;
        next(error);
    })
});

router.route("/getByCity/forecast").post(authenticate.verifyUser,(req,res,next)=>{
    let cityName=req.body.cityName;
    let stateCode=req.body.stateCode;
    let countryCode=req.body.countryCode;
  
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${stateCode},${countryCode}&appid=${config.apiKey}`)
      .then((resp) => {
          res.statusCode=200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp.data);
      })
      .catch((err) => {
          let error=new Error(err.response.data.message);
          error.status=err.response.data.cod;
          next(error);
      });
});
router.route("/getByCity").post(authenticate.verifyUser, (req, res, next) => {
  let cityName=req.body.cityName;
  let stateCode=req.body.stateCode;
  let countryCode=req.body.countryCode;

  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&appid=${config.apiKey}`)
    .then((resp) => {
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp.data);
    })
    .catch((err) => {
        let error=new Error(err.response.data.message);
        error.status=err.response.data.cod;
        next(error);
    });
});
module.exports = router;
