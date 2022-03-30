const { Post } = require("../models");

const postData = [
  {
    title: "I'm So Sad live show tonight!!",
    post_content: "Local Indie band at Basement East- I mean, it's fine.",
    user_id: 1,
    bar_name: 'Basement East',
    post_lat: 36.175720,
    post_lon: -86.755699
  },
  {
    title: "Songwriter's Night @ The Row",
    post_content:
      "Weekly songwriter's showcase tonight at The Row in Midtown. Contact the bar for sign-ups and show times. $5 cover.",
    user_id: 2,
    bar_name: 'The Row',
    post_lat: 36.151360,
    post_lon: -86.797720
  },
  {
    title: "Album Release Party at Ole Red!!",
    post_content:
      "Come see terribly nasaly-sounding new guy with an expensive haircut live in support of his new album I Still Suck.",
    user_id: 2,
    bar_name: "Kid Rock's Steakhouse",
    post_lat: 36.161331,
    post_lon: -86.775673
  },
  {
    title: "Trivia Nighttttt.",
    post_content:
      "Drunk quiz tournament of champions going down @Drifter's tonight! Come down and get trashed. And, you know, answer questions.",
    user_id: 3,
    bar_name: "Drifter's",
    post_lat: 36.176629,
    post_lon: -86.750825
  },
  {
    title: "3 Crow 80s Night",
    post_content:
      "Yes, this is for real. Yes, we still do these themed nights. Yes, there will be a cover.",
    user_id: 4,
    bar_name: "3 Crow Bar",
    post_lat: 36.177250,
    post_lon: -86.750092
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
