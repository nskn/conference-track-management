const _prepare4Global = require('../app');
const expect = require('chai').expect;
const track  = require('../common/services/track');

describe('Testing for track.js', () => {
    describe(' when track.generator() called.',() => {
        it("Should return a object", () => {
            expect(track.generator()).to.be.an('object');
        });
    })
    
});
