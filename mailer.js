const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    port: 3000,
    secure: false,
    service: 'gmail',
    auth: {
        user: 'pictnshare@gmail.com',
        pass: 'enNovembre1920.',
    },
    tls: {
        rejectUnauthorized: false
    }
})
// ici mail général
// var mailOptions = {
//     from: '"Admin" <pictnshare@gmail.com>',
//     to: req.body.email,
//     subject: 'Confirmation d\'inscription',
//     // text: '',
//     html: '<h2>Hey :)<h2><p>Bienvenue et merci pour ton inscription !</p><p>Tu peux dès à présent profiter des meilleurs spots photos sur Paris !</p><br><p>A bientôt sur Pict\'N\'Share,</p><p>Say Cheeeese :D</p><br><p>Marie, ton admin\' !</p>',
//     attachments: [{
//         filename: 'logophotoshop.png',
//         path: './public/img/logophotoshop.png',
//     }]
// };

module.exports = {
    nodemailer,
    transporter,
};