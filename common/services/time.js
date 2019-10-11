let time = {};

//Convert Strig to Json object of talk topic and time 
let strToJson = str => {
    let tmp = str.split(':');
    let obj = {};

    obj.hr = Number(tmp[0]);
    obj.min = Number(tmp[1]);

    if (obj.hr > 23 || obj.min > 59 || obj.hr < 0 || obj.min < 0) {
        throw new Error('Error[Illegal time]' + ` Hour[${obj.hr}]` + ` Minute[${obj.min}]`);
    }

    return obj;
}

//calculate time duration between given times. 3:00-3:10 duration is 10
time.duration = (begin, end) => {
    let oBegin = strToJson(begin);
    let oEnd = strToJson(end);
    let beginMinOffset;
    let endMinOffset;

    if ((oBegin.hr > oEnd.hr) || (oBegin.hr === oEnd.hr && oBegin.min > oEnd.min)) {
        throw new Error('Error[Illegal time]' + ` Start[${begin}]` + ` End[${end}]`);
    }

    if (oBegin.min === 0) {
        beginMinOffset = 0;
    } else {
        oBegin.hr += 1;
        beginMinOffset = 60 - oBegin.min;
    }
    if (oEnd.min === 0) {
        endMinOffset = 0;
    } else {
        oEnd.hr += 1;
        endMinOffset = 60 - oEnd.min;
    }

    return ((oEnd.hr - oBegin.hr) * 60) + beginMinOffset - endMinOffset;
}

// Get time with given time and duration for e.g 4:10 - 20 mins returns 4:30
time.elapse = (time, min) => {
    let oTime = strToJson(time);

    oTime.min += min;

    while (oTime.min > 59 || oTime.min < 0) {
        if (oTime.min > 59) {
            oTime.min -= 60;
            oTime.hr += 1;
        } else if (oTime.min < 0) {
            oTime.min += 60;
            oTime.hr -= 1;
        }
    }

    if (oTime.min === 0) oTime.min = '00';
    if (oTime.hr > 23) console.log('Warning[More than one day]');

    return `${oTime.hr}:${oTime.min}`;
}

//Time conversion from 24 hrs watch to 12 hrs
time.longToShortTimeClock = time => {
    const AM = 'AM';
    const PM = 'PM';
    
    let oTime = strToJson(time);
    let tag = '';

    if (oTime.hr >= 0 && oTime.hr < 12) {
        oTime.hr = `${oTime.hr}`;
        tag = AM;
    } else if (oTime.hr >= 12 && oTime.hr < 24) {
        if (oTime.hr === 12) {
            oTime.hr = 12;
        } else {
            oTime.hr = `${oTime.hr - 12}`;
        }
        tag = PM;
    } else {
        throw new Error('Error[Illegal time]' + ` Time[${time}]`);
    }

    if (oTime.min < 10) oTime.min = `0${oTime.min}`;
    if (oTime.hr < 10) oTime.hr = `0${oTime.hr}`;

    return `${oTime.hr}:${oTime.min}${tag}`;
}

//Check for current time is ahead noEarlier or not if yes return true. e.g 4pm is ahead of 3:30pm
time.isExcess = (current, noEarlier) => {
    let oCurrent = strToJson(current);
    let oNoEarlier = strToJson(noEarlier);

    if (oCurrent.hr > oNoEarlier.hr) return true;
    else if (oCurrent.hr === oNoEarlier.hr) {
        if (oCurrent.min > oNoEarlier.min) return true;
        else return false;
    } else return false;
}

module.exports = time;
