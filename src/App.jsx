import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import UserSearch from "./components/UserSearch";
import ProjectList from "./components/ProjectList";
import Rankings from "./components/Rankings";

const App = () => {
  const [activeSection, setActiveSection] = useState("Users");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 🔥 Navbar fija en la parte superior */}
      <Navbar setActiveSection={setActiveSection} />

      {/* 🔥 Contenedor Principal */}
      <Box
        sx={{
          flex: 1, // ✅ Hace que el contenido se expanda correctamente
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          textAlign: "center",
          paddingTop: "80px", // 🔥 Espacio para navbar
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "transparent",
          }}
        >
          {activeSection === "Users" && <UserSearch />}
          {activeSection === "Projects" && <ProjectList />}
          {activeSection === "Rankings" && <Rankings />}
          {!["Users", "Projects", "Rankings"].includes(activeSection) && (
            <Typography variant="h5">Selecciona una sección</Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default App;







// import React, { useState } from "react";
// import { Container, Typography, Box } from "@mui/material";
// import Navbar from "./components/Navbar";
// import UserSearch from "./components/UserSearch";
// import ProjectList from "./components/ProjectList";
// import Rankings from "./components/Rankings";

// const App = () => {
//   const [activeSection, setActiveSection] = useState("Users");

//   return (
//     <div className="main-content">
//       <Navbar setActiveSection={setActiveSection} />

//       {/* 🔥 Contenedor Principal Centrado */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-start",
//           alignItems: "center",
//           minHeight: "calc(100vh - 150px)", // 🔥 Ajustamos para evitar que la navbar tape contenido
//           width: "100%",
//           textAlign: "center",
//           marginTop: "30px",
//           paddingTop: "20px", // 🔥 Espacio para navbar
//         }}
//       >
//         <Container
//           maxWidth="md"
//           style={{
//             textAlign: "center",
//             padding: "10px",
//             borderRadius: "10px",
//           }}
//         >
//           {activeSection === "Users" && <UserSearch />}
//           {activeSection === "Projects" && <ProjectList />}
//           {activeSection === "Rankings" && <Rankings />}
//           {activeSection !== "Users" && activeSection !== "Projects" && activeSection !== "Rankings" && (
//             <Typography variant="h5">Selecciona una sección</Typography>
//           )}
//         </Container>
//       </Box>
//     </div>
//   );
// };

// export default App;







