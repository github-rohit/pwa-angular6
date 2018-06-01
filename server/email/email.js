const Sendmail = require('sendmail')();
const Cryptr = require('cryptr');
const ejs = require('ejs');

const sendEmal = (host, filename, type, subject, user, encryptedString) => {
    const cryptr = new Cryptr(process.env.SECRET);

    if (!encryptedString) {
        encryptedString = cryptr.encrypt(user.email);
    }

    console.log(`${host}/${type}/${encryptedString}`)

    ejs.renderFile(`server/views/${filename}.ejs`, {
        logo: host,
        name: user.name,
        emailLink: `//${host}/${type}/${encryptedString}`        
    }, {}, (err, html) => {
        if (err) {
            console.log(err);
            return;
        }
        
        Sendmail({
            from: 'no-reply@nirmalrohit.com',
            to: user.email,
            subject: subject,
            html: html,
          }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });             
    });
}

module.exports = { sendEmal }