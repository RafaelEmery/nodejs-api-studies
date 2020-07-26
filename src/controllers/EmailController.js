const nodemailer = require('nodemailer');

module.exports = {

    //Using the fake account at the Ehereal service
    //Access here: https://ethereal.email/
    async sendTestEmail(req, res, next) {
        try {
            //Reusable transporter object
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'jose49@ethereal.email',
                    pass: 'z24Ue3GsyAArGgbUGs'
                }
            });

            const email = await transporter.sendMail({
                from: 'Rafael Emery',
                to: 'dude@example.com',
                subject: 'Testing Dude (Again)!',
                html: "<h1>Heyyy Dude, it's working! Test number 3<h1>"
            });

            console.log('Message sent: %s', email.messageId);
            console.log('Testing URL: %s', nodemailer.getTestMessageUrl(email));

            return res.send({
                message: 'Email was sent correctly!',
                email: email
            });

        } catch (error) {
            console.log('deu merda aqui no email')
            next(error);
        }
    }
}