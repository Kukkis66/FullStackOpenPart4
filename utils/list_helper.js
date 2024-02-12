const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likess = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  console.log(likess);
  return likess;
};

const mostFavourite = (blogs) => {
  let maxLikes = 0;

  blogs.map((blog) => {
    const likesFromBlog = blog.likes;
    maxLikes = Math.max(maxLikes, likesFromBlog);
  });

  const result = blogs.filter((blog) => {
    return blog.likes === maxLikes;
  });

  const toReturn = {
    title: result[0].title,
    author: result[0].author,
    likes: result[0].likes,
  };

  return toReturn;
};

module.exports = {
  dummy,
  totalLikes,
  mostFavourite,
};
