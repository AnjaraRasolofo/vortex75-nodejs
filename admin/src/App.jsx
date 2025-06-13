// App.jsx

import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from './components/Menu';
import PostList from "./pages/Posts/List";
import PostCreateForm from "./pages/Posts/Create";
import PostEditForm from "./pages/Posts/Edit";
/*import Actualites from './pages/Actualites';
import Tutoriels from './pages/Tutoriels';
import Produits from './pages/Produits';
import Auteurs from './pages/Auteurs';
import Home from './pages/Home';*/
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faTimes);

function App() {
  return (
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/admin/posts" element={<PostList />} />
        <Route path="/admin/post/add" element={<PostCreateForm />} />
        <Route path="/admin/post/edit/:id" element={<PostEditForm /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;