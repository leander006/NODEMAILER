const nodemailer = require('nodemailer');

module.exports = async(email,subject,text) =>{
      // console.log("username",process.env.USERNAME);
      // console.log("password",process.env.PASSWORD);
      try {
            const trasporter = nodemailer.createTransport({
                  host:process.env.HOST,
                  service:process.env.SERVICE,
                  port:Number(process.env.EMAIL_PORT),
                  secure:Boolean(process.env.SECURE),
                  auth:{
                        user:process.env.USERNAME,
                        pass:process.env.PASSWORD
                  }
            });

            await trasporter.sendMail({
                  from:process.env.USER,
                  to:email,
                  subject:subject,
                  text:text
            })
            console.log("Email send successfully");

      } catch (error) {
            console.log("Something with wrong");
            console.log(error.message);
      }
}