const express = require('express')
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eaaai.mongodb.net/{process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(express.json());
app.use(cors());


const port = 4000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const products = client.db("emaJohn").collection("products");

  app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log(product)
    products.insertOne(product)
      .then(result => {
        console.log(result);
      })
  })
});


app.listen(port)