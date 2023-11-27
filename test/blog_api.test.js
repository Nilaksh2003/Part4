const mongoose = require('mongoose')
mongoose.set("bufferTimeoutMS", 30000)
const supertest = require('supertest')
const Blog= require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initiaBlogs=[
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initiaBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initiaBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initiaBlogs[2])
    await blogObject.save()
    blogObject = new Blog(initiaBlogs[3])
    await blogObject.save()
    blogObject = new Blog(initiaBlogs[4])
    await blogObject.save()
    blogObject = new Blog(initiaBlogs[5])
    await blogObject.save()
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }) 
test('All Blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initiaBlogs.length)
})
test('should have id property instead of _id', async () => {
    const response = await api.get('/api/blogs');
    if(response.body.length>0)
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).toBeUndefined();
  });
test('HttpPostRequest',async ()=>{
    const newBlog = 
    {
        title:'testing',
        author:'test',
        url:'',
        likes:5
    };
    const responsePost = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type','application/json; charset=utf-8')
    const responseGet= await api.get('/api/blogs')
    expect(responseGet.body).toHaveLength(initiaBlogs.length +1)
    expect(responseGet.body).toContainEqual(responsePost.body)

})



afterAll(async () => {
  await mongoose.connection.close()
})