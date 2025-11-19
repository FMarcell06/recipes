import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router';
import { addRecipe, readRecipe, updateRecipe } from '../myBackend';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';


export const UserProfile = () => {
const {user} = useContext(MyUserContext)
  const [file,setFile] = useState(null);
  const [preview,setPreview] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(user);
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
};

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  return (
    <div className="recipe-form-container" style={{ position: "relative" }}>
      <h1 className="form-title">Profil</h1>

      <form className="recipe-card" onSubmit={handleSubmit}>
        <h3>Felhasznákónév: {user?.displayName}</h3>
        <p>Email cím: {user?.email}</p>
    
        {user?.photoURL && <img src={user.photoURL} alt="profilkep" />}
        <label>Új profilkép</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview}  style={{width:"50px",height:"50px",borderRadius:"50%",objectFit:"cover"}} alt="előnézet" className="preview-img" />}

        <button className="save-btn" disabled={loading} type="submit">{loading? "Mentés..." : "Mentés"}</button>
      </form>

      {loading && <div className="loading-overlay">Loading…</div>}
      <IoClose
        onClick={() => navigate("/recipes")}
        className="close-icon"
        title="Vissza"
      />
    </div>
    
  );
};
