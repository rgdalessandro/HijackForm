let assert = chai.assert;
let should = chai.should;
let expect = chai.expect;

// All tests below are passing!
describe('bind.js', function() {
  it('should parse correctly and have a function named `hijackForm`', function(){
    expect(hijackForm).to.be.an('function');
  });
});
