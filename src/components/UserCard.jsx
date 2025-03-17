import React from "react";
import { Card, CardContent, Typography, Avatar, IconButton, Grid, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const UserCard = ({ user, onRemove }) => {
  const formattedDate = user.lastUpdated ? format(new Date(user.lastUpdated), "dd/MM/yyyy HH:mm") : "N/A";

  const chartData = [
    { name: "24H", value: user.yaps_l24h || 0 },
    { name: "7D", value: user.yaps_l7d || 0 },
    { name: "30D", value: user.yaps_l30d || 0 },
    { name: "3M", value: user.yaps_l3m || 0 },
    { name: "6M", value: user.yaps_l6m || 0 },
    { name: "12M", value: user.yaps_l12m || 0 },
  ];

  return (
    <Grid 
      container 
      spacing={4} 
      justifyContent="center" 
      alignItems="flex-start"
      sx={{
        display: "flex",
        flexWrap: "nowrap",  /* 🔥 Evita que se solapen en pantallas grandes */
        gap: "40px",  /* 🔥 Asegura separación */
        marginTop: "30px" /* 🔥 Ajusta la altura */
      }}
    >
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={5} 
        lg={4} 
        sx={{ 
          display: "flex", 
          justifyContent: "center",
          minWidth: "400px",  /* 🔥 Define mínimo ancho */
          maxWidth: "500px",  /* 🔥 Controla el tamaño máximo */
          marginLeft: "20px",  /* 🔥 Asegura separación */
          marginRight: "20px",
        }}
      >
        <Card 
          sx={{
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "480px", 
            minWidth: "380px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            marginLeft: "15px",  /* 🔹 Agrega margen a los lados */
            marginRight: "15px"
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <Avatar 
                  src={`https://unavatar.io/twitter/${user.username}`} 
                  alt={user.username} 
                  sx={{ marginRight: "10px" }} 
                />
                <div>
                <Typography variant="h6">@{user.username.toLowerCase()}</Typography>
                  <Typography variant="body2" sx={{ color: "#bbbbbb" }}>
                    Última actualización: {formattedDate}
                  </Typography>
                  {user.yaps_l24h > 0 && (
                    <Typography sx={{ color: "#4caf50", fontWeight: "bold", marginTop: "5px" }}>
                      ACTIVO
                    </Typography>
                  )}
                </div>
              </Box>
              <IconButton onClick={() => onRemove(user.username)} sx={{ color: "#ffffff" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* 📊 Datos de Yaps */}
            <Box display="flex" flexWrap="wrap" justifyContent="center" marginTop="15px">
              {[
                { label: "24H", value: user.yaps_l24h },
                { label: "7D", value: user.yaps_l7d },
                { label: "30D", value: user.yaps_l30d },
                { label: "3M", value: user.yaps_l3m },
                { label: "6M", value: user.yaps_l6m },
                { label: "12M", value: user.yaps_l12m },
                { label: "TOTAL", value: user.yaps_all, highlight: true },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    backgroundColor: item.highlight ? "#4caf50" : "#333",
                    color: item.highlight ? "#000" : "#fff",
                    padding: "12px 16px",
                    margin: "8px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    minWidth: "120px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">{item.label}</Typography>
                  <Typography variant="h6">{item.value?.toFixed(2) || "-"}</Typography>
                </Box>
              ))}
            </Box>

            {/* 📈 Gráfico de línea */}
            <Box marginTop="20px">
              <Typography variant="body2" align="center" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                Evolución de Yaps
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" tick={{ fill: "#fff" }} />
                  <YAxis tick={{ fill: "#fff" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4caf50" strokeWidth={2} dot={{ fill: "#4caf50" }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserCard;





