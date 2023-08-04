const dbConfig = require("../config/db.config.js");
 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;
 
db.url = dbConfig.url;
db.contact = require("./contact.model.js")(mongoose);
db.type = require("./types.model.js")(mongoose);
//authentication
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
 
module.exports = db;