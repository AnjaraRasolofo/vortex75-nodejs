const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const Signal = require('../models/Signal');
const User = require('../models/User');

exports.home = async (req, res) => {
    let signals = [];
    try{
      const signals = await Signal.findAll({
          include: [{
              model: User,
              as: 'author',
              attributes: ['name']
          }],
          order: [['createdAt', 'DESC']]
      });
    }catch(error) {
      console.warn('Erreur lors de la récupération des signaux :', error.message);
      // signaux reste un tableau vide
    }
    const content = ejs.renderFile(path.join(__dirname, '../views/signals/home.ejs'), {
        signals,
    });

    res.render('layout', {
        title: 'Signaux',
        currentRoute: 'signaux',
        user: req.session?.user  || null,
        success: req.success || '',
        error: req.errors || '',
        csrfToken: req.csrfToken?.(),
        body: content
    });
}

exports.createSignal = async (req, res) => {

    try {
    await Signal.create({
      date: new Date(),
      type: req.body.type,
      prix_entree: req.body.prix_entree,
      stop_loss: req.body.stop_loss,
      take_profit: req.body.take_profit,
      resultat: req.body.resultat || 'En cours',
      graphique: req.file?.filename || null,
      auteurId: req.session.user.id
    });
    req.flash('success', 'Signal publié avec succès.');
    res.redirect('/signaux');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Erreur lors de la publication du signal.');
    res.redirect('/signaux');
  }

}