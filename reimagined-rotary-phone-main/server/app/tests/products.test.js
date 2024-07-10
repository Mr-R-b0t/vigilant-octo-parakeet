const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server"); // Assuming your app is exported from "../app"
const db = require("../models");


chai.use(chaiHttp);

const expect = chai.expect;

describe("Product Routes", () => {
    before(async () => {
        // destroy local cookies
        await new Promise((resolve) => {
            chai.request(app).get("/api/user/logout").end(resolve);
        });
        //create testing data
        await db.connex.sync({ force: true });
        await db.products.create({
            name: 'testproduct',
            price: 10,
            description: 'test description',
            image: 'testimage'
        })
    });

    
  const agent = chai.request.agent(app);


    describe('GET /api/product', () => {
        it('should return all products', async () => {
            const res = await chai.request(app).get('/api/product')
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
        })
    }
    )
    describe('POST /api/product', () => {
        it('should create a new product', async () => {
            const res = await chai.request(app).post('/api/product').send({
                name: 'testproduct',
                price: 10,
                description: 'test description',
                image: 'testimage'
            })
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('id')
        })
        it('should return an error for missing data', async () => {
            const res = await chai.request(app).post('/api/product').send({})
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal("Missing data");
        })
    })
    describe('GET /api/products/:id', () => {
        it('should return a product by id', async () => {
            const res = await chai.request(app).get('/api/product/')
            expect(res).to.have.status(200)
        })
        it('should return an error if product is not found', async () => {
            const res = await chai.request(app).get('/api/product/9999')
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal("Could not find the data");
        })
    })
    describe('DELETE /api/product/:id', () => {
        it('should delete a product by id', async () => {
            const res = await chai.request(app).delete('/api/product/1')
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Product was deleted')
        })
        it('should return an error if product is not found', async () => {
            const res = await chai.request(app).delete('/api/product/999')
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Could not delete')
        })
    })
    describe('PUT /api/products/:id', () => {
        it('should update a product by id', async () => {
            const res = await chai.request(app).put('/api/product/2').send({
                name: 'testproduct',
                photo: 'testphoto',
                price: 10,
                description: 'test description',
                type: 'testtype',
                rating: 5,
                stock: 10
            })
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Product was updated')
        })
        it('should return an error if product is not found', async () => {
            const res = await chai.request(app).put('/api/product/999').send({
                name: 'testproduct',
                price: 10,
                description: 'test description',
                image: 'testimage'
            })
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Could not update')
        })
    })
}
)
