const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
require('dotenv').config();
app.use("/user", require("./userRouter/Router"))

// PORT
const PORT = process.env.PORT;
app.get('/', async (req, res) => {
    res.send({ "msg": "Success" });
})


app.listen(PORT, (req, res) => {
    console.log(`App is listening at http://localhost:${PORT}`);
}); 