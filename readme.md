# conference-track-management

### Prerequisites for running application

#### Install node envirnment if already installed please ignore.
  Download the nvm install script via cURL:
```bash
  $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

# Ensure that nvm was installed correctly with 
  $ nvm --version
 # it should return the version of nvm installed.

# Install the version of Node.js you want
  # Install the latest version with 
    $ nvm install node 
  # Use the latest version with 
    $ nvm use node
  # Install the latest LTS version with 
    $ nvm install --lts
  # Use the latest LTS verison with 
    $ nvm use --lts
 ```
 
### Project setup

Following steps will complete the project setup.

```bash
$ git clone https://github.com/nskn/conference-track-management.git

$ cd conference-track-management

$ npm install
```

### Run project and test cases

```bash
// for single task list.
➜ $ npm run start resource/talks.txt

> conference-track-management@1.0.0 start 
> node app.js $* "resource/talks.txt"

Track 1:
09:00AM Ruby Errors from Mismatched Gem Versions 45min
09:45AM Lua for the Masses 30min
10:15AM Overdoing it in Python 45min
11:00AM Writing Fast Tests Against Enterprise Rails 60min
12:00PM Lunch
01:00PM Rails Magic 60min
02:00PM Woah 30min
02:30PM Accounting-Driven Development 45min
03:15PM Communicating Over Distance 60min
04:15PM Common Ruby Errors 45min
05:00PM Networking Event

Track 2:
09:00AM Clojure Ate Scala (on my project) 45min
09:45AM Ruby on Rails: Why We Should Move On 60min
10:45AM Pair Programming vs Noise 45min
11:30AM Sit Down and Write 30min
12:00PM Lunch
01:00PM User Interface CSS in Rails Apps 30min
01:30PM A World Without HackerNews 30min
02:00PM Ruby on Rails Legacy App Maintenance 60min
03:00PM Ruby vs. Clojure for Back-End Development 30min
03:30PM Programming in the Boondocks of Seattle 30min
04:00PM Rails for Python Developers lightning
04:05PM Networking Event

# Runnning test cases
$ npm run test

#Test Output

➜  conference-track-management npm run test

> conference-track-management@1.0.0 test 
> mocha test/*

  Testing for kanpsack.getSchedule(talks, time)  
    ✓ Should return a array in any case

  Testing for reader.js
    When reader.getTalkList([])  called with data
      ✓ Should return a array whether fail or succeed
    When reader.getTalkList() called with no data
      ✓ Should return a array even there have no arguments

  Testing for time.js
    When time.duration("21:00", "22:00") called 
      ✓ Count the minutes between A and B, should return a number
      ✓ Count the minutes between 21:00 and 22:00, should return a 60
    When time.elapse("21:00", 45) called 
      ✓ When specify the time, plus the number of minutes specified, should return a string
      ✓ When Specify the 21:00, plus the 45 minutes specified, should return 21:45
    When time.longToShortTimeClock("21:00") called 
      ✓ Should return a string
      ✓ Should return 09:00PM
    When time.isExcess called with different values.
      ✓ It Should return a boolean value always.
      ✓ When the first argument was earlier than the second argument, should return false
      ✓ When the first argument was later than the second argument, should return true
      ✓ When the first argument is the same as the second argument, should return false
      ✓ 22:00 was later than 21:01, should return true

  Testing for track.js
     when track.generator() called.
      ✓ Should return a object

  Testing for util.js
    When util.array.merge() called
      ✓ with [[1], [2]] Should return a array
      ✓ with [[1,9,9,2], [10,21]] Should return [1,9,2,10,21]
    When util.array.getRealLength() called with [1,2,,5,,,6] 
      ✓ Should return a number
      ✓ Should return result as 4
    When util.array.clear() called with [1,2,,5,,,6] 
      ✓ Should return a array
      ✓ Should return clean array of [1,2,5,6]
    When util.talk.strToJson(talks) called
      ✓ Should return a array
      ✓ Then element of results should be a object
      ✓ Then element of results should non-empty
    When util.apth.getRightPath() called
      ✓ with paths input Should return a array
      ✓ with ['/'] input Should return a ['/']


  26 passing (14ms)

➜  conference-track-management

```

This problem is basically depend on 0-1 Knapsack Problem | DP-10 so taken help for some resorce on internet to understand the alogrithm.  
