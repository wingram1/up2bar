const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Red Door sucks tonight- wayyyy too crowded.",
    user_id: 1,
    post_id: 2,
  },
  {
    comment_text: "Why would anyone give Kid Rock a bar??",
    user_id: 2,
    post_id: 3,
  },
  {
    comment_text: "BACHELORETTE I LOVE NA$HVILLE!!",
    user_id: 3,
    post_id: 4,
  },
  {
    comment_text: "Puke on the sidewalk outside of Winners. Watch your step.",
    user_id: 4,
    post_id: 5,
  },
  {
    comment_text: "I hate everything downtown. Full stop.",
    user_id: 4,
    post_id: 6,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
