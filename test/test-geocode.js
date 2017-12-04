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
      
      expect(result).to.have.property('latitude');
      expect(result).to.have.property('longitude');
      done();
    })
    .catch(err => {
      
      expect.fail('got an erro', 'did not expect error');
      done();
    })
  });

  it('should convert an address string into geocoordinates', (done) => {
    let geocoder = new geo();
    geocoder.coordinatesOfAddress('848 Tyler Woods Dr grovetown 30813 ga')
    .then(result => {
      expect(result).to.have.property('latitude');
      expect(result).to.have.property('longitude');
      done();
    })
    .catch(err => {
      console.log(err);
      expect.fail('got an error', 'did not expect error');
      done();
    });
  }).timeout(5000);

  it('should convert geocordinates into an address', (done) => {
    let geocoder = new geo();
    geocoder.addressOf(33.5122436, -82.1808487)
    .then(result => {
      
      expect(result).to.have.property('formattedAddress');
      done();
    })
    .catch(err => {
      
      expect.fail('got an erro', 'did not expect error');
      done();
    });
  });

  it('should fail to return results for geocoordinates 0 0', (done) => {
    let geocoder = new geo();
    geocoder.addressOf(0, 0)
    .then(result => {
      
      expect.fail('got an address', 'did not expect an address');
      done();
    })
    .catch(err => {
      
      done();
    });
  });
})