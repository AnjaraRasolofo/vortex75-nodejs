exports.catalogue = async (req, res) => {
    
    try{

        const produits = await Produit.findAll({
            order: [[ 'id','DESC']],
            limit: 12
        });

        //req.flash('success', 'Catalogue des produits chargée');

        const content = await ejs.renderFile(path.join(__dirname, '../views/experts/catalogue.ejs'), {
            user: req.session?.user || null,
            produits,
            type: req.query.type || 'Toutes',
            prix: req.query.prix || 0,
            pagination: {
                currentPage: 1,
                totalPages: 5
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