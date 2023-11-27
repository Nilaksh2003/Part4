const blogsRouter= require('express').Router()
const { request } = require('../app')
const Blog=require('../models/blog')
blogsRouter.get('/',(request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if(blog.likes===undefined)
    {
      blog.likes=0
    }
    if(blog.url===undefined||blog.title===undefined)
    {
      response.status(400).error({data:'Url or Title is missing'}).end()
    }
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  blogsRouter.delete('/:id',(request,response)=>{
    const id = request.params.id
    Blog.findByIdAndDelete(id).then(result=>{
      response.status(204).json({message:'Delete Successfully'})
    })
  })
  blogsRouter.put('/:id',(request,response)=>{
    const id = request.params.id
    const blog ={
      title:request.body.title,
      author:request.body.author,
      likes:request.body.likes,
      url:request.body.url
    }
    Blog.findByIdAndUpdate(id,blog).then(result=>{
      response.status(200).json(result)
    })
  })
  module.exports=blogsRouter