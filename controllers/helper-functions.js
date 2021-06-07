var validateKeyValueForm = (body)=>{
    try{
        for(var key in body)
        {
            if(typeof body[key] != 'string')
                return false;
            if(body[key].trim().length === 0)
                return false;
        }
        return true;
    }
    catch(err){
        return false;
    }
}

module.exports.validateKeyValueForm = validateKeyValueForm;