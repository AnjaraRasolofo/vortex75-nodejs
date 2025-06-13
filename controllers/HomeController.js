const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const Message = require('../models/Message');
const {Op} = require('sequelize');

exports.home = async (req, res) => {
    
    let messages = [];
    const user = req.session?.user;

    if (user && user.role === 'admin') {
        messages = await Message.findAll({
        order: [['createdAt', 'ASC']]
        });
    } else {
        if (req.user) {

        const userId = req.user.id ? req.user.id : null;
        messages = await Message.findAll({
        where: {
            [Op.or]: [
            { userId: userId },
            { receiverId: userId}
            ]
        },
        order: [['createdAt', 'ASC']]
        });
    }
    }

    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/home.ejs'), {
        
        currentRoute: 'home',
        user

    });
    
    res.render('layout', {

        title: 'Accueil',
        currentRoute: 'home',
        body: content,
        success: req.flash('success'),
        error: req.flash('error'), 
        user,
        csrfToken: req.csrfToken?.(),
        messages: messages ?? null
    });

}