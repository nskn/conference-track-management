const time   = require('./time');

let track = {};

// Create Empty Schedule.
track.generator = theXDay => {
    this.track = {};
    this.track.sessions = [];
    this.track.timeUsed = 0;
    this.track.timeRemain = 0;

    let section = (theXDay ? global.config.session.section[theXDay] : false) || global.config.session.section.default;

    section.forEach(item => {
        let session = {};
        
        item = item.split(global.config.session.section.split);
        session.begin = item[0];
        session.end = item[1];
        session.finish = item[2];
        session.timeUsed = 0;
        session.timeRemain = time.duration(session.begin, session.end);
        session.talks = [];

        this.track.timeRemain += session.timeRemain;

        this.track.sessions.push(session);
    });

    return this.track;
}

// Print all track as per schedule.
track.print = tracks => {
    tracks.forEach((track, idx) => {
        console.log(`${global.config.track.title} ${idx+1}:`);
        track.sessions.forEach(session => {
            session.talks.forEach(talk => {
                if (talk.type && talk.type === 'merged') {
                    talk.merged.forEach(data => {
                        console.log(`${time.longToShortTimeClock(data.scheduled)} ${data.title} ${data.lightning}`);
                    });
                    console.log(`${time.longToShortTimeClock(talk.relaxTime)} ${global.config.lightning.merge.break} ${global.config.lightning.merge.timeSpan}${talk.unit}`);
                } else {
                    if (!!talk.lightning) {
                        console.log(`${time.longToShortTimeClock(talk.scheduled)} ${talk.title} ${talk.lightning}`);
                    } else {
                        console.log(`${time.longToShortTimeClock(talk.scheduled)} ${talk.title} ${talk.timeSpan}${talk.unit}`);
                    }
                }
            });

            let limit = global.config.session.limit[session.finish];
            if (limit != undefined) {
                let lastTime = time.elapse(session.begin, session.timeUsed);
                let finishBeginTime = '';

                if (time.isExcess(lastTime, limit.noEarlier)) finishBeginTime = time.longToShortTimeClock(lastTime);
                else finishBeginTime = time.longToShortTimeClock(limit.noEarlier);

                console.log(`${finishBeginTime} ${session.finish}`);
            } else {
                console.log(`${time.longToShortTimeClock(session.end)} ${session.finish}`);
            }
        });
        console.log();
    });
}

module.exports = track;
