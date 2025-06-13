const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  
    async signup(req, res) {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      
      if (existingUser) {
        return res.status(409).json({ error: 'Email déjà enregistré' });
      }

      const user = await User.create({ email, password });
      res.status(201).json({
        id: user.id,
        email: user.email
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async login(req, res) {

    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Identifiants incorrects' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'SECRET_KEY',
        { expiresIn: '24h' }
      );

      res.json({ 
        userId: user.id,
        token 
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur d\'authentification' });
    }
  }
};

