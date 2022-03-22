const { User } = require("../models");

const userData = [
  {
    username: "joshlyons",
    email: "joshlyons@email.com",
    password: "p@$$word1!",
  },
  {
    username: "j.maclellan",
    email: "kittensarelove@email.com",
    password: "default",
  },
  {
    username: "Will4Eva",
    email: "ihaveglasses@email.com",
    password: "123456",
  },
  {
    username: "KidRockRulez",
    email: "IAmtheProblem@aol.com",
    password: "iheartkidrock",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
