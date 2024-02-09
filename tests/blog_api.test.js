const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// test("bloglist is empty", async () => {
//   const response = await api.get("/api/blogs");

//   expect(response.body).toHaveLength(0);
// });

test("identifier are id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('a valid note can be added', async () => {
    const newBlog = {
        title: "testTitle",
        author: "testAuthor",
        url: "www.testUrl.test",
        likes: 11,
    }
  
    const response = await api.get('/api/Blogs')

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response2 = await api.get('/api/Blogs')
  
    const titles = response2.body.map(r => r.title)
  
    expect(response2.body).toHaveLength(response.body.length + 1)
    expect(titles).toContain(
      'testTitle'
    )
  })

afterAll(async () => {
  await mongoose.connection.close();
});
