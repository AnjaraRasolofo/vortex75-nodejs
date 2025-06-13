
const User = require('../models/User'); 

module.exports = {
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs' });
    }
  },

  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'utilisateur' });
    }
  },

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({ title, content, image });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la création de l\'utilisateur' });
    }
  },

  async update(req, res) {
    try {
      const { email, password } = req.body;
      const [updated] = await User.update(
        { email, password },
        { where: { id: req.params.id } }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
    }
  },

  async updateRole(req, res) {
    try {
      const { role } = req.body;
      const [updated] = await User.update(
        { role },
        { where: { id: req.params.id } }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await User.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'utilisateur' });
    }
  }
};
