require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB } = require("./config/database");
const { loadPlanetsData } = require("./models/planets");
const { loadLaunchData } = require("./models/launches");
const PORT = process.env.PORT || 8585;
const server = http.createServer(app);

async function startServer() {
  await connectDB();
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}\nAccess it at http://localhost:${PORT}`
    );
  });
}

startServer();
