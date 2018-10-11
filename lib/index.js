$(document).ready(function() {
  if($(".meal-table").length) {
    var diaryRequests = require('./diary');
    diaryRequests.getDiaryFoods();
    diaryRequests.getFoodsForDropDown();
  } else if($(".food-form").length) {
    var foodsRequests = require('./foods')
    foodsRequests.getFoods();
  } else if($("#my-calendar").length) {
    var calendar = require('./calendar')
    calendar.makeCalendar();
  }
});
