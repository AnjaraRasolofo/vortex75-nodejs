const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

exports.about = async (req, res) => {
    
    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/abouts.ejs'), {
        user: req.session?.user || null,
    });
    
    res.render('layout', {
        title: 'A propos',
        currentRoute: 'abouts',
        body: content,
        success: req.flash('success'),
        error: req.flash('error'), 
        user: req.session?.user || null,
        csrfToken: req.csrfToken?.()
    });

}