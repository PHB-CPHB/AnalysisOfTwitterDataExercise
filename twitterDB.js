var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let connection;

function getTweetsDB(){
 return new Promise((resolve, reject) =>  {
   MongoClient.connect(url, function(err, mongoDB) {
     connection = mongoDB;
      if (err) reject(err);
      const tweetsCollection = mongoDB.db("social_net").collection("tweets");
      resolve(tweetsCollection);
    });
 })
}

function closeMongoDB(){
  try {
    connection.close();
  } catch (err) {
      throw err;
  }
}

// Total count of unique users in the tweet database
function getCount(){
  return new Promise((resolve, reject) => {
    getTweetsDB().then( db => {
      db.distinct("user", (err, result) => {
        if (err)  reject(err);
        resolve(result.length);
        closeMongoDB();
      });
    });
  })
}

// The 5 most grumpy users in the tweet database
function getMostGrumpy() {
  const query = [
      {"$match": {"polarity": {"$eq": 0},}},
      {"$group": {"_id": "$user", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 5}
  ];

  return _getAggregatedResultsByQuery(query);
}

// The 5 most happy users in the tweet database
function getMostHappy() {
  const query = [
      {"$match": {"polarity": {"$eq": 4},}},
      {"$group": {"_id": "$user", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 5}
  ];

  return _getAggregatedResultsByQuery(query);
}

// The 10 most active users in the tweet database
function getMostActive() {
  const query = [
      {"$group": {"_id": "$user", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 10}
  ];

  return _getAggregatedResultsByQuery(query);
}

// The 10 most mentioned users in the tweet database
function getMostMentioned() {
  const regexMen = new RegExp('(?=^|(?=[^a-zA-Z0-9-_\\.]))@([A-Za-z]+[A-Za-z0-9_]+)');
  const query = [
      {"$match": {"text": {"$regex": regexMen}}},
      {"$project": {"user": "$user", "texts": {"$split": ["$text", " "]}}},
      {"$unwind": "$texts"},
      {"$match": {"texts": {"$regex": regexMen}}},
      {"$group": {"_id": "$texts", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 10}
  ];

  return _getAggregatedResultsByQuery(query);
}

// The 10 most linked users in the tweet database
function getMostLinks() {
  const regexLink = new RegExp('(?=^|(?=[^a-zA-Z0-9-_\\.]))@([A-Za-z]+[A-Za-z0-9_]+)');
  const query = [
      {"$match": {"text": {"$regex": regexLink}}},
      {"$group": {"_id": "$user", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 10}
  ];

  return _getAggregatedResultsByQuery(query);
}



function _getAggregatedResultsByQuery(query) {
    return new Promise((resolve, reject)=> {
        getTweetsDB().then(db=> {
            db.aggregate(query).toArray((err, result) => {
                closeMongoDB();
                if (err) reject(err);
                const res = result.map((item, i) => {
                    return {rank: i + 1, name: item._id, count: item.count};
                });
                return resolve(res);
            })
        });
    });
}

export default {
  getCount,
  getMostGrumpy,
  getMostHappy,
  getMostActive,
  getMostMentioned,
  getMostLinks,
}