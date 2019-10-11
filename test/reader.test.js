const _prepare4Global = require('../app');
const assert = require('chai').assert;
const reader = require('../common/services/reader');

describe('Testing for reader.js', () => {
    describe('When reader.getTalkList([])  called with data', () => {
        let files = ['resource/topic.txt'];
        it('Should return a array whether fail or succeed', () => {
            reader.getTalkList(files).then(ret => {
                assert.typeOf(ret, 'array');
            }).catch(err => {
                assert.typeOf(ret, 'array');
            });
        });
    });
    describe('When reader.getTalkList() called with no data', () => {
        it('Should return a array even there have no arguments', () => {
            reader.getTalkList().then(ret => {
                assert.typeOf(ret, 'array');
            }).catch(err => {
                assert.typeOf(ret, 'array');
            });
        });
    });
});
