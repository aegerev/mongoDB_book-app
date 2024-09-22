const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = express.Router();

const mongoUrl = "mongodb://localhost:27017";
const dbName = "bookReviewsApp";

async function connectToDB() {
  const client = await MongoClient.connect(mongoUrl);
  return client;
}

router.get("/", async (req, res) => {
  const client = await connectToDB();
  const db = client.db(dbName);
  const collection = db.collection("books");

  const books = await collection
    .find({}, { projection: { reviews: 0 } })
    .toArray();
  res.json(books);
  client.close();
});

router.get("/:id", async (req, res) => {
  const client = await connectToDB();
  const db = client.db(dbName);
  const collection = db.collection("books");

  const book = await collection.findOne({ _id: new ObjectId(req.params.id) });
  if (!book) {
    res.status(404).send("Book not found");
  } else {
    res.json(book);
  }
  client.close();
});

router.post("/:id/reviews", async (req, res) => {
  const client = await connectToDB();
  const db = client.db(dbName);
  const collection = db.collection("books");

  const review = req.body.review;
  if (!review) {
    res.status(400).send("Review content is required");
  } else {
    // TODO: Update the specified book with the new review
    // Hint: Use the $push operator to add the review to the reviews array
    // const updateResult = await collection.updateOne(...);

    // TODO: Check if the book was found and updated, respond accordingly
    // if (updateResult.matchedCount === 0) { ... } else { ... }

    // Placeholder for the response to keep the endpoint functional
    res.status(501).send("Endpoint functionality not implemented yet");
  }
  client.close();
});

module.exports = router;
