const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const geo = require('../index');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Geocode', () => {
  it('should convert an address into geocoordinates', (done) => {
    let geocoder = new geo();
    geocoder.coordinatesOf('848 Tyler Woods Drive', 'grovetown', '30813', 'GA')
    .then(result => {
      console.log(result);
      expect(result).to.have.property('latitude');
      expect(result).to.have.property('longitude');
      done();
    })
    .catch(err => {
      console.log(err);
      expect.fail('got an erro', 'did not expect error');
      done();
    })
  });

  it('should convert geocordinates into an address', (done) => {
    let geocoder = new geo();
    geocoder.addressOf(33.5122436, -82.1808487)
    .then(result => {
      console.log(result);
      expect(result).to.have.property('formattedAddress');
      done();
    })
    .catch(err => {
      console.log(err);
      expect.fail('got an erro', 'did not expect error');
      done();
    });
  });

  it('should fail to return results for geocoordinates 0 0', (done) => {
    let geocoder = new geo();
    geocoder.addressOf(0, 0)
    .then(result => {
      console.log(result);
      expect.fail('got an address', 'did not expect an address');
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    });
  });
})