const NodeGeocoder = require('node-geocoder');

class Geocode {
  constructor(options = null) {
    this.geocoder = NodeGeocoder(options);
  }
  /**
   * 
   * @param {String} street 
   * @param {String} city 
   * @param {String} zipcode 
   * @param {String} state 
   */
  coordinatesOf(street, city, zipcode, state) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode(`${street} ${city} ${state} ${zipcode}`)
      .then(result => {
        if(result.length === 0) {
          return reject('No results found.');
        }
        return resolve(result[0]);
      })
      .catch(err => {
        return reject(err);
      })
    });
  }
  /**
   * Attempts to resolve coordinates for the given address string. 
   * @param {String} address A partial or full address to attempt a resolution from
   */
  coordinatesOfAddress(address) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode(address)
      .then(result => {
        if(result.length == 0) { return reject('No results found.'); }
        return resolve(result[0]);
      })
      .catch(err => {
        return reject(err);
      });
    });
  }

  /**
   * 
   * @param {Number} latitude 
   * @param {Number} longitude 
   */
  addressOf(latitude, longitude) {
    return new Promise((resolve, reject) => {
      this.geocoder.reverse({lat: latitude, lon: longitude})
      .then(result => {
        if(result.length === 0) {
          return reject('No results found.');
        }
        return resolve(result[0]);
      })
      .catch(err => {
        return reject(err);
      });
    });
  }
}

module.exports = Geocode;