var calendar = require('../jsCalendar-master/source/jsCalendar.js').jsCalendar
var calendarEng = require('../jsCalendar-master/source/jsCalendar.lang.template.js')

const makeCalendar = () => {
  var element = document.getElementById("my-calendar");
  calendar.new(element);
}

module.exports = {
  makeCalendar: makeCalendar
}
