var mongo = require('mongodb'),
    utils = require('node-utils'),
    events = new (require('events').EventEmitter)();

var errorCallback = exports.errorCallback = function(callback) {
    return function(err) {
        if (err) {
            console.log('DB error occurred:');
            console.log(err);

            events.emit('dberror', err);
            return;
        }

        callback && callback.apply(this, utils.shift(arguments));
    };
};

exports.connect = function(dbname, dbhost, dbport, callback) {
    var db = new mongo.Db(dbname, new mongo.Server(
        dbhost, dbport, {auto_reconnect: true}, {}));

    db.open(errorCallback(function() { callback(db); }));
};

exports.createCollection = function(db, name, callback) {
    db.createCollection(name, errorCallback(callback));
};

exports.getCollection = function(db, name, callback) {
    db.collection(name, errorCallback(callback));
};

exports.drop = function(db, callback) {
    db.dropDatabase(errorCallback(callback));
};

/**
 * Registers a handler for database errors
 */
exports.onError = function(handler) {
    events.on('dberror', handler);
};
