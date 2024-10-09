const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

test("Viewing one stock: GET request to /api/stock-prices/", function (done) {
  chai.request(server)
  .get("/api/stock-prices/")
  .set("content-type", "application/json")
  .query({ stock: "MSFT" })
  .end(function (err, res) {
    assert.equal(res.status, 200);
    assert.equal(res.body.stockData.stock, "MSFT");
    assert.isNotNull(res.body.stockData.price);
    done();
  });
});
test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done) {
  chai.request(server)
  .get("/api/stock-prices/")
  .set("content-type", "application/json")
  .query({ stock: "GOLD", like: true })
  .end(function (err, res) {
    assert.equal(res.status, 200);
    assert.equal(res.body.stockData.stock, "GOLD");
    assert.equal(res.body.stockData.likes, 1);
    assert.isNotNull(res.body.stockData.price);
    done();
  });
});
  test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done) {
    chai.request(server)
    .get("/api/stock-prices/")
    .set("content-type", "application/json")
    .query({ stock: "GOLD", like: true })
    .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.stockData.stock, "GOLD");
      assert.equal(res.body.stockData.likes, 1);
      assert.isNotNull(res.body.stockData.price);
      done();
    });
  }); 
  test("Viewing two stocks: GET request to /api/stock-prices/", function (done) {
    chai.request(server)
    .get("/api/stock-prices/")
    .set("content-type", "application/json")
    .query({ stock: ["GOOG", "AMZN"]})
    .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.stockData[0].stock, "GOOG");
      assert.equal(res.body.stockData[1].stock, "AMZN");
      assert.isNotNull(res.body.stockData[0].price);
      assert.isNotNull(res.body.stockData[1].price);
      done();
    });
  }); 
  test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function (done) {
    chai.request(server)
    .get("/api/stock-prices/")
    .set("content-type", "application/json")
    .query({ stock: ["GOOG", "AMZN"], like: true})
    .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.stockData[0].stock, "GOOG");
      assert.equal(res.body.stockData[1].stock, "AMZN");
      assert.isNotNull(res.body.stockData[0].price);
      assert.isNotNull(res.body.stockData[1].price);
      assert.exists(res.body.stockData[0].rel_likes, "has rel_likes");
      assert.exists(res.body.stockData[1].rel_likes, "has rel_likes");
      done();
    });
  }); 

});
