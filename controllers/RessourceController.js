const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

const { Ressource, User, Category } = require('../models');

exports.listTutorials = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Nombre de tutoriels par page
    const offset = (page - 1) * limit;
    const totalTutorials = await Ressource.count();

    const categories = await Category.findAll();

    const ressources = await Ressource.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name']
        }
      ],
      order: [['date_publication', 'DESC']],
      limit,
      offset
    });

    const totalPages = Math.ceil(totalTutorials / limit);

    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/tutoriels.ejs'), {
      tutorials: ressources,
      pagination: {
        currentPage: page,
        totalPages
      }
    });

    res.render('layout', {
        title: 'Tutoriels',
        currentRoute: 'ressources',
        body: content,
        success: req.flash('success'),
        error: req.flash('error'), 
        user: req.session?.user || null,
        csrfToken: req.csrfToken?.()
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.showTutorial = async (req, res) => {

  const slug = req.params.slug;

  try {
    
    const tutorial = await Ressource.findOne({ 
      where: {slug},
      include: ['author', 'category']
    });

    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/tutoriel.ejs'), {
      user: req.session?.user,
      tutorial: tutorial,
    });

    res.render('layout', {
      
      title: 'Tutoriel',
      currentRoute: 'ressources',
      body: content,
      success: req.flash('success'),
      error: req.flash('error'), 
      user: req.session?.user || null,
      csrfToken: req.csrfToken?.(),

    })

  }
  catch(error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }

};