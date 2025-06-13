const Category = require('../models/Category'); 

module.exports = {
  async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des categories' });
    }
  },

  async getById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Categorie non trouvé' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la récupération de la catégorie' });
    }
  },

  async create(req, res) {
    try {
      const { name, slug, description } = req.body;
      const newCategory = await Category.create({ title, content, image });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la création de la catégorie' });
    }
  },

  async update(req, res) {
    try {
      const { name, slug, description } = req.body;
      const [updated] = await Category.update(
        { name, slug, description },
        { where: { id: req.params.id } }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Catégorie non trouvé' });
      }
      const updatedCategory = await Category.findByPk(req.params.id);
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la catégorie' });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Category.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Catégorie non trouvé' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la suppression de la catégorie' });
    }
  }
};
