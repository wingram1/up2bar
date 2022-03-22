const seedComments = require("./comment-seeds");
const seedPosts = require("./post-seeds");
const seedUsers = require("./user-seeds");

const sequelize = require("../config/connection");

// set up seed sync for all models
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("-------- DB SYNC SUCCESS! ----------\n");
  await seedUsers();
  console.log("-------- USERS SEEDED! ----------\n");
  await seedPosts();
  console.log("-------- POSTS SEEDED! ----------\n");
  await seedComments();
  console.log("-------- COMMENTS SEEDED! ----------\n");
  process.exit(0);
};

seedAll();
