import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import UserCard from "./UserCard";

const UsersSection = () => {
  const [yapsData, setYapsData] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const fetchYapsData = async () => {
      if (usernames.length === 0) return;
      try {
        const responses = await Promise.all(
          usernames.map(async (username) => {
            const res = await axios.get(`http://localhost:5000/yaps/${username}`);
            return res.data;
          })
        );
        setYapsData(responses);
      } catch (error) {
        console.error("Error fetching Yaps data:", error);
      }
    };

    fetchYapsData();
  }, [usernames]);

  const handleAddUser = () => {
    const trimmedUsername = newUsername.trim();
    if (trimmedUsername && !usernames.includes(trimmedUsername)) {
      setUsernames([...usernames, trimmedUsername]);
    }
    setNewUsername("");
  };

  const handleRemoveUser = (username) => {
    setYapsData(yapsData.filter(user => user.username !== username));
    setUsernames(usernames.filter(user => user !== username));
  };

  return (
    <Container maxWidth="lg" style={{ textAlign: "center", marginTop: "30px", color: "#ffffff" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <TextField
          label="Enter username"
          variant="outlined"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={{ marginRight: "10px", backgroundColor: "#ffffff", borderRadius: "5px" }}
        />
        <Button variant="contained" style={{ backgroundColor: "#4caf50", color: "#ffffff" }} onClick={handleAddUser}>
          Search
        </Button>
      </div>

      {/* 📌 Centrar Tarjetas */}
      <Grid container spacing={3} justifyContent="center">
        {yapsData.length > 0 ? (
          yapsData.map((user) => (
            <Grid item key={user.username}>
              <UserCard user={user} onRemove={handleRemoveUser} />
            </Grid>
          ))
        ) : (
          <Typography color="textSecondary">No data available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default UsersSection;
