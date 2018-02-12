var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("social_net");
function getCount() {
  dbo.collection("tweets").distinct("user", function(err, result) {
    if (err) throw err;
    console.log("---------------------Total users-------------------")
    console.log("Total users - " + result.length);
    db.close();
  });
}

  //Most Grumpy
  dbo.collection("tweets").aggregate(
    [
      {"$match": {"polarity": {"$eq": 0},}},
      {"$group": {"_id": "$user", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 5}
    ]
  ).toArray(function(err, result){
    if(err) throw err;
    i = 1;
    console.log("---------------------Most Grumpy----------------------")
    result.forEach(function(element){
      console.log("Most grumpy number: " + i + " - " + element["_id"])
      i++;
    });
    db.close()
  })

  //Most Happy
  dbo.collection("tweets").aggregate(
    [
      {"$match": {"polarity": {"$eq": 4},}},
      {"$group": {"_id": "$user", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 5}
    ]
  ).toArray(function(err, result){
    if(err) throw err;
    i = 1;
    console.log("---------------------Most happy--------------------")
    result.forEach(function(element){
      console.log("Most happy number: " + i + " - " + element["_id"])
      i++;
    });
    db.close()
  })

  // Most active
  dbo.collection("tweets").aggregate(
    [
      {"$group": {"_id": "$user", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 10}
    ]
  ).toArray(function(err, result){
    if(err) throw err;
    i = 1;
    console.log("---------------------Most active--------------------")
    result.forEach(function(element){
      console.log("Most active number: " + i + " - " + element["_id"])
      i++;
    });
    db.close()
  })
  
  // Most mentioned users
  var regexMen = new RegExp('(?=^|(?=[^a-zA-Z0-9-_\\.]))@([A-Za-z]+[A-Za-z0-9_]+)');
  dbo.collection("tweets").aggregate(
    [
      {"$match": {"text": {"$regex": regexMen}}},
      {"$project": {"user": "$user", "texts": {"$split": ["$text", " "]}}},
      {"$unwind": "$texts"},
      {"$match": {"texts": {"$regex": regexMen}}},
      {"$group": {"_id": "$texts", "count": {"$sum": 1}}},
      {"$sort": {"count" : -1}},
      {"$limit": 10}
    ]
  ).toArray(function(err, result){
    if(err) throw err;
    i = 1;
    console.log("---------------------Most mentioned---------------")
    result.forEach(function(element){
      console.log("Most active number: " + i + " - " + element["_id"])
      i++;
    });
    db.close()
  })

  // Most links
  var regexLink = new RegExp('(?=^|(?=[^a-zA-Z0-9-_\\.]))@([A-Za-z]+[A-Za-z0-9_]+)');
  dbo.collection("tweets").aggregate(
    [
      {"$match": {"text":  {"$regex": regexLink}}},
      {"$group": {"_id":"$user", "count": {"$sum": 1}}},
      {"$sort": {"count": -1}},
      {"$limit": 10}
    ]
  ).toArray(function(err, result){
    if(err) throw err;
    i = 1;
    console.log("---------------------Most Link---------------")
    result.forEach(function(element){
      console.log("Most active number: " + i + " - " + element["user"])
      i++;
    });
    db.close()
  })
});


