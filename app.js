const express = require('express');
const app = express();
const localFilesHandler = require('./controllers/local-fs-handler.js');
const helperFunctions = require('./controllers/helper-functions.js');
const database = require('./controllers/database');

app.listen(80, ()=>{
    console.log("Server is running on port 80");
    database.initialize();
});



app.get('/', async (req, res) => {
    res.sendFile(__dirname + "/public/html/index.html");
});

app.post('/contact/save', async (req, res) => {
    try {
        if (!helperFunctions.validateKeyValueForm(req.body))
            return res.status(401).send('Invalid Data');
        var result;
        if (req.body.storageType === "local")
            result = await localFilesHandler.saveOnDisk("ContactDetails.txt", req.body);
        else if(req.body.storageType === "database")
            result = await database.saveInDatabase("ContactDetails", req.body);
        else return res.status(401).send("Invalid Storage Medium");
        if (result.status === true)
            res.send(result.message);
        else
            res.status(401).send(result.message);
    } catch (err) {
        console.log(err);
        res.status(503).send("Internal Server Error Occurred. Please Try Again");
    }
});

app.use((req, res, next) => {
    res.status(404).send("The page you are requesting cannot be located");
})


