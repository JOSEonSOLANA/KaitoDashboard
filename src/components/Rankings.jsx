import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";

const Rankings = () => {
  const [rankings, setRankings] = useState({ top24h: [], top7d: [], topTotal: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/rankings");
        setRankings(response.data);
      } catch (error) {
        console.error("Error fetching rankings:", error);
        setError("Failed to load rankings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
    const interval = setInterval(fetchRankings, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container
  maxWidth={false}
  sx={{
    display: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "90vw", // 🔹 Limita el ancho
    maxWidth: "1200px", // 🔹 Establece un límite máximo
    minHeight: "80vh",
    padding: "20px",
    margin: "0 auto", // 🔥 Centra el contenedor
  }}
>
      <Typography variant="h4" gutterBottom sx={{ color: "#4caf50", fontWeight: "bold" }}>
        🏆 Rankings of Yaps 🏆
      </Typography>

      {loading && <Typography color="textSecondary">Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 🔥 Siempre 3 columnas
            gap: "30px",
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
            maxWidth: "1300px",
            padding: "10px 0",
            "@media (max-width: 1024px)": {
              gridTemplateColumns: "repeat(1, 1fr)", // 🔥 En pantallas pequeñas se apilan
            },
          }}
        >
          {/* 🔹 Tabla 24h */}
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              minWidth: "380px",
            }}
          >
            <Typography variant="h6" sx={{ color: "#4caf50", marginTop: "10px", textAlign: "center" }}>Last 24 hours</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#ffffff" }}><b>User</b></TableCell>
                  <TableCell sx={{ color: "#ffffff" }}><b>Yaps</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankings.top24h.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell sx={{ color: "#ffffff" }}>@{user.username}</TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>{user.yaps_l24h ? user.yaps_l24h.toFixed(2) : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* 🔹 Tabla 7 días */}
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              minWidth: "380px",
            }}
          >
            <Typography variant="h6" sx={{ color: "#4caf50", marginTop: "10px", textAlign: "center" }}>Last 7 days</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#ffffff" }}><b>User</b></TableCell>
                  <TableCell sx={{ color: "#ffffff" }}><b>Yaps</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankings.top7d.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell sx={{ color: "#ffffff" }}>@{user.username}</TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>{user.yaps_l7d ? user.yaps_l7d.toFixed(2) : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* 🔹 Tabla Total */}
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              minWidth: "380px",
            }}
          >
            <Typography variant="h6" sx={{ color: "#4caf50", marginTop: "10px", textAlign: "center" }}>Total Yaps</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#ffffff" }}><b>User</b></TableCell>
                  <TableCell sx={{ color: "#ffffff" }}><b>Yaps</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankings.topTotal.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell sx={{ color: "#ffffff" }}>@{user.username}</TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>{user.yaps_all ? user.yaps_all.toFixed(2) : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default Rankings;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";

// const Rankings = () => {
//   const [rankings, setRankings] = useState({ top24h: [], top7d: [], topTotal: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRankings = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/rankings");
//         setRankings(response.data);
//       } catch (error) {
//         console.error("Error fetching rankings:", error);
//         setError("Failed to load rankings. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRankings();
//     const interval = setInterval(fetchRankings, 60000); // 🔄 Recargar rankings cada 60 segundos
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         minHeight: "60vh",
//         paddingTop: "20px",
//       }}
//     >
//       <Typography variant="h4" gutterBottom sx={{ color: "#4caf50", fontWeight: "bold" }}>
//         🏆 Rankings of Yaps 🏆
//       </Typography>

//       {loading && <Typography color="textSecondary">Loading...</Typography>}
//       {error && <Typography color="error">{error}</Typography>}

//       {!loading && !error && (
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "20px",
//             width: "100%",
//             justifyContent: "center",
//             alignItems: "start",
//             textAlign: "center",
//             padding: "10px 0",
//           }}
//         >
//           {/* 🔹 Tabla 24h */}
//           <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "#ffffff", width: "100%" }}>
//             <Typography variant="h6" sx={{ color: "#4caf50", marginTop: "10px", textAlign: "center" }}>Last 24 hours</Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ color: "#ffffff" }}><b>User</b></TableCell>
//                   <TableCell sx={{ color: "#ffffff" }}><b>Yaps</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rankings.top24h.map((user) => (
//                   <TableRow key={user.username}>
//                     <TableCell sx={{ color: "#ffffff" }}>@{user.username}</TableCell>
//                     <TableCell sx={{ color: "#ffffff" }}>{user.yaps_l24h ? user.yaps_l24h.toFixed(2) : "-"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* 🔹 Tabla 7 días */}
//           <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "#ffffff", width: "100%" }}>
//             <Typography variant="h6" sx={{ color: "#4caf50", marginTop: "10px", textAlign: "center" }}>Last 7 days</Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ color: "#ffffff" }}><b>User</b></TableCell>
//                   <TableCell sx={{ color: "#ffffff" }}><b>Yaps</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rankings.top7d.map((user) => (
//                   <TableRow key={user.username}>
//                     <TableCell sx={{ color: "#ffffff" }}>@{user.username}</TableCell>
//                     <TableCell sx={{ color: "#ffffff" }}>{user.yaps_l7d ? user.yaps_l7d.toFixed(2) : "-"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* 🔹 Tabla Total */}
//           <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "#ffffff", width: "100%" }}>
//             <Typography variant="h6" sx={{ color: "#4caf50", marginTop: "10px", textAlign: "center" }}>Total Yaps</Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ color: "#ffffff" }}><b>User</b></TableCell>
//                   <TableCell sx={{ color: "#ffffff" }}><b>Yaps</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rankings.topTotal.map((user) => (
//                   <TableRow key={user.username}>
//                     <TableCell sx={{ color: "#ffffff" }}>@{user.username}</TableCell>
//                     <TableCell sx={{ color: "#ffffff" }}>{user.yaps_all ? user.yaps_all.toFixed(2) : "-"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Rankings;





