const snoowrap = require("snoowrap");

/*

* https://www.reddit.com/prefs/apps
* https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example
* https://not-an-aardvark.github.io/snoowrap/Subreddit.html#getNew__anchor

*/

exports.lambdaHandler = async event => {
  console.log(event);
  console.log("test");

  const r = new snoowrap({
    userAgent: process.env.RedditUserAgent,
    clientId: process.env.RedditClientId,
    clientSecret: process.env.RedditClientSecret,
    refreshToken: process.env.RedditRefreshToken,
  });

  try {
    const posts = await r.getSubreddit(process.env.RedditSubreddit).getNew({
      limit: 1,
    });

    if (typeof posts !== "object" || posts.length === 0)
      throw new Error("No new post found.");

    const newPost = posts[0];

    return {
      author: newPost.author.name,
      text: newPost.title,
      id: newPost.id,
      url: newPost.url,
      context: newPost.subreddit.display_name,
      created_utc: newPost.created_utc,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
