const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const app = express();

app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/products';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

app.put("/api/products/:id", async (req, res) => {
    console.log('id', req.params.id);
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
