const app = require("./app");

// Set port
const port = process.env.PORT || 3000;
app.set("port", port);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
