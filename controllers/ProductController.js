const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const {sequelize, Op} = require('sequelize');

const Product = require('../models/Product');

exports.home = async (req, res) => {

    try {
    const populars = await Product.findAll({
        order: [[ 'id','DESC']],
        limit: 12
    });

    // découper en chunks de 4
    const popularChunks = [];
    for (let i = 0; i < populars.length; i += 4) {
        popularChunks.push(populars.slice(i, i + 4));
    }

    //req.flash('success', 'Liste des produits chargée');

    const content = await ejs.renderFile(path.join(__dirname, '../views/experts/home.ejs'), {
        user: req.session?.user || null,
        popularChunks,
    });


    res.render('layout', {
        title: 'Experts',
        currentRoute: 'experts',
        user: req.session?.user  || null,
        success: req.flash('success') || '',
        error: req.flash('error'),
        csrfToken: req.csrfToken?.(),
        body: content
    });

    } catch (error) {
        console.error('Erreur chargement home page:', error);
        req.flash('error', 'Erreur lors du chargement des produits');
        res.status(500).render('home', { products: [], error: error.message });
  }
}

exports.catalogue = async (req, res) => {
    
    try{

        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const offset = (page - 1) * limit;
        const type = req.query.type || 'Toutes';
        const price = parseFloat(req.query.prix) || 0;

        const whereClause = {};

        if (type !== 'Toutes') {
            whereClause.type = type;
        }

        if (price > 0) {
            whereClause.price = { [Op.lte]: price }; // <= prix
        }

        // Total produits filtrés
        const totalProducts = await Product.count({ where: whereClause });

        // Produits paginés filtrés
        const products = await Product.findAll({
            where: whereClause,
            order: [['id', 'DESC']],
            limit,
            offset
        });

        // Calcul total de pages
        const totalPages = Math.ceil(totalProducts / limit);

        const content = await ejs.renderFile(path.join(__dirname, '../views/experts/catalogue.ejs'), {
            user: req.session?.user || null,
            products,
            type,
            price,
            pagination: {
                currentPage: page,
                totalPages
            }
        });

        res.render('layout', {
            title: 'Catalogue',
            currentRoute: 'catalogue',
            success: req.flash('success') || '', 
            error: req.flash('error'),
            user: req.session?.user  || null,
            csrfToken: req.csrfToken?.(),
            body: content
        });
    }
    catch(error) {
        console.error('Erreur chargement de la page catalogue:', error);
        req.flash('error', 'Erreur lors du chargement des produits du catalogue');
        res.status(500).render('catalogue', { produits: [], error: error.message });
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).render('404', { message: 'Produit introuvable' });
        }

        const content = await ejs.renderFile(path.join(__dirname, '../views/experts/show.ejs'), {
            user: req.session?.user || null,
            csrfToken: req.csrfToken?.(),
            product
        });

        res.render('layout', { 
            title: 'Expert',
            currentRoute: 'expert',
            success: req.flash('success'), 
            error: req.flash('error'),
            user: req.session?.user  || null,
            csrfToken: req.csrfToken?.(),
            body: content 
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage du produit :", error);
        req.flash('error', 'Erreur lors du chargement des informations sur le produit sélectionné');
        res.status(500).send("Erreur serveur");
    }
};


exports.showShoppingCart = async (req, res) => {
    try {
        
        const content = await ejs.renderFile(path.join(__dirname, '../views/experts/shopping-cart.ejs'), {
            user: req.session?.user || null,
            csrfToken: req.csrfToken?.(),
            shoppingCart: req.session.shoppingCart || {},
            success: req.flash('success')
        });

        res.render('layout', { 
            title: 'Expert',
            currentRoute: 'shopping_cart',
            success: req.flash('success'), 
            error: req.flash('error'),
            user: req.session?.user  || null,
            shoppingCart: req.session.shoppingCart || {},
            csrfToken: req.csrfToken?.(),
            body: content 
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage du contenu du panier :", error);
        req.flash('error', 'Erreur lors du chargement du contenu du panier');
        res.status(500).send("Erreur serveur");
    }
};

exports.deleteInShoppingCart = (req, res) => {
    const productId = req.params.id;
    const cart = req.session.shoppingCart;

    if (!cart || !cart[productId]) {
        return res.status(404).json({ message: "Produit non trouvé dans le panier" });
    }

    delete cart[productId]; // Supprime l'article

    req.session.shoppingCart = cart; // Met à jour la session

    return res.redirect('/experts/shopping-cart/');//res.status(200).json({ message: "Produit supprimé avec succès", cart });
};


exports.addInShoppingCart = async (req, res) => {
  
  const id = req.params.id;
  const shoppingCart = req.session.shoppingCart || {};

  const product = await Product.findByPk(id);
  
  if (!product) return res.redirect('/experts/catalogue');

  if (shoppingCart[id]) {
    shoppingCart[id].quantity += 1;
  } else {
    shoppingCart[id] = {
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
  }

  req.session.shoppingCart = shoppingCart;
  console.log(req.session.shoppingCart);
  req.flash('success', `${product.name} ajouté au panier.`);
  
  const content = await ejs.renderFile(path.join(__dirname, '../views/experts/show.ejs'), {
        user: req.session?.user || null,
        csrfToken: req.csrfToken?.(),
        //success: req.flash('success'),
        product
    });

    res.render('layout', { 
        title: 'Expert',
        currentRoute: 'expert',
        success: req.flash('success'),
        error: req.flash('error'), 
        user: req.session?.user  || null,
        csrfToken: req.csrfToken?.(),
        body: content 
    });
}