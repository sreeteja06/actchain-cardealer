/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 17th September 2019 5:43:04 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
let express = require('express')
let router = express.Router()
let nodemailer = require('nodemailer')

let { mongoose } = ('../db/mongoose');

let User = require('../models/user');
let Dealer = require('../models/dealer');
let Customer = require('../models/customer');
let tempUserModel = require('../models/tempUser');
let { authenticate } = require('../middleware/authentication');
require('../config/config');

const awaitHandler = fn => {
    return async (req, res, next) => {
        try {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

router.post('/users/signUp', awaitHandler((req, res) => {
    let body = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        mobile:req.body.mobile,
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
        contact_title: req.body.contact_title,
        contact_mobile: req.body.contact_mobile,
        OTP: Math.round(Math.random() * 1000000),
        Brand: req.body.Brand,
        website: req.body.website,
        ID: req.body.ID
    }
    console.log(body.email + ": OTP = " + body.OTP)
    console.log("password " + process.env.EPASS);
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use SSL,
        // you can try with TLS, but port is then 587
        auth: {
          user: "dummycar.dealer@gmail.com", // Your email id
          pass: process.env.EPASS // Your password
        }
      });
  
      var mailOptions = {
        from: "dummycar.dealer@gmail.com",
        to: body.email,
        subject: "OTP for Actchain Car Dealer ",
        text: "OTP is " + body.OTP
      };
    
      transporter.sendMail( mailOptions, function ( error, info ) {
          if ( error ) {
              console.log( error );
          } else {
              console.log( 'Email sent: ' + info.response );
          }
      } );
      //end of nodemailer
      let tempUser = new tempUserModel( body );
      tempUser.save(function(err){
          if(err){
              res.send(err).end(500)
          }else{
          res.send(tempUser._id);}
      })
  } ))

router.post('/users/verify', awaitHandler(async (req, res) => {
    let tempUser = await tempUserModel.findOne({ _id: req.body.tempuserID })
    console.log(tempUser);
    if (tempUser.OTP != req.body.OTP) {
        res.status(401).end();
    } else {
        let body = {
            email: tempUser.email,
            password: req.body.password,
            role: tempUser.role,
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            address: tempUser.address,
            state: tempUser.state,
            city: tempUser.city,
        }
        let userData = {};
        let user = new User(body);
        user.save().then(() => {
            return user.generateAuthToken();
        }).then(async (token) => {
            let Obj
            if (tempUser.role === 'Dealer') {
                userData = {
                    dealerRegId: tempUser.ID,
                    _user: user._id,
                    dealership_name: tempUser.firstName + " " + tempUser.lastName,
                    Brand: tempUser.Brand,
                    website: tempUser.website,
                    contact_name: tempUser.contact_name,
                    contact_title: tempUser.contact_title,
                    contact_email: tempUser.contact_email,
                    contact_mobile: tempUser.contact_mobile,
                }
                let dealer = new Dealer(userData)
                Obj = await dealer.save();
            }
            else if (tempUser.role === 'Buyer') {
                userData = {
                    SSN: tempUser.ID,
                    _user: user._id,
                    name: tempUser.firstName + "" + tempUser.lastName,
                    email: tempUser.email,
                    mobile: tempUser.mobile,
                }
                let customer = new Customer(userData);
                Obj = await customer.save();
            }
            res.header('x-auth', token).send({ user, Obj });
        }).catch((e) => {
            console.log(e)
            res.status(400).send(e);
        })
    }
}));
router.post('/users/login', awaitHandler((req, res) => {
    let body = {
        email: req.body.email,
        password: req.body.password
    }

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(401).send();
    });
}));

router.get('/users/me', authenticate, awaitHandler((req, res) => {
    res.send(req.user);
}));

router.delete('/users/logout', authenticate, awaitHandler((req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
}));

router.get('/users', awaitHandler((req, res) => {
    res.send('you ar iuh usrsrs');
}));
module.exports = router