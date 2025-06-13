const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

module.exports = {
  
  showLogin: async (req, res) => {

    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/login.ejs'), {
        
        old: req.session?.old || {},
        errors: req.session?.errors || {},
        csrfToken: req.csrfToken?.(),
        showForgotPasswordLink: true,
        
    });
    //const messages = req.flash('error');
    res.render('layout', {
        title: 'Vortex75 | Accueil',
        body : content,
        success: req.flash('success'),
        error: req.flash('error'),
        user: req.session?.user || null,
        csrfToken: req.csrfToken?.()
    });

    // Nettoyer les données de session après l'affichage
    req.session.old = null;
    req.session.errors = null;

  },

  login: async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
      req.session.errors = { email: "Email requis", password: "Mot de passe requis" };
      req.session.old = req.body;
      return res.redirect('/login');
    }
    
    try {
      const user = await User.findOne({ where: {email} });

      if (user) {
        if( await bcrypt.compare(password, user.password)) {
        
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
          };
          res.redirect('/');

        }
        else {
          req.session.errors = { password: "Mot de passe incorrect." };
          req.session.old = req.body;
          return res.redirect('/login'); 
        }
      } 
      else {
        req.session.errors = { email: "Utilisateur non trouvé." };
        req.session.old = req.body;
        return res.redirect('/login');  
      }

    }
    catch(error) {
      console.error("Erreur lors du login :", error);
      res.status(500).send("Erreur interne du serveur");
    }

  },

  showRegister: async(req, res) => {

    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/register.ejs'), {
      errors: req.session.errors || {},
      old: req.session.old || {},
      csrfToken: req.csrfToken?.(),
      user: req.session?.user || null,
    });
    
    res.render('layout', {
      
      title: 'inscription',
      currentRoute: 'auth',
      csrfToken: req.csrfToken?.(),
      success: req.flash('success'),
      error: req.flash('error'), 
      user: req.session?.user || null,
      body: content,

    });
  },

  register: async (req, res) => {
    
    try {
      
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email,
        password: hashedPassword
      });

      res.redirect('login');

    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      res.status(500).send('Une erreur est survenue.');
    }

  },

  logout: (req, res) => {
    
    req.session.destroy(() => {
      
      res.redirect('/login');
      
    });

  }
  
};
