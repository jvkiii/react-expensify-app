const moment = require.requireActual('moment'); //import moment lib 

export default (timestamp = 0) => {
   return moment(timestamp);
}