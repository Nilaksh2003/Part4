const dummy =(blogs)=>{
    return 1
}

const totalLikes =(blogs)=>{
    var count =0;
    blogs.forEach(element => {
        count=count+element.likes
    });
    return count
}

const favoriteBlog =(blogs)=>{
    if(blogs.length===0)
    {
        return null
    }
    let maxLikes=blogs[0].likes
    let maxLikesBlog=blogs[0]
    for(let i=1; i<blogs.length;i++)
    {
        if(blogs[i].likes>maxLikes)
        {
            maxLikes=blogs[i].likes
            maxLikesBlog=blogs[i]
        }
    }
    let favBlog={
        title: maxLikesBlog.title,
        author: maxLikesBlog.author,
        likes: maxLikesBlog.likes
    }
    return favBlog
}

const mostBlogs  =(blogs)=>{
    if(blogs.length===0)
    {
        return null
    }
    let maxLikes=blogs[0].likes
    let author=blogs[0].author
    for(let i=1;i<blogs.length;i++)
    {
        if(blogs[i].likes>maxLikes)
        {
            maxLikes=blogs[i].likes
            author=blogs[i].author
        }
    }
    let count = 0
    for(let i=0;i<blogs.length;i++)
    {
        if(blogs[i].author===author)
        {
            count++
        }
    }
    let result ={
        author:author,
        blogs:count
    }
    return result
}

const mostLikes =(blogs)=>{
    if(blogs.length===0)
    {
        return null
    }
    let maxLikes=blogs[0].likes
    let author=blogs[0].author
    for(let i=1;i<blogs.length;i++)
    {
        if(blogs[i].likes>maxLikes)
        {
            maxLikes=blogs[i].likes
            author=blogs[i].author
        }
    }
    let count = 0
    for(let i=0;i<blogs.length;i++)
    {
        if(blogs[i].author===author)
        {
            count=count+blogs[i].likes
        }
    }
    let result ={
        author:author,
        likes:count
    }
    return result
}

module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes 
}