$(document).ready(function() {
  if($(".food-form").length) {
    var foodsRequests = require('./foods')
    foodsRequests.getFoods();
  }
})

$(document).ready(function() {
  if($("#my-calendar").length) {
    var calendar = require('./calendar')
    calendar.makeCalendar();
  }
})
