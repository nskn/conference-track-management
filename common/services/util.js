const path = require('path');

let util = {};

util.array = {
    
    merge: (arys, isDuplicate = false) => {
        let result = [];

        arys.forEach(ary => {
            ary.forEach(item => {
                if (isDuplicate) result.push(item);
                else result.indexOf(item) === -1 ? result.push(item) : 0;
            });
        });

        return result;
    },
    
    //Get the actula size of non empty elements.
    getRealLength: ary => {
        let length = 0;

        for (idx in ary) length++;

        return length;
    },
    // Clean array by removing empty elements.
    clear: ary => {
        let newAry = [];

        ary.forEach(item => {
            newAry.push(item);
        });

        return newAry;
    }
};

util.talk = {
    //Convert Single String in to Json Object of taopic and time duration.
    strToJson: talks => {
        let results = [];
        let lightnings = {
            title: '#MERGED#',
            lightning: '',
            timeSpan: 0,
            unit: global.config.timeUnit,
            weight: 0,
            scheduled: '',
            merged: []
        };

        talks.forEach(talk => {
            let regExpTitle = /[a-zA-Z0-9\u4E00-\u9FA5\uF900-\uFA2D]+[\-\']*$/g;
            let regExpTimeSymbol = /[\w\u4E00-\u9FA5\uF900-\uFA2D]+$/g;
            let tmp = {};
            talk = talk.trim();

            tmp.title = talk.replace(regExpTitle, '').trim();
            if (!tmp.title) tmp.title = talk.match(regExpTitle) ? talk.match(regExpTitle)[0] : 'Unknown';

            let timeSymbol = talk.match(regExpTimeSymbol);
            if (!timeSymbol) timeSymbol = '0';
            else timeSymbol = timeSymbol[0];

            tmp.lightning = '';
            if (timeSymbol === global.config.lightning.symbol) {
                tmp.lightning = global.config.lightning.symbol;
                tmp.timeSpan = global.config.lightning.timeSpan;
            }
            else {
                let timeSpan = timeSymbol.replace(/[^0-9]/ig, '');

                if (!timeSpan) {
                    tmp.timeSpan = 0;
                    tmp.title += ` ${timeSymbol}`;
                    //console.log('Error in get time for talk topic.');
                }
                else tmp.timeSpan = Number(timeSpan);
            }

            tmp.unit = global.config.timeUnit;
            tmp.weight = tmp.timeSpan;
            tmp.scheduled = '';

            if (global.config.lightning.merge && !!tmp.lightning) {
                lightnings.merged.push(tmp);
                lightnings.timeSpan += global.config.lightning.timeSpan;
                lightnings.weight = lightnings.timeSpan;
            } else if (tmp.timeSpan) results.push(tmp);
        });

        if (global.config.lightning.merge && lightnings.merged.length !== 0) {
            lightnings.timeSpan += global.config.lightning.merge.timeSpan;
            lightnings.weight = lightnings.timeSpan;
            lightnings.type = 'merged';

            results.push(lightnings);
        }

        return results;
    }
};

util.path = {
    getRightPath: paths => {
        let rightPath = [];

        paths.forEach(_path => {
            let tmp = path.relative(__dirname, _path);
            rightPath.push(path.join(__dirname, tmp));
        });

        return rightPath;
    }
};

module.exports = util;
