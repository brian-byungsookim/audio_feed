var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var DB_NAME = 'users';
var exports = module.exports = {};

// GET /audio-feed/:user_id
exports.getAudioFeed = function(db, user_id, callback) {
    var collection = db.collection(DB_NAME);
    
    // TODO: user_id length != 24 chars --> error
    // TODO: user_id not valid --> error JSON
    collection.find(
        {"_id": new ObjectId(user_id)}
    ).toArray(function(err, user) {
        assert.equal(err, null);
        console.log('GET/audio-feed/' + user_id + ' --> ' + JSON.stringify(user[0]));
        // TODO: take the array of feed ids and then query feeds collection to build the JSON string of feeds
        callback({'feed_response': user});
    });
}

// POST /audio-feed/:user_id
exports.insertAudioFeed = function(db, user_id, feed_ids, callback) {
    var collection = db.collection(DB_NAME);

    console.log(JSON.parse(feed_ids));

    collection.updateOne(
        {"_id": new ObjectId(user_id)},
        {$push: {feed: {$each: JSON.parse(feed_ids)} }},
        function(err, result) {
            assert.equal(err, null);
            assert.equal(result.result.ok, 1);
            console.log('POST/audio-feed/' + user_id + ' --> ' + JSON.stringify(result));
            callback({'feed_response': result});
        }
    );
}


// PUT /audio-feed/:user_id/
exports.updateAudioFeed = function(db, user_id, feed_ids, callback) {
    var collection = db.collection(DB_NAME);

    console.log(JSON.parse(feed_ids));

    collection.updateOne(
        {"_id": new ObjectId(user_id)},
        {$set: {feed: JSON.parse(feed_ids)}},
        function(err, result) {
            assert.equal(err, null);
            assert.equal(result.result.ok, 1);
            console.log('PUT/audio-feed/' + user_id + ' --> ' + JSON.stringify(result));
            callback({'feed_response': result});
        }
    );

}


// DELETE /audio-feed/:user_id/:obj_id
exports.deleteAudioFeed = function(db, user_id, obj_id, callback) {
    var collection = db.collection(DB_NAME);

    console.log(obj_id);

    collection.updateOne(
        {"_id": new ObjectId(user_id)},
        {$pull: {feed: obj_id}},
        function(err, result) {
            assert.equal(err, null);
            //assert.equal(matchedCount, 1);
            console.log(result);
            console.log('DELETE/audio-feed/' + user_id + ' --> ' + JSON.stringify(result));
            callback({'feed_response': result});
        }
    );
}
