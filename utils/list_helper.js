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

module.exports={
    dummy,
    totalLikes
}