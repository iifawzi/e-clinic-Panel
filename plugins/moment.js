var moment = require('moment');
export default ({ app }, inject) => {
    inject('moment', (date,style) => moment(date,style));
  }