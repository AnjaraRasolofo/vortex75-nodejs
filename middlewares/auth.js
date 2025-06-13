
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // Si l'utilisateur est connecté on continue 
    return next();
  } else {
    // Non connecté, on redirige le visiteur vers la page login
    
    req.flash('error', 'Veuillez vous connecter pour ce service');
    return res.redirect('/login');
  }
}

module.exports = isAuthenticated;