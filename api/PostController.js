const Post = require('../models/Post');
const Category = require('../models/Category');
const User = require('../models/User');
const generateSlug = require('../utils/slug');

module.exports = {
  
  async getAll(req, res) {
    try {
      const posts = await Post.findAll({
        order: [['date_publication', 'DESC']],
        include: [{
            model: Category,
            as: 'category',
            attributes:['name']
          }, 
          {
            model: User,
            as: 'author',
            attributes: ['name']
          }
        ]
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des articles' });
    }
  },

  async getById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Article non trouvé' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'article' });
    }
  },

  async create(req, res) {
    try { 
      
      const { title, content, category_id, author_id, date_publication, status } = req.body;
      const image = req.file ? req.file.filename : null;

      let slug = generateSlug(title);
      let slugExists = await Post.findOne({ where: { slug } });
      let count = 1;
      while (slugExists) {
        slug = `${generateSlug(title)}-${count}`;
        slugExists = await Post.findOne({ where: { slug } });
        count++;
      }
      
      const newPost = await Post.create({ 
        title, 
        slug, 
        content, 
        category_id, 
        author_id, 
        date_publication, 
        status, 
        image 
      });

      res.status(201).json(newPost);

    } catch (error) {

      console.error(error);
      res.status(500).json({ error: 'Erreur serveur lors de la création de l\'article' });

    }
  },

  async update(req, res) {
    try {
      
      const { title, content, category_id, author_id, date_publication, status } = req.body;
      const image = req.file ? req.file.filename : null;
      const slug = generateSlug(title);
      
      const [updated] = await Post.update(
        { title, slug, content, category_id, author_id, date_publication, status, image },
        { where: { id: req.params.id } }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Article non trouvé' });
      }

      const updatedPost = await Post.findByPk(req.params.id);
      res.json(updatedPost);

    } catch (error) {

      console.error(error);
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'article' });

    }
  },

  async delete(req, res) {
    try {
      
      const deleted = await Post.destroy({ where: { id: req.params.id } });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Article non trouvé' });
      }
      res.status(204).send();

    } catch (error) {

      console.error
      res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'article' });
    }
  }
};
