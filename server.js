require("dotenv").config();
const server = require("./app");
const PORT = process.env.SERVER_PORT || 3000;
server.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
