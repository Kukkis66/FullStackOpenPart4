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

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "testTitle",
    author: "testAuthor",
    url: "www.testUrl.test",
    likes: 11,
  };

  const response = await api.get("/api/Blogs");

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response2 = await api.get("/api/Blogs");

  const titles = response2.body.map((r) => r.title);

  expect(response2.body).toHaveLength(response.body.length + 1);
  expect(titles).toContain("testTitle");
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await api.get("/api/Blogs");

  const blogToDelete = blogsAtStart.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await api.get("/api/Blogs");

  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1);

  const blogs = blogsAtEnd.body.map((r) => r.blog);

  expect(blogs).not.toContain(blogToDelete.id);
});

afterAll(async () => {
  await mongoose.connection.close();
});
