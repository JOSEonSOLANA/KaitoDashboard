

import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import UserCard from "./UserCard";

const UserSearch = () => {
  const [usernames, setUsernames] = useState([]); // Lista de nombres únicos
  const [newUsername, setNewUsername] = useState("");
  const [userData, setUserData] = useState([]);

  const handleAddUser = async () => {
    if (!newUsername.trim()) return;
    const normalizedUsername = newUsername.trim().toLowerCase(); // 🔥 Convertir a minúsculas antes de la búsqueda
  
    try {
      const response = await axios.get(`http://localhost:5000/yaps/${normalizedUsername}`);
  
      // 🔥 El nombre que nos devuelve la API también lo pasamos a minúsculas
      const correctedUsername = (response.data.username_corrected || response.data.username).toLowerCase();
  
      // 🚨 Verificar si el usuario ya existe antes de agregarlo
      if (!usernames.includes(correctedUsername)) {
        setUserData([...userData, { ...response.data, username: correctedUsername }]);
        setUsernames([...usernames, correctedUsername]);
      }
  
      setNewUsername("");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex-start",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        minHeight: "60vh",
        
      }}
    >
      <Typography variant="h5" style={{ marginBottom: "10px", color: "#4caf50" }}>
        🔍 Find your profile on Kaito AI
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <TextField
          label="Enter your username"
          variant="outlined"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={{ marginRight: "10px", backgroundColor: "#ffffff", borderRadius: "5px" }}
        />
        <Button variant="contained" style={{ backgroundColor: "#4caf50", color: "#ffffff" }} onClick={handleAddUser}>
          Search
        </Button>
      </div>

      <Grid container spacing={3} sx={{ marginTop: userData.length === 0 ? "30px" : "10px" }}>
        {userData.map((user) => (
          <Grid item xs={12} sm={6} md={6} key={user.username.toLowerCase()}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserSearch;










