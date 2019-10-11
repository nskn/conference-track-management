const kanpsack = require('./common/services/knapsack');
const util   = require('./common/services/util');
const time   = require('./common/services/time');
const track  = require('./common/services/track');
const reader = require('./common/services/reader');

const cfgArg     = ['--cfg', '-c'];
const cfgLength  = 2;
const cfgDefault = './common/config/config.js';

//Get single or multiple file as input contains talk list with time duration to generate schedule for conference.
let idx;
let cfg;
let argv = process.argv.slice(2);
for (let i = 0; i < cfgArg.length; i++) {
    idx = argv.indexOf(cfgArg[i]);
    if (idx != -1) break;
}
if (idx != -1) {
    let cfgFile = argv[idx+1];
    if (!cfgFile) throw new Error('Error[Please set the config file]');
    cfg = util.path.getRightPath(new Array(cfgFile))[0];
    argv.splice(idx, cfgLength);
} else cfg = cfgDefault;

global.config = require(cfg);

//Retrive File content.
let files = util.path.getRightPath(argv);
reader.getTalkList(files).then(talkList => {

    //get talk list from file content.
    let talks = util.array.merge(talkList);
    talks = util.talk.strToJson(talks);

    let tracks = [];
    let maxDays = global.config.limit.maxDays || true; //check for the no of days schdule for conference

    //Schedule talk as per time limits. 
    while (talks.length && (maxDays === true ? true : tracks.length < maxDays)) {
        this.track = track.generator(tracks.length + 1);

        this.track.sessions.forEach(session => {
           
          /**
           * The problem is summarized as the 01 backpack (kanpsack) problem, 
           * and the appropriate talks topics are scheduled to the appropriate time period.
           */

            let idxs = kanpsack.getSchedule(talks, session.timeRemain);
            if (idxs[0] === undefined && idxs.length != 0) {
                idxs = [];
                talks = [];
            }

            let mark = session.begin;
            idxs.forEach(idx => {
                let talk = talks[idx];
                talk.scheduled = mark;
                mark = time.elapse(mark, talk.timeSpan);

                if (talk.type === 'merged') {
                    let tmp = talk.scheduled;
                    talk.merged.forEach((item, idx) => {
                        item.scheduled = tmp;
                        tmp = time.elapse(tmp, item.timeSpan);
                        if ((idx+1) === talk.merged.length) talk.relaxTime = tmp;
                    });
                }

                session.talks.push(talk);
                session.timeUsed += talk.timeSpan;
                session.timeRemain -= talk.timeSpan;
                delete talks[idx];
            });

            talks = util.array.clear(talks);
            this.track.timeUsed += session.timeUsed;
        });

        if (this.track.timeUsed) tracks.push(this.track);
    }

    // Print Final Conference Schedule
    track.print(tracks);

}).catch(err => {
    console.log(`Error[${err}]`);
});
