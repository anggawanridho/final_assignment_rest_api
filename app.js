const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());

// Menghubungkan ke database MongoDB
if (!process.env.DB_URL) {
  console.error("ENV CANT BE READ");
}
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Berhasil tersambung ke MongoDB");
  })
  .catch((err) => {
    console.error("Error saat menyambungkan ke MongoDB:", err.message);
  });

app.use("/user", userRoutes);

app.use("/api", bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
