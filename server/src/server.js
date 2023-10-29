const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets");
const PORT = process.env.PORT || 8585;
const server = http.createServer(app);
async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
