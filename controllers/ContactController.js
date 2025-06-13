const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

exports.contact = async (req, res) => {
    
    const content = await ejs.renderFile(path.join(__dirname, '../views/pages/contact.ejs'), {});
    
    res.render('layout', {
        title: 'Vortex75 | Contact',
        currentRoute: 'contact',
        body: content,
        success: req.flash('success'),
        error: req.flash('error'), 
        user: req.session?.user || null,
        csrfToken: req.csrfToken?.()
    });

}