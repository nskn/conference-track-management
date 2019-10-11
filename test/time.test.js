const _prepare4Global = require('../app');
const time   = require('../common/services/time');
const expect = require('chai').expect;
const assert =require('chai').assert;

describe('Testing for time.js', () => {
    

    describe('When time.duration("21:00", "22:00") called ', () => {
        let resultSpan;
        beforeEach(() => {
            resultSpan = time.duration('21:00', '22:00');
        });
        it("Count the minutes between A and B, should return a number", () => {
            assert.typeOf(resultSpan, 'number');
        });
        
        it("Count the minutes between 21:00 and 22:00, should return a 60", () => {
            assert.equal(resultSpan, 60);
        });
    });


    describe('When time.elapse("21:00", 45) called ', () => {
        let result;
        beforeEach(() => {
            result = time.elapse('21:00', 45);
        });
        it("When specify the time, plus the number of minutes specified, should return a string", () => {
            assert.typeOf(result, 'string');
        });

        it("When Specify the 21:00, plus the 45 minutes specified, should return 21:45", () => {
            assert.equal(result, '21:45');
        });
    });

    describe('When time.longToShortTimeClock("21:00") called ', () => {
        let timeResult;
        beforeEach(() => {
            timeResult = time.longToShortTimeClock("21:00");
        });
        it("Should return a string", () => {
            assert.typeOf(timeResult, 'string');
        });

        it("Should return 09:00PM", () => {
            assert.equal(timeResult, '09:00PM');
        });
    });

    describe('When time.isExcess called with different values.', () => {

        it("It Should return a boolean value always.", () => {
            assert.typeOf(time.isExcess('21:00', '21:15'), 'boolean');
        });

        it("When the first argument was earlier than the second argument, should return false", () => {
            assert.isNotOk(time.isExcess('21:00', '21:01'));
        });

        it("When the first argument was later than the second argument, should return true", () => {
            assert.isOk(time.isExcess('21:02', '21:01'));
        });

        it("When the first argument is the same as the second argument, should return false", () => {
            assert.isNotOk(time.isExcess('21:01', '21:01'));
        });

        it("22:00 was later than 21:01, should return true", () => {
            assert.isOk(time.isExcess('22:00', '21:01'));
        });
    });
});
