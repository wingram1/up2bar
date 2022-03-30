// function to get all posts' lat+lon
async function getPostLocations() {
  const response = await fetch("/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application.json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(reponse.statusText);
      }
    })
    .then((data) => {
      // execute function to map the posts
      mapPosts(data);
    });
}

function mapPosts(posts) {
  // limit of 20 posts displayed at a time
  for (let i = 0; i <= 20; i++) {
    let post = posts[i];

    // if no post, break
    if (!post) {
      break;
    }

    console.log(post);
    mapPost(post);
  }
}

getPostLocations();
