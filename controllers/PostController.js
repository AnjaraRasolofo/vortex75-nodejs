const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

const { Post, User, Category } = require('../models');;

exports.listPosts = async (req, res) => {
  
  try {

    const categories = await Category.findAll();

    const posts = await Post.findAll({
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
      order: [['date_publication', 'DESC']]
    });

    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/actualites.ejs'), {
      posts,
      categories
    });

     res.render('layout', {
        title: 'Actualites',
        currentRoute: 'actualites',
        posts,
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

exports.postsByCategory = async (req, res) => {
  try {
    const slug = req.params.slug;

    const category = await Category.findOne({ where: { slug } });

    if (!category) {
      return res.status(404).send('Catégorie non trouvée');
    }

    const categories = await Category.findAll();

    const posts = await Post.findAll({
      where: {
        category_id: category.id
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name', 'slug']
        }
      ],
      order: [['date_publication', 'DESC']]
    });

    const content = await ejs.renderFile(
      path.join(__dirname, '../views/pages/actualites.ejs'),
      { posts, categories, currentCategory: category }
    );

    res.render('layout', {
      title: `Catégorie : ${category.name}`,
      currentRoute: 'actualites',
      posts,
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

exports.showPost = async(req, res) => {
  try {

    const slug = req.params.slug;

    const post = await Post.findOne({ 
      where:{ slug },
      include: ['author', 'category']
    });

    let similarPosts = [];
    if (post.category_id) {
      similarPosts = await Post.findAll({
        where: {
          category_id: post.category_id,
          id: { [Op.ne]: post.id } // exclure l'article en cours
        },
        limit: 5,
        order: [['date_publication', 'DESC']]
      });
    }

    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/actualite.ejs'), {
      post,
      similarPosts
    });

    res.render('layout', {
      
      title: post.title,
      currentRoute: 'actualites',
      user: req.session?.user || null,
      success: req.flash('success'),
      error: req.flash('error'), 
      csrfToken: req.csrfToken?.(),
      body: content

    })
  }
  catch(error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
}