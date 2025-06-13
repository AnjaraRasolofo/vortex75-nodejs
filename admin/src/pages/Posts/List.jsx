// ActualitesList.jsx

import {useState, useEffect} from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

function PostList() {

    const [posts, setPosts] = useState([]);

    const fetchPosts = async() => {
        try {
            const res = await axios.get(`${API_URL}posts`);
            setPosts(res.data);
            console.log(posts);
        } catch (error) {
            console.error("Erreur lors du chargement des actualités:", error);
        }
    }

    const handleEdit = (id) => {
        // Redirection vers une page d'édition
        window.location.href = `/admin/post/edit/${id}`;
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
            try {
                await axios.delete(`${API_URL}post/${id}`);
                fetchPosts(); // Recharger la liste
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    };

    useEffect(()=>{
        fetchPosts();
    }, []);

    return (
        <div className="container">
            <h1>Actualités</h1>
            <a href="/admin/post/add" className="btn btn-success mb-3">+ Ajouter un article</a>

            {posts.length > 0 ? (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Catégorie</th>
                            <th>Auteur</th>
                            <th>Status</th>
                            <th>Date publication</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key = {post.id} >
                                <td> {post.title} </td>
                                <td>{post.category ? post.category.name : 'N/A'}</td>
                                <td>{post.author ? post.author.name : 'N/A'}</td>
                                <td>{post.status || 'N/A'}</td>
                                <td>{ post.date_publication ? new Date(post.date_publication).toLocaleDateString() : 'N/A'}</td>
                                <td><button onClick={() => handleEdit(post.id)}>✏️ Modifier</button></td>
                                <td><button onClick={() => handleDelete(post.id)}>🗑️ Supprimer</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info">Aucun article trouvé.</div>
            )}
 
        </div>
    )
}

export default PostList;

