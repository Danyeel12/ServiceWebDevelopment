const dbConfig = require("../config/db.config.js");
 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;
 
db.url = dbConfig.url;
db.contact = require("./contact.model.js")(mongoose);
db.type = require("./types.model.js")(mongoose);
 
module.exports = db;