const Book = require("../models/bookModel");

exports.getAllBook = async (req, res) => {
  try {
    const book = await Book.find();
    if (book.length > 0) {
      res.status(200).json({ message: "Book found!", data: book });
    } else {
      res.status(404).json({ message: "Book empty!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ message: "Book registered!", "data:": book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBookById = async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await Book.findOne({ isbn: isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }
    res.json({ message: "Book found!", "data:": book });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateBook = async (req, res) => {
  const { isbn } = req.params;
  const updatedBook = req.body;
  try {
    const book = await Book.findOne({ isbn: isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    Object.keys(updatedBook).forEach((element) => {
      if (element in updatedBook) {
        book[element] = updatedBook[element];
      }
    });

    await book.save();
    res.status(200).json({ message: "Book updated!", data: book });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteBook = async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await Book.findByIdAndRemove(isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }
    res.status(200).json({ message: "Book deleted!", deletedData: book });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
