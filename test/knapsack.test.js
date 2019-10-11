const _prepare4Global = require('../app');
const assert = require('chai').assert;
const kanpsack     = require('../common/services/knapsack');

const talks = [
    {title: 'topic-1', lightning: '', timeSpan: 60, unit: 'min', weight: 1, scheduled: ''},
    {title: 'topic-2', lightning: '', timeSpan: 60, unit: 'min', weight: 1, scheduled: ''},
    {title: 'topic-3', lightning: '', timeSpan: 30, unit: 'min', weight: 1, scheduled: ''},
    {title: 'topic-4', lightning: '', timeSpan: 45, unit: 'min', weight: 1, scheduled: ''},
    {title: 'topic-5', lightning: '', timeSpan: 20, unit: 'min', weight: 1, scheduled: ''},
    {title: 'topic-6', lightning: '', timeSpan: 50, unit: 'min', weight: 1, scheduled: ''}
];
const time = 180;

describe('Testing for kanpsack.getSchedule(talks, time)  ', () => { 
    it("Should return a array in any case", () => {
        let tracks = kanpsack.getSchedule(talks, time);
        assert.typeOf(tracks, 'array');
    });
});
