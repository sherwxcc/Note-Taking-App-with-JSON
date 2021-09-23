const request = require("supertest");
const app = require("../app");

// Testing for Routes
describe("Routes tests", () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  test("GET'/': Should return 401 if no username and password given", (done) => {
    request(app)
      .get("/")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("GET'/api/notes': Should return 401 if no username and password given", (done) => {
    request(app)
      .get("/api/notes")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("POST'/api/notes': Should return 401 if no username and password given", (done) => {
    request(app)
      .post("/api/notes")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("PUT'/api/notes/1': Should return 401 if no username and password given", (done) => {
    request(app)
      .put("/api/notes/1")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("DELETE'/api/notes/1': Should return 401 if no username and password given", (done) => {
    request(app)
      .delete("/api/notes/1")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("Authorized user: Should return 404 if the route is incorrect", (done) => {
    let auth = "Basic c2hlcm1hbjoxMjM=";
    request(app)
      .get("/randompath")
      .set("Authorization", auth)
      .expect(404, done)
      .end();
  });

  test("Authorized user: GET'/' Should return the index page", (done) => {
    let auth = "Basic c2hlcm1hbjoxMjM=";
    request(app)
      .get("/")
      .set("Authorization", auth)
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200, done)
      .end();
  });
});
