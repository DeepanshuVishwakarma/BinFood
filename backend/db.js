const mongoose = require("mongoose");
const mongoURI =
  "mongodb://myfood:deepanshu%400000@ac-9qz1yh2-shard-00-00.awzjbbs.mongodb.net:27017,ac-9qz1yh2-shard-00-01.awzjbbs.mongodb.net:27017,ac-9qz1yh2-shard-00-02.awzjbbs.mongodb.net:27017/myfood?ssl=true&replicaSet=atlas-ovje04-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      callback(err);
    } else {
      console.log("Connected to MongoDB");
      const foodCollection = mongoose.connection.db.collection("fooditems");
      const categoryCollection =
        mongoose.connection.db.collection("food_catagory");

      try {
        const foodData = await foodCollection.find({}).toArray();
        const categoryData = await categoryCollection.find({}).toArray();
        console.log(foodData);
        console.log(categoryData);
        callback(null, foodData, categoryData);
      } catch (error) {
        console.error("Error fetching data from collections:", error);
        callback(error);
      }
    }
  });
};
