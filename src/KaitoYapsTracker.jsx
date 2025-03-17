import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import UserSearch from "./components/UserSearch";
import ProjectList from "./components/ProjectList";
import Rankings from "./components/Rankings";

const KaitoYapsTracker = () => {
  const [activeSection, setActiveSection] = useState("Users");

  return (
    <>
      <Navbar setActiveSection={setActiveSection} />
      <Container maxWidth="md" style={{ textAlign: "center", marginTop: "20px", padding: "20px", borderRadius: "10px" }}>
        {activeSection === "Users" && <UserSearch />}
        {activeSection === "Proyects" && <ProjectList />}
        {activeSection === "Rankings" && <Rankings />}
        {activeSection !== "Users" && activeSection !== "Proyects" && activeSection !== "Rankings" && (
          <Typography variant="h5">Selet a section</Typography>
        )}
      </Container>
    </>
  );
};

export default KaitoYapsTracker;


