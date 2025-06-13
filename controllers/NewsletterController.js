// controllers/newsletterController.js
const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');
//const sendConfirmationEmail = require('../notifications/newsletterConfirmation');

exports.store = async (req, res) => {
  const { email } = req.body;

  // Validation
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  try {
    // Vérifie unicité
    const existing = await Newsletter.findOne({ where: { email } });
    if (existing) {
      //return res.status(400).json({ error: 'Cet email est déjà inscrit.' });
      req.flash('error', 'Cet email est déjà inscrit.' )
    }

    // Enregistre l'email
    const newsletter = await Newsletter.create({ email });

    req.flash('success', `Merci pour votre inscription à notre newsletter !`);
    // Envoie l'email de confirmation
    //await sendConfirmationEmail(newsletter.email);
    return res.redirect('/');

  } catch (error) {
    console.error(error);
    req.flash('error', "Erreur lors de l'inscription.");
    return res.redirect('/');
    
  }
};


async function sendConfirmationEmail(email) {

    const transporter = nodemailer.createTransport({
      host: 'smtp.vortex75.com',     
      port: 587,                     
      secure: false,                 // false = STARTTLS, true = SSL direct (port 465)
      auth: {
        user: 'contact@vortex75.com',   
        pass: ''             
      },
      tls: {
        rejectUnauthorized: false          // optionnel si certificat auto-signé
      }
    });

    const mailOptions = {
      from: '"Vortex75" <contact@vortex75.com>',
      to: email,
      subject: 'Confirmation de votre inscription à la newsletter',
      text: 'Merci pour votre inscription à notre newsletter !',
      html: '<p>Merci pour votre inscription à notre <strong>newsletter</strong> !</p>',
    };

    await transporter.sendMail(mailOptions);
  
  
};