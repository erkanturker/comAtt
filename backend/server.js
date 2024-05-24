const { PORT } = require("./config");
const app = require("./app");

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
