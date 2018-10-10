var calendar = require('../jsCalendar-master/source/jsCalendar.js')
var calendarEng = require('../jsCalendar-master/source/jsCalendar.lang.template.js')

const makeCalendar = () => {
  var element = document.getElementById("my-calendar");
  jsCalendar.new(element);
}

module.exports = {
  makeCalendar: makeCalendar
}
