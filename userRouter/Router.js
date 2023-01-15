const express = require('express');
require('../connect/conn')
const Router = express.Router();
const userSchema = require('../Schema/userSchema');
Router.get('/login', async (req, res) => {
    res.send({ "msg": "Login success" })
})

Router.post('/signup', async (req, res) => {
    try {
        const isEmailExist = await userSchema.findOne({ email: req.body.email })
        if (isEmailExist) {
            res.send({ "msg": "Email already exists." })
        }
        else {
            await userSchema.create({ ...req.body })
            res.send({ "msg": "User created successfully, You can login now.." });
        }

    } catch (error) {
        res.send({ "msg": "Please try again later" })
    }
})

Router.post('/login', async (req, res) => {
    try {
        const isEmailExist = await userSchema.findOne({ email: req.body.email })
        if (isEmailExist) {

            const isPassword = (isEmailExist.password === req.body.password);
            if (isPassword) {
                res.send({ "status": "1", "userData": { "email": isEmailExist.email, "name": isEmailExist.name, "_id": isEmailExist._id } });
            }
            else {
                res.send({ "status": "0" });
            }
        }
        else {
            res.send({ "status": "0" });
        }
    } catch (error) {
        res.send({ "status": "400" })
    }
})




module.exports = Router;
