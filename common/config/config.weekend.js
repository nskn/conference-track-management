//Weekend config
module.exports = config = {
    timeUnit: 'min',
    lightning: {
        symbol: 'lightning',
        timeSpan: 5
    },
    limit: {
        maxDays: 2 //weekend is only on saturday and sunday so limit days should be 2.
    },
    session: {
        section: {
            split: '-',
            //default scheule This we can change based on requirements and get talks scheduled
            default: [

                '07:00-08:30-Breakfast', 
                '09:00-12:00-Lunch',
                '13:00-17:00-Networking Event'
                
            ],
            //We can specify differnet schedule for next day.
            2: [
                '11:15-12:30-Brunch',              
                '14:00-18:00-Waiting for Friends', 
                '18:30-23:00-Party Finished'       
            ]
        },
        limit: {
            //Sleep clock shoild be between 10:00 PM to 11:30 PM
            'Sleep': {noEarlier: '22:00', noLater: '23:30'}
        }
    },
    track: {
        title: 'Day' //Schedule unit (no of days) for the weekeend conference.
    }
};
