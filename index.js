import express from 'express';
import dotenv from 'dotenv';
import nodemailer from  'nodemailer';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
//middleware function
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.json({msg:'server is well and kicking'})
})

app.post('/contact',async (req,res)=>{
    const {name,email,message} = req.body;
    
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASS,
        },
        debug:true,
        logger:true
    })
    const mailOptions = {
        from:email,
        to:'kwembepleasant@gmail.com',
        subject:`New contact from ${name}`,
        text:`from ${name}\nEmail:${email}\n\n${message}`
    }

    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({msg:'Email sent succesfully'})
    } catch(error){
        console.error(error);
        res.status(505).json({msg:'Error sending email'})
    }
})

app.listen(port,()=>{
    console.log(`server is runing on port ${port}`)
})