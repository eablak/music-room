import nodemailer from "nodemailer/lib/nodemailer";


const transporter = nodemailer.createTransport({

    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: ""
    },
    secure: true,
    port: 465
});


(async () => {

    await transporter.sendMail({
        
        from: "",
        to: "",
        subject: "",
        html: ""
    
    });

    console.log("Email sent");
})();