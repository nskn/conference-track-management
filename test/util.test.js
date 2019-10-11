const _prepare4Global = require('../app');
const expect = require('chai').expect;
const assert = require('chai').assert;
const util   = require('../common/services/util');

const talks = [
    'talk topic 1 60min',
    'talk topic 2 60min',
    'talk topic 3 30min',
    'talk topic 4 45min',
    'talk topic 5 20min',
    'talk topic 6 50min'
];

const paths = [
    '../.js',
    './dir/test.cpp',
    '../../../test.html',
    '/block/block2/block3',
    '/xxx/yyy/zzz/abc.js'
];

describe('Testing for util.js', () => {

    describe('When util.array.merge() called', () => {

        it("with [[1], [2]] Should return a array", () => {
            assert.typeOf(util.array.merge([[1], [2]]), 'array');
        });

        it("with [[1,9,9,2], [10,21]] Should return [1,9,2,10,21]", () => {
            expect(util.array.merge([[1,9,9,2], [10,21]])).to.be.deep.equal([1,9,2,10,21]);
        });
    });

    describe('When util.array.getRealLength() called with [1,2,,5,,,6] ', () => {
        let lengthResult;
        beforeEach(() => {
            lengthResult = util.array.getRealLength([1,2,,5,,,6]);
        });

        it("Should return a number", () => {
            assert.typeOf(lengthResult, 'number');
        });

        it("Should return result as 4", () => {
            assert.equal(lengthResult, 4);
        });
    });
    describe('When util.array.clear() called with [1,2,,5,,,6] ', () => {

        let clearResult;
        beforeEach(() => {
            clearResult = util.array.clear([1,2,,5,,,6]);
        });
        it("Should return a array", () => {
            assert.typeOf(clearResult, 'array');
        });

        it("Should return clean array of [1,2,5,6]", () => {
            expect(clearResult).to.be.deep.equal([1,2,5,6]);
        });

    });

    describe('When util.talk.strToJson(talks) called', () => {

        it("Should return a array", () => {
            let results= util.talk.strToJson(talks);
            assert.typeOf(results, 'array');
        });
    
        it("Then element of results should be a object", () => {
            let results= util.talk.strToJson(talks);
            assert.typeOf(results[0], 'object');
        });
        it("Then element of results should non-empty", () => {
            let results= util.talk.strToJson(talks);
            assert.isNotNull(results[0]);
        });
        ;
    });
    
    describe('When util.apth.getRightPath() called', () => {

        it("with paths input Should return a array", () => {
            assert.typeOf(util.path.getRightPath(paths), 'array');
        });
    
        it("with ['/'] input Should return a ['/']", () => {
            expect(util.path.getRightPath(['/'])).to.be.deep.equal(['/']);
        });
    });    
});
