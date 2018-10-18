$(document).ready(function() {
  if($(".meal-table").length) {
    var diaryRequests = require('./diary');
    diaryRequests.getDiaryFoods();
    diaryRequests.getFoodsForDropDown();
  } else if($(".food-form").length) {
    var foodsRequests = require('./foods')
    foodsRequests.getFoods();
  } else if($("#recipe-table").length) {
    var foods = arguments[0].ajaxSettings.url.substring(37).split('+')
    var recipe = require('./recipes')
    recipe.getRecipes(foods);
  }
});
