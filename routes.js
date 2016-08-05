var MongoClient = require('mongodb').MongoClient;
var mongo_layer = require('./mongo_layer.js');
var assert = require('assert');
var express = require('express');
var router = express.Router();
var upload = require('multer')();


var URL = 'mongodb://localhost:27017/audio-db';

router.get('/', function(req, res) {
    console.log('The general landing page for the audio feed.');
    res.send('This is the audio-feed page!');
});

router.get('/:user_id', function(req, res) {
    MongoClient.connect(URL, function(err, db) {
        assert.equal(null, err);
        
        mongo_layer.getAudioFeed(db, req.params['user_id'], function(feed) {
            db.close();
            res.json(feed);
        });
    });
});

router.post('/:user_id', upload.array(), function(req, res) {
    MongoClient.connect(URL, function(err, db) {
        assert.equal(null, err);

        mongo_layer.insertAudioFeed(db, req.params['user_id'], req.body['feeds'], function(feed) {
            db.close();
            res.json(feed);
        });
    });
});

router.put('/:user_id', upload.array(), function(req, res) {
    MongoClient.connect(URL, function(err, db) {
        assert.equal(null, err);

        mongo_layer.updateAudioFeed(db, req.params['user_id'], req.body['feeds'] ,function(feed) {
            db.close();
            res.json(feed);
        });
    });
});

router.delete('/:user_id/:obj_id', function(req, res) {
    MongoClient.connect(URL, function(err, db) {
        assert.equal(null, err);

        mongo_layer.deleteAudioFeed(db, req.params['user_id'], req.params['obj_id'], function(feed) {
            db.close();
            res.json(feed);
        });
    });
});

// Export the router to be used in app.js
module.exports = router;

