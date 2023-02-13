const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.user = User;
db.post = Post;
db.hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;