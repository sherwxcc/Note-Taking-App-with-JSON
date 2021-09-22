const app = require("../NoteRouter");
const request = require("supertest");

// Test for Routes
describe("Routes tests", () => {
  test("GET: / should return home page", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .expect(res.body)
      .toHaveProperty("get")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
  test("POST: /api/notes should post data", (done) => {
    request(app)
      .post("/api/notes")
      .send({ note: "POST test" })
      .expect(201)
      .expect(res.body)
      .toHaveProperty("post")
      .expect((res) => {
        (res.body.name = note), (res.body.data = "POST test");
      })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
  test("PUT: /api/notes/:id should put data", (data) => {
    request(app)
      .put("/api/notes/2")
      .send({ note: "PUT test" })
      .expect(200)
      .expect(res.body)
      .toHaveProperty("put")
      .expect((res) => {
        (res.body.name = note), (res.body.data = "PUT test");
      });
  });
  test("DELETE: /api/notes/:id should delete data", (data) => {
    request(app).delete("/api/notes/2").expect(200).toHaveProperty("delete");
  });
});
