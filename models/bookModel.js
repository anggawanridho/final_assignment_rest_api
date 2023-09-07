const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  pengarang: {
    type: String,
    default: "Adolf Hitler",
  },
  isbn: {
    type: String,
    required: true,
    unique: true, // ISBN harus unik
  },
  genre: {
    type: String,
    default: "Motivation",
  },
  tahunTerbit: {
    type: Number,
    default: 1950,
  },
  jumlahSalinanTersedia: {
    type: Number,
    default: 1, // Jumlah salinan yang tersedia, jumlah default adalah 1
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
