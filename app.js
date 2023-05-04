const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const https=require('https');
const request=require('request');
const { listenerCount } = require('process');
const { stringify } = require('querystring');
app.use(bodyParser.urlencoded({extended:true}));
app.listen(process.env.PORT||3000,function(){
    console.log("Live on localhost:3000");
})
app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',function(req,res){
    const a=req.body.fname;
    const b=req.body.lname;
    const c=req.body.email;
    // console.log(a);
    const data={
        members:[
            {
                email_address:c,
                status:"subscribed",
                merge_fields:{
                FNAME:a,
                LNAME:b,
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/356b68da9f";
    const options= {
        method:"POST",
        auth:"ff:1af5fafde1b6735a3f4065749611c386-us21"
    }
const request=https.request(url,options,function(response){
    response.on("data",function(data){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        console.log(JSON.parse(data));
    })
})
app.post('/f',function(req,res){
    res.redirect('/');
})
request.write(jsondata);
request.end();

})

// api key 
// 1af5fafde1b6735a3f4065749611c386-us21
// list 
// 356b68da9f