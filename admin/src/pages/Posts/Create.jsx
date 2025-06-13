import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/'; 

function PostCreateForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        category_id: '',
        author_id: '',
        date_publication: '',
        status: 'brouillon'
    });

    useEffect(() => {
        // Charger les données des catégories et auteurs pour les menus deroulants
        axios.get(`${API_URL}categories`).then(res => setCategories(res.data));
        axios.get(`${API_URL}users`).then(res => setUsers(res.data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (let key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            await axios.post(`${API_URL}post/`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin/posts'); 
        } catch (err) {
            console.error("Erreur lors de la mise à jour :", err);
        }
    };

    return (
        <div className="container">
            <h1>Nouvel article : {}</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre</label>
                    <input type="text" name="title" id="title" className="form-control"
                        value={formData.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenu</label>
                    <textarea name="content" id="content" className="form-control"
                        rows="5" value={formData.content} onChange={handleChange}></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Image actuelle</label><br />
                    
                    <input type="file" name="image" id="image" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Catégorie</label>
                    <select name="category_id" id="category_id" className="form-control"
                        value={formData.category_id} onChange={handleChange}>
                        <option value="">-- Sélectionner --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="author_id" className="form-label">Auteur</label>
                    <select name="author_id" id="author_id" className="form-control"
                        value={formData.author_id} onChange={handleChange}>
                        <option value="">-- Sélectionner --</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="date_publication" className="form-label">Date de publication</label>
                    <input type="date" name="date_publication" id="date_publication" className="form-control"
                        value={formData.date_publication} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Statut</label>
                    <select name="status" id="status" className="form-control"
                        value={formData.status} onChange={handleChange}>
                        <option value="brouillon">Brouillon</option>
                        <option value="publie">Publié</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-warning">Sauvegarder</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/admin/posts')}>
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default PostCreateForm;
