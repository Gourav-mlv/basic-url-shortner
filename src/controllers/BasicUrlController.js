const { nanoid } = require('nanoid');
const yup = require('yup');
const BasicUrl = require('../model/BasicUrl');
const newUrlSchema = yup.object().shape({
    als : yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required()
});
const redirect = async (req,res) =>{
    var {id:alias} = req.params;
    console.log(alias);
    try{
        const url = await BasicUrl.findOne({alias});
        if(url){
            return res.redirect(url.url);
        }else{
            return res.status(404).send({message:'invalid alias'});
        }
    }catch(error){
        return res.status(404).send({message:'url not present in shortner database or error getting url pls. try later'});
    }
}
const store = async (req,res,next) =>{
    let  {alias,url} = req.body;
    console.log({alias,url});
    let alsSts = 'given';
    try{
        await newUrlSchema.validate({alias, url});
        if(!alias){
            alias = nanoid(5);
            alsSts = 'random';
        }else{
            let exist =  await BasicUrl.findOne({alias});
            if(exist){
                alsSts = 'exists';
            }
            while(exist){
                alias = nanoid(5);
                exist =  await BasicUrl.findOne({alias});
            }
        }
        alias = alias.toLowerCase();
        const newUrl = {alias, url};
        const created = await BasicUrl.create(newUrl);
        res.json({"db_response" :created ,"alias Status" : alsSts });
    }catch(error){
        next(error);
    }
}

module.exports = {redirect , store }