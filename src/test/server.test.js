import chai from "chai";
import { expect } from "chai";
import http from "chai-http";
import server from "../server";
import database from "../utils/db";

chai.use(http);
chai.should();

after(async () => {
  await database.clear();
});

describe("Auctioneer", () => {
  describe("POST /register", () => {
    let users = [
      { email: "d@gmail.com", password: "a123" },
      { email: "e@gmail.com", password: "b123" },
      { email: "f@gmail.com", password: "b123" }
    ];
    it("user should register", done => {
      for (let i = 0; i < users.length; i++) {
        chai
          .request(server)
          .post("/register")
          .set("Accept", "application/json")
          .send(users[i])
          .end((err, res) => {
            res.should.have.status(201);
          });
      }
      done();
    });
  });

  describe("POST /login", () => {
    let user = { email: "a@gmail.com", password: "b123" };

    it("user should log in", done => {
      chai
        .request(server)
        .post("/register")
        .set("Accept", "application/json")
        .send(user)
        .end(done());
      request(server)
        .post("/login")
        .send((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
