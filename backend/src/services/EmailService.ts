import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({

    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    secure: true,
    port: 465
});


export const sendVerificationEmail = async (to: string, token: string) => {

    const link = `http://localhost:3000/verify?token=${token}`;

    await transporter.sendMail({
        
        from: process.env.GMAIL_USER,
        to,
        subject: "Confirm your email adress",
        html:  `<p>Please click the link below to verify your email:</p><a href="${link}">Verify Email</a>`,
    
    });

    console.log("Email sent");
};