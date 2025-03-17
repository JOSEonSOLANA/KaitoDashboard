import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import Logo from "../assets/CertifiedYapper.png"; // 📌 Asegúrate de que el logo está en la carpeta correcta

const Navbar = ({ setActiveSection }) => {
  return (
    <>
      {/* 🔥 Navbar Principal con Botones Integrados */}
      <AppBar position="fixed" sx={{ backgroundColor: "#ffffff", zIndex: 1100, top: 0 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "10px 20px" }}>
          {/* 🔹 Logo y Título */}
          <Box display="flex" alignItems="center">
            <img src={Logo} alt="Certified Yapper" style={{ height: "40px", marginRight: "10px" }} />
            <Typography variant="h4" sx={{ color: "#008f39", fontWeight: "bold" }}>
              Kaito Yaps Dashboard
            </Typography>
          </Box>

          {/* 🔹 Botones de Navegación */}
          <Box>
            <Button sx={{ color: "#008f39", fontWeight: "bold", mx: 1 }} onClick={() => setActiveSection("Users")}>
              USERS
            </Button>
            <Button sx={{ color: "#008f39", fontWeight: "bold", mx: 1 }} onClick={() => setActiveSection("Projects")}>
              PROJECTS
            </Button>
            <Button sx={{ color: "#008f39", fontWeight: "bold", mx: 1 }} onClick={() => setActiveSection("Rankings")}>
              RANKINGS
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 📌 Espacio extra para evitar que el contenido quede oculto debajo de la navbar */}
      <Box sx={{ height: "80px" }} />
    </>
  );
};

export default Navbar;



// import React from "react";
// import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
// import Logo from "../assets/CertifiedYapper.png"; // 📌 Asegúrate de que el logo está en la carpeta correcta

// const Navbar = ({ setActiveSection }) => {
//   return (
//     <>
//       {/* 🔥 Navbar Principal - Fondo Blanco */}
//       <AppBar position="fixed" style={{ backgroundColor: "#ffffff", zIndex: 1100, top: "0px" }}>
//         <Toolbar style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0" }}>
//           {/* 🔥 Primera fila con el logo y título */}
//           <Box display="flex" alignItems="center" justifyContent="center">
//             <img src={Logo} alt="Certified Yapper" style={{ height: "40px", marginRight: "10px" }} />
//             <Typography variant="h3" style={{ color: "#008f39", fontWeight: "bold" }}>
//               Kaito Yaps Dashboard
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* 🔥 Navbar Secundaria - Fondo Verde Completo */}
//       <AppBar position="fixed" style={{ top: "70px", height: "5px", backgroundColor: "#4caf50", zIndex: 1099 }}>
//         <Toolbar style={{ display: "flex", justifyContent: "center" }}>
//           <Box display="flex" justifyContent="center" width="100%">
//             <Button style={{ color: "#ffffff", margin: "0 10px", fontWeight: "bold" }} onClick={() => setActiveSection("Users")}>
//               USERS
//             </Button>
//             <Button style={{ color: "#ffffff", margin: "0 10px", fontWeight: "bold" }} onClick={() => setActiveSection("Projects")}>
//               PROJECTS
//             </Button>
//             <Button style={{ color: "#ffffff", margin: "0 10px", fontWeight: "bold" }} onClick={() => setActiveSection("Rankings")}>
//               RANKINGS
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* 📌 Espacio extra para evitar que el contenido quede oculto debajo de la navbar */}
//       <Box sx={{ height: "120px" }} />
//     </>
//   );
// };

// export default Navbar;

