const fs = require('fs');
const storagePath = __dirname + "/local-storage";

var saveOnDisk = async (fileName, body)=>{
    //Here we use | as splitter and ensure that a body parameter cannot contain this symbol
    try{
        body = JSON.stringify(body);
        if(body.includes("|"))
            return {status: false, message: "Values must not contain '|' symbol"};
        await fs.appendFile(storagePath + "/" + fileName, body + "|");
        return {status: true, message: "Data Saved Successfully"};
    }
    catch(err){
        return {status: false, message: "Unknown error occurred"}
    }
}

module.exports.saveOnDisk = saveOnDisk;