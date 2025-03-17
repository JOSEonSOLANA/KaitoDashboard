import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/kaito";

// 📌 Conectar a MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 📌 Definir el modelo de usuario en MongoDB
const userSchema = new mongoose.Schema({
  username: String,
  yaps_l24h: Number,
  yaps_l7d: Number,
  yaps_l30d: Number,
  yaps_l3m: Number,
  yaps_l6m: Number,
  yaps_l12m: Number,
  yaps_all: Number,
  lastUpdated: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// 📌 Función para obtener datos de un usuario desde la API de Kaito
const fetchFromKaitoAPI = async (username) => {
  try {
    console.log(`📡 Consultando API de Kaito: ${username}`);
    const response = await axios.get(`https://api.kaito.ai/api/v1/yaps?username=${username}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener datos de Kaito AI:", error);
    return null;
  }
};

// 📌 Endpoint para obtener los Yaps de un usuario
app.get("/yaps/:username", async (req, res) => {
  const { username } = req.params;
  const normalizedUsername = username.trim().toLowerCase(); // 🔹 Convertimos siempre a minúsculas

  try {
    let user = await User.findOne({ username: { $regex: `^${normalizedUsername}$`, $options: "i" } });

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (user && user.lastUpdated > fiveMinutesAgo) {
      console.log("✅ Datos recientes en BD, no llamamos a la API");
      return res.json(user);
    }

    // 📡 Obtener datos de la API de Kaito
    const userData = await fetchFromKaitoAPI(username);
    if (!userData) {
      return res.status(404).json({ error: "Usuario no encontrado en la API" });
    }

    const correctedUsername = userData.username_corrected ? userData.username_corrected.toLowerCase() : normalizedUsername;

    const updatedUser = await User.findOneAndUpdate(
      { username: correctedUsername },
      {
        $set: {
          username: correctedUsername,
          yaps_l24h: userData.yaps_l24h || 0,
          yaps_l7d: userData.yaps_l7d || 0,
          yaps_l30d: userData.yaps_l30d || 0,
          yaps_l3m: userData.yaps_l3m || 0,
          yaps_l6m: userData.yaps_l6m || 0,
          yaps_l12m: userData.yaps_l12m || 0,
          yaps_all: userData.yaps_all || 0,
          lastUpdated: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("❌ Error al obtener datos del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 📌 Obtener los rankings de los usuarios almacenados
app.get("/rankings", async (req, res) => {
  try {
    const aggregatePipeline = [
      {
        $group: {
          _id: { $toLower: "$username" },
          username: { $first: "$username" },
          yaps_l24h: { $sum: "$yaps_l24h" },
          yaps_l7d: { $sum: "$yaps_l7d" },
          yaps_all: { $sum: "$yaps_all" },
        },
      },
      { $sort: { yaps_all: -1 } },
    ];

    const rankings = await User.aggregate(aggregatePipeline);

    res.json({ top24h: rankings, top7d: rankings, topTotal: rankings });
  } catch (error) {
    console.error("❌ Error al obtener rankings:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 📌 Endpoint para obtener los datos de un proyecto
app.get("/projects/:projectName", async (req, res) => {
  const projectName = req.params.projectName.toLowerCase(); // 🔥 Convertimos a minúsculas para evitar errores

  try {
    const db = mongoose.connection.useDb("Kaito");
    const projectCollection = db.collection("KaitoProjects"); // 🔹 Se busca en la colección principal

    // 🔥 Buscar el proyecto por nombre (ignorando mayúsculas/minúsculas)
    const projectData = await projectCollection.findOne({ name: projectName });

    if (!projectData) {
      return res.status(404).json({ error: "No data found for this project" });
    }

    // 📌 Obtener rankings desde la colección con el nombre del proyecto
    const rankingCollection = db.collection(projectName);
    const rankings = await rankingCollection.find().sort({ position: 1 }).toArray();

    res.json({
      name: projectData.name,
      texto: projectData.texto || "No description available.",
      rankings: rankings || [],
    });
  } catch (error) {
    console.error("❌ Error al obtener datos del proyecto:", error);
    res.status(500).json({ error: "Server error fetching project data" });
  }
});

// 📌 Endpoint para obtener la lista de proyectos
app.get("/projects", async (req, res) => {
  try {
    const db = mongoose.connection.useDb("Kaito");
    const projectCollection = db.collection("KaitoProjects");

    const projects = await projectCollection.find({}, { projection: { _id: 0, name: 1 } }).toArray();
    
    res.json(projects.map(project => project.name));
  } catch (error) {
    console.error("❌ Error al obtener la lista de proyectos:", error);
    res.status(500).json({ error: "Server error fetching projects list" });
  }
});

// 📌 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});





// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/kaito";

// // 📌 Conectar a MongoDB
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // 📌 Definir el modelo de usuario en MongoDB
// const userSchema = new mongoose.Schema({
//   username: String,
//   yaps_l24h: Number,
//   yaps_l7d: Number,
//   yaps_l30d: Number,
//   yaps_l3m: Number,
//   yaps_l6m: Number,
//   yaps_l12m: Number,
//   yaps_all: Number,
//   lastUpdated: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", userSchema);

// // 📌 Función para obtener datos de un usuario desde la API de Kaito
// const fetchFromKaitoAPI = async (username) => {
//   try {
//     console.log(`📡 Consultando API de Kaito: ${username}`);
//     const response = await axios.get(`https://api.kaito.ai/api/v1/yaps?username=${username}`);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error al obtener datos de Kaito AI:", error);
//     return null;
//   }
// };


// // 📌 Endpoint para obtener los Yaps de un usuario
// app.get("/yaps/:username", async (req, res) => {
//   const { username } = req.params;
//   const normalizedUsername = username.trim().toLowerCase(); // 🔹 Convertimos siempre a minúsculas

//   try {
//     // 🔥 Buscamos en la BD sin importar mayúsculas/minúsculas
//     let user = await User.findOne({
//       username: { $regex: `^${normalizedUsername}$`, $options: "i" }
//     });

//     // ⚡ Si los datos en la BD son recientes (5 min), los usamos
//     const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
//     if (user && user.lastUpdated > fiveMinutesAgo) {
//       console.log("✅ Datos recientes en BD, no llamamos a la API");
//       return res.json(user);
//     }

//     // 📡 Obtener datos de la API de Kaito
//     const userData = await fetchFromKaitoAPI(username);
//     if (!userData) {
//       return res.status(404).json({ error: "Usuario no encontrado en la API" });
//     }

//     // 🔥 Guardar SIEMPRE en minúsculas
//     const correctedUsername = userData.username_corrected ? userData.username_corrected.toLowerCase() : normalizedUsername;

//     // 📝 Actualizar datos en MongoDB con el nombre en minúsculas
//     const updatedUser = await User.findOneAndUpdate(
//       { username: correctedUsername }, // 🔹 Buscar siempre por minúsculas
//       {
//         $set: {
//           username: correctedUsername, // 🔥 Guardamos solo en minúsculas
//           yaps_l24h: userData.yaps_l24h || 0,
//           yaps_l7d: userData.yaps_l7d || 0,
//           yaps_l30d: userData.yaps_l30d || 0,
//           yaps_l3m: userData.yaps_l3m || 0,
//           yaps_l6m: userData.yaps_l6m || 0,
//           yaps_l12m: userData.yaps_l12m || 0,
//           yaps_all: userData.yaps_all || 0,
//           lastUpdated: new Date(), // ⏳ Guardar la fecha de actualización
//         },
//       },
//       { upsert: true, new: true }
//     );

//     res.json(updatedUser);
//   } catch (error) {
//     console.error("❌ Error al obtener datos del usuario:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });



// // 📌 Obtener los rankings de los usuarios almacenados
// app.get("/rankings", async (req, res) => {
//   try {
//     const aggregatePipeline = [
//       {
//         $group: {
//           _id: { $toLower: "$username" }, // 🔥 Normaliza a minúsculas
//           username: { $first: "$username" }, // Mantiene el formato correcto
//           yaps_l24h: { $sum: "$yaps_l24h" },
//           yaps_l7d: { $sum: "$yaps_l7d" },
//           yaps_all: { $sum: "$yaps_all" },
//         },
//       },
//     ];

//     // 📌 Ejecutar la agregación
//     const rankings = await User.aggregate(aggregatePipeline);

//     // 📌 Separar rankings en distintos períodos
//     const top24h = [...rankings].sort((a, b) => b.yaps_l24h - a.yaps_l24h).slice(0, 10);
//     const top7d = [...rankings].sort((a, b) => b.yaps_l7d - a.yaps_l7d).slice(0, 10);
//     const topTotal = [...rankings].sort((a, b) => b.yaps_all - a.yaps_all).slice(0, 10);

//     res.json({ top24h, top7d, topTotal });
//   } catch (error) {
//     console.error("❌ Error al obtener rankings:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });


// // 📌 Endpoint para obtener los datos de un proyecto

// app.get("/projects/:projectName", async (req, res) => {
//   const projectName = req.params.projectName.toLowerCase(); // 🔥 Convertimos a minúsculas para evitar errores

//   try {
//     const db = mongoose.connection.useDb("Kaito");
//     const projectCollection = db.collection("KaitoProjects"); // 🔹 Se busca en la colección principal

//     // 🔥 Buscar el proyecto por nombre (ignorando mayúsculas/minúsculas)
//     const projectData = await projectCollection.findOne({ name: projectName });

//     if (!projectData) {
//       return res.status(404).json({ error: "No data found for this project" });
//     }

//     res.json({
//       texto: projectData.texto || "No description available.",
//       rankings: projectData.rankings || [],
//     });
//   } catch (error) {
//     console.error("❌ Error al obtener datos del proyecto:", error);
//     res.status(500).json({ error: "Server error fetching project data" });
//   }
// });


// // 📌 Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
// });




























