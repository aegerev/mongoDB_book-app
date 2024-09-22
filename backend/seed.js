const { MongoClient } = require("mongodb");

const mongoUrl = "mongodb://localhost:27017";
const dbName = "bookReviewsApp";
const client = new MongoClient(mongoUrl);

async function seedDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("books");

    const booksCount = await collection.countDocuments();
    if (booksCount === 0) {
      console.log("Seeding database with initial books...");
      await collection.insertMany([
        { title: "1984", author: "George Orwell", reviews: [] },
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          reviews: [],
        },
        { title: "To Kill a Mockingbird", author: "Harper Lee", reviews: [] },
        { title: "Brave New World", author: "Aldous Huxley", reviews: [] },
      ]);
      console.log("Database seeded successfully!");
    } else {
      console.log("Database already contains books. No seeding needed.");
    }
  } catch (err) {
    console.error("An error occurred connecting to MongoDB:", err);
  } finally {
    await client.close();
  }
}

seedDB();
