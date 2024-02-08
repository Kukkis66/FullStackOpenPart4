


const dummy = (blogs) => {
    return 1
  }


const totalLikes = (blogs) => {

    const likess = blogs.reduce((sum, blog) => sum + blog.likes, 0)
        console.log(likess)
   return likess
}
  
  module.exports = {
    dummy,
    totalLikes
  }