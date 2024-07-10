const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server"); // Assuming your app is exported from "../app"
const db = require("../models");
const User = db.users;

chai.use(chaiHttp);
const expect = chai.expect;

describe("User Routes", () => {
  before(async () => {
    // destroy local cookies
    await new Promise((resolve) => {
      chai.request(app).get("/api/user/logout").end(resolve);
    });
  });



  const agent = chai.request.agent(app);

  describe("POST /api/user", () => {
    it("should create a new user", async () => {
      const res = await agent.post("/api/user").send({
        nickname: "testuser",
        email: "test@example.com",
        password: "password123",
        isAdmin: false,
        isBanned: false,
      });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("id");
    });

    it("should return an error for missing data", async () => {
      const res = await agent.post("/api/user").send({});

      expect(res).to.have.status(400);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal(
        "User must have name, email and password !"
      );
    });
  });
  it("should return an error if user is not logged in", async () => {
    // Make a request to log out the user without an authentication token
    const logoutResponse = await chai.request(app).get("/api/user/logout");

    // Expect a 401 Unauthorized status indicating the user is not authenticated
    expect(logoutResponse).to.have.status(401);

    // Additionally, you can check that the response body contains an error message
    expect(logoutResponse.body).to.have.property("message");
    expect(logoutResponse.body.message).to.equal("No cookie found");
  });
  describe("POST /api/user/login", () => {
  it("should login a user", async () => {
    const res = await chai.request(app).post("/api/user/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
    expect(res.body).to.have.property("user");
    // You may need to adapt this based on the actual response structure
  });
});
describe("POST /api/user/login", () => {
  it("should return an error for an incorrect password", async () => {
    const res = await chai.request(app).post("/api/user/login").send({
      email: "test@example.com",
      password: "incorrectpassword",
    });

    // Expect a 400 Bad Request status
    expect(res).to.have.status(400);

    // Expect the response to have a 'message' property with the error message
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("password incorrect");

    // Adjust the error message to match what your login route actually returns

    // You can also add more specific expectations if needed
  });

  it("should return an error for an email not found", async () => {
    const res = await chai.request(app).post("/api/user/login").send({
      email: "nonexistent@example.com",
      password: "password123",
    });

    // Expect a 400 Bad Request status
    expect(res).to.have.status(400);

    // Expect the response to have a 'message' property with the error message
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("email not found");

    // Adjust the error message to match what your login route actually returns

    // You can also add more specific expectations if needed
  });
});

describe("GET /api/user/auth", () => {
  it("should return the user if logged in", async () => {
    const res = await agent.get("/api/user/auth");

    expect(res).to.have.status(200);

    // You may need to adapt this based on the actual response structure
  });

  describe("POST /api/user/logout", () => {
    it("should log out a user", async () => {
      // Perform a login to obtain a valid authentication token
      await agent.post("/api/user/login").send({
        email: "test@example.com",
        password: "password123",
    });
      
        // Make a request to log out the user
        const logoutResponse = await agent.get("/api/user/logout");
  
        // Expect a 200 OK status
        expect(logoutResponse).to.have.status(200);
  
        // Expect the response to have a 'message' property with the success message
        expect(logoutResponse.body).to.have.property("message");
        expect(logoutResponse.body.message).to.equal("Logged out");
  
        // You can also add more specific expectations if needed
      }
    );
  });

describe("GET /api/user", () => {
  it("should return a list of users", async () => {
    const res = await agent.get("/api/user");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    // You may need to adapt this based on the actual response structure
  });
}
);
});

/* //delete a user by their ID
describe("DELETE /api/user/:id", () => {
  it("should delete a user by their ID", async () => {
    const res = await agent.delete("/api/user/:id");

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("User was deleted");
  });

  it("should return an error if the user does not exist", async () => {
    const res = await agent.delete("/api/user/:id");

    expect(res).to.have.status(400);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("Could not delete");
  }
  );
}
); */

/* //update the banned status of a user by their ID
describe("PUT /api/user/:id", () => {
  it("should update the banned status of a user by their ID", async () => {
    const res = await agent.put("/api/user/:id");

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("User was updated");
  });

  it("should return an error if the user does not exist", async () => {
    const res = await agent.put("/api/user/:id");

    expect(res).to.have.status(400);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("User not found");
  }
  );
}
);

//update a user by their ID
describe("PUT /api/user/update/:id", () => {
  it("should update a user by their ID", async () => {
    const res = await agent.put("/api/user/update/:id");

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("User was updated");
  });

  it("should return an error if the user does not exist", async () => {

    const res = await agent.put("/api/user/update/:id");

    expect(res).to.have.status(400);

    expect(res.body).to.have.property("message");

    expect(res.body.message).to.equal("User not found");

  });

});

//update the admin status of a user by their ID

describe("PUT /api/user/admin/:id", () => {

  it("should update the admin status of a user by their ID", async () => {
      
      const res = await agent.put("/api/user/admin/:id");
  
      expect(res).to.have.status(200);
  
      expect(res.body).to.have.property("message");
  
      expect(res.body.message).to.equal("User was updated");
  
    }
    
      );

  it("should return an error if the user does not exist", async () => {
      
      const res = await agent.put("/api/user/admin/:id");
  
      expect(res).to.have.status(400);
  
      expect(res.body).to.have.property("message");
  
      expect(res.body.message).to.equal("User not found");
  
    }

  );
}
); */

  // After you've finished your tests, you can close the agent
  after(async () => {
    agent.close();
  });
});