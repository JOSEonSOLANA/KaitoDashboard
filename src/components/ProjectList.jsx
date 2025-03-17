import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Select, MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ProjectList = () => {
  const [projects, setProjects] = useState([]); // Lista de proyectos desde la API
  const [selectedProject, setSelectedProject] = useState("");
  const [projectText, setProjectText] = useState("Select a project to view details");
  const [projectRankings, setProjectRankings] = useState([]);

  // 🔹 Cargar lista de proyectos al montar el componente
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects"); // 🔥 Endpoint corregido
        if (response.data.length > 0) {
          setProjects(response.data);
        } else {
          console.error("No projects returned from API");
        }
      } catch (error) {
        console.error("Error fetching project list:", error);
      }
    };

    fetchProjects();
  }, []);

  // 🔹 Cargar detalles del proyecto seleccionado
  useEffect(() => {
    if (!selectedProject) return;

    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${selectedProject.toLowerCase()}`);
        setProjectText(response.data.texto || "No description available.");
        setProjectRankings(response.data.rankings || []);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setProjectText("Error loading project data.");
        setProjectRankings([]);
      }
    };

    fetchProjectData();
  }, [selectedProject]);

  return (
    <Container
      maxWidth={true}
      sx={{
        display: "flex-start",
        flexDirection: "column-reverse",
        alignItems: "center",
        
        textAlign: "center",
        justifyContent: "center",
        width: "100vw",
        minHeight: "80vh",
        paddingTop: "20px",
      }}
    >
      {/* 🔥 Selector de Proyecto */}
      <Typography variant="h5" sx={{ color: "#4caf50", fontWeight: "bold", marginBottom: "10px" ,textAlign: "center",  display: "flex-start"}}>
        🏗️ Select a Project
      </Typography>

      <Box className="project-selector-container" sx={{ width: "100%", display: "flex-start", justifyContent: "center", alignItems: "center", marginBottom: "20px"  }}>
      <Select
  value={selectedProject}
  onChange={(e) => setSelectedProject(e.target.value)}
  displayEmpty
  sx={{
    backgroundColor: "#ffffff",
    color: "#000",
    marginBottom: "30px",
    width: "250px",
  }}
>
  <MenuItem value="" disabled>Select a Project</MenuItem>
  
  {projects && Array.isArray(projects) && projects.length > 0 ? (
  projects.map((project) => (
    <MenuItem key={project} value={project}>
      {project.toUpperCase()}
    </MenuItem>
  ))
) : (
  <MenuItem disabled>No projects available</MenuItem>
)}
</Select>
      </Box>

      {/* 🔥 Contenedor de Texto y Ranking */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "45%",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        {/* 🔹 Texto del Proyecto */}
        <Box
          sx={{
            width: "55%", // 🔥 Ajustado para que el ranking encaje mejor
            backgroundColor: "transparent",
            border: "2px solid #AFFF33",
            borderRadius: "8px",
            padding: "40px",
            color: "#AFFF33",
            fontSize: "1.5rem",
            textAlign: "center",
            fontWeight: "bold",
            minHeight: "250px",
          }}
        >
          {projectText}
        </Box>

        {/* 🔹 Tabla de Ranking */}
        <Box
          sx={{
            width: "35%", // 🔥 Ajuste de tamaño para que quede bien al lado del texto
            maxHeight: "500px",
            overflowY: "auto",
            backgroundColor: "transparent",
            border: "2px solid #AFFF33",
            borderRadius: "8px",
            minWidth: "300px",
          }}
        >
          {projectRankings.length > 0 ? (
            <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "#ffffff" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Position</TableCell>
                    <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>User</TableCell>
                    <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Yaps 24h</TableCell>
                    <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Total Yaps</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectRankings.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ color: "#ffffff" }}>{item.position || "-"}</TableCell>
                      <TableCell sx={{ color: "#ffffff" }}>{item.username || "-"}</TableCell>
                      <TableCell sx={{ color: "#ffffff" }}>{item.yaps_24h || "0"}</TableCell>
                      <TableCell sx={{ color: "#ffffff" }}>{item.yaps_all || "0"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ color: "#ffffff", textAlign: "center", padding: "20px" }}>
              No data available for this project.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProjectList;




// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Container, Typography, Select, MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]); // Lista de proyectos desde la API
//   const [selectedProject, setSelectedProject] = useState("");
//   const [projectText, setProjectText] = useState("Select a project to view details");
//   const [projectRankings, setProjectRankings] = useState([]);

//   // 🔹 Cargar lista de proyectos al montar el componente
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/projects");
//         setProjects(response.data);
//       } catch (error) {
//         console.error("Error fetching project list:", error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // 🔹 Cargar detalles del proyecto seleccionado
//   const fetchProjectData = useCallback(async () => {
//     if (!selectedProject) return;
//     try {
//       const response = await axios.get(`http://localhost:5000/projects/${selectedProject.toLowerCase()}`);
//       setProjectText(response.data.texto || "No description available.");
//       setProjectRankings(response.data.rankings || []);
//     } catch (error) {
//       console.error("Error fetching project data:", error);
//       setProjectText("Error loading project data.");
//       setProjectRankings([]);
//     }
//   }, [selectedProject]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   return (
//     <Container
//       maxWidth={false}
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//         width: "100vw",
//         minHeight: "80vh",
//         paddingTop: "20px",
//       }}
//     >
//       {/* 🔥 Selector de Proyecto */}
//       <Typography variant="h5" sx={{ color: "#4caf50", fontWeight: "bold", marginBottom: "10px" }}>
//         🏗️ Select a Project
//       </Typography>
//       <Select
//         value={selectedProject}
//         onChange={(e) => setSelectedProject(e.target.value)}
//         displayEmpty
//         sx={{
//           backgroundColor: "#ffffff",
//           color: "#000",
//           marginBottom: "30px",
//           width: "250px",
//         }}
//       >
//         <MenuItem value="" disabled>Select a Project</MenuItem>
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <MenuItem key={project.name} value={project.name}>
//               {project.name.toUpperCase()}
//             </MenuItem>
//           ))
//         ) : (
//           <MenuItem disabled>No projects available</MenuItem>
//         )}
//       </Select>

//       {/* 🔥 Contenedor de Texto y Ranking */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "flex-start",
//           width: "90vw",
//           gap: "20px",
//           marginTop: "10px",
//         }}
//       >
//         {/* 🔹 Texto del Proyecto */}
//         <Box
//           sx={{
//             width: "60%",
//             backgroundColor: "transparent",
//             border: "2px solid #AFFF33",
//             borderRadius: "8px",
//             padding: "40px",
//             color: "#AFFF33",
//             fontSize: "1.5rem",
//             textAlign: "center",
//             fontWeight: "bold",
//             minHeight: "250px",
//           }}
//         >
//           {projectText}
//         </Box>

//         {/* 🔹 Tabla de Ranking */}
//         <Box
//           sx={{
//             width: "30%",
//             maxHeight: "500px",
//             overflowY: "auto",
//             backgroundColor: "transparent",
//             border: "2px solid #AFFF33",
//             borderRadius: "8px",
//             minWidth: "300px",
//           }}
//         >
//           {projectRankings.length > 0 ? (
//             <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "#ffffff" }}>
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Position</TableCell>
//                     <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>User</TableCell>
//                     <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Yaps 24h</TableCell>
//                     <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Total Yaps</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {projectRankings.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell sx={{ color: "#ffffff" }}>{item.position || "-"}</TableCell>
//                       <TableCell sx={{ color: "#ffffff" }}>{item.username || "-"}</TableCell>
//                       <TableCell sx={{ color: "#ffffff" }}>{item.yaps_24h || "0"}</TableCell>
//                       <TableCell sx={{ color: "#ffffff" }}>{item.yaps_all || "0"}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Typography sx={{ color: "#ffffff", textAlign: "center", padding: "20px" }}>
//               No data available for this project.
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ProjectList;










// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Container, Typography, Select, MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// const ProjectList = () => {
//   const [projects] = useState([
//     "0g", "anime", "berachain", "corn", "defi_app", "eclipse", "frax", "fuel",
//     "humanity_protocol", "hyperbolic", "infinex", "initia", "iq", "kaito",
//     "lombard", "mantle", "maplestory_universe", "megaeth", "mitosis", "monad",
//     "movement", "multipli", "openledger", "paradex", "pengu", "polkadot",
//     "pyth", "quai", "sei", "skate", "somnia", "soon", "starknet", "story",
//     "succinct", "union", "xion"
//   ]);
  
//   const [selectedProject, setSelectedProject] = useState("");
//   const [projectData, setProjectData] = useState([]);

//   const fetchProjectData = useCallback(async () => {
//     if (!selectedProject) return;
//     try {
//       const response = await axios.get(`http://localhost:5000/projects/${selectedProject.toLowerCase()}`);
//       setProjectData(response.data);
//     } catch (error) {
//       console.error("Error fetching project data:", error);
//     }
//   }, [selectedProject]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         display: "flex-start",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         width: "100%",
//         minHeight: "80vh",
//         paddingTop: "20px",
//         maxHeight: "1500px",
//       }}
//     >
//       {/* 🔥 Selector de Proyecto */}
//       <Typography variant="h5" sx={{ color: "#4caf50", fontWeight: "bold", marginBottom: "10px" }}>
//         🏗️ Select a Project
//       </Typography>
//       <Select
//         value={selectedProject}
//         onChange={(e) => setSelectedProject(e.target.value)}
//         displayEmpty
//         sx={{
//           backgroundColor: "#ffffff",
//           color: "#000",
//           marginBottom: "30px",
//           width: "200px",
//         }}
//       >
//         <MenuItem value="" disabled>Select a Project</MenuItem>
//         {projects.map((project) => (
//           <MenuItem key={project} value={project}>
//             {project.toUpperCase()}
//           </MenuItem>
//         ))}
//       </Select>

//       {/* 🔥 Contenedor de las dos secciones */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//           width: "100%",
//           gap: "20px",
//           marginTop: "10px",
//           padding: "0 5%",
//         }}
//       >
//         {/* 🔹 Texto del Proyecto */}
//         <Box
//           sx={{
//             flex: 100,
//             backgroundColor: "transparent",
//             border: "2px solid #AFFF33",
//             borderRadius: "8px",
//             padding: "40px",
//             color: "#AFFF33",
//             fontSize: "2rem",
//             textAlign: "center",
//             fontWeight: "bold",
            
//           }}
//         >
//           AQUÍ IRÁ TEXTO DEL PROYECTO
//         </Box>

//         {/* 🔹 Tabla de Ranking */}
//         <Box
//           sx={{
//             flex: 500,
//             maxHeight: "500px",
//             overflowY: "auto",
//             backgroundColor: "transparent",
//             border: "2px solid #AFFF33",
//             borderRadius: "8px",
//           }}
//         >
//           {projectData.length > 0 ? (
//             <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e", color: "#ffffff" }}>
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Position</TableCell>
//                     <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>User</TableCell>
//                     <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Yaps 24h</TableCell>
//                     <TableCell sx={{ color: "#AFFF33", fontWeight: "bold" }}>Total Yaps</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {projectData.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell sx={{ color: "#ffffff" }}>{item.position || "-"}</TableCell>
//                       <TableCell sx={{ color: "#ffffff" }}>{item.username || "-"}</TableCell>
//                       <TableCell sx={{ color: "#ffffff" }}>{item.yaps_24h || "0"}</TableCell>
//                       <TableCell sx={{ color: "#ffffff" }}>{item.yaps_all || "0"}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Typography sx={{ color: "#ffffff", textAlign: "center", padding: "20px" }}>
//               No data available for this project.
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ProjectList;




