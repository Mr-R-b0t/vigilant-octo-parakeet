const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server"); // Replace with the path to your Express app file
const db = require("../models"); // Replace with the path to your Sequelize model file
const expect = chai.expect;

chai.use(chaiHttp);

describe("Checkout API Tests", () => {
  before(async () => {
    // destroy local cookies
    await new Promise((resolve) => {
      chai.request(app).get("/api/user/logout").end(resolve);
    });
    //create testing data
    await db.connex.sync({ force: true });
    await db.checkout.create({
      name: "test",
      adress: "test",
      city: "test",
      date: "2021-04-19T14:00:00.000Z",
      userID: 1,
      cart: {
        products: [
          {
            id: 1,
            name: "test",
            price: 10,
            description: "test",
            image: "test",
            quantity: 1,
          },
        ],
      },
    });
  });

  describe("GET /api/checkout", () => {
    it("should get all checkouts", async () => {
      const res = await chai.request(app).get("/api/checkout");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("POST /api/checkout", () => {
    it("should create a new checkout entry", async () => {
      const newCheckout = {
        name: "test",
        adress: "test",
        city: "test",
        date: "2021-04-19T14:00:00.000Z",
        userID: 1,
        cart: {
          products: [
            {
              id: 1,
              name: "test",
              price: 10,
              description: "test",
              image: "test",
              quantity: 1,
            },
          ],
        },
      };

      const res = await chai
        .request(app)
        .post("/api/checkout")
        .send(newCheckout);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("name").equal(newCheckout.name);
      // Add more assertions based on your model structure
    });
  });


    describe("PUT /api/checkout/:id", () => {
        it("should update a single checkout entry", async () => {
        const checkout = await db.checkout.findOne();
        const res = await chai
            .request(app)
            .put(`/api/checkout/${checkout.id}`)
            .send({ name: "New Name" });
    
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        // Add more assertions based on your model structure
        });
    });

    describe("DELETE /api/checkout/:id", () => {
        it("should delete a single checkout entry", async () => {
        const checkout = await db.checkout.findOne();
        const res = await chai.request(app).delete(`/api/checkout/${checkout.id}`);
    
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message").equal("Checkout was deleted");
        // Add more assertions based on your model structure
        });
    });

    describe("GET /api/checkout/user/:id", () => {
        it("should get all checkouts associated with a specific user", async () => {
        const res = await chai.request(app).get("/api/checkout/user/1");
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        });
    }
    );
});
