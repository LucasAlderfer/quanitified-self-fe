/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	$(document).ready(function () {
	  if ($(".meal-table").length) {
	    var diaryRequests = __webpack_require__(1);
	    diaryRequests.getDiaryFoods();
	    diaryRequests.getFoodsForDropDown();
	  } else if ($(".food-form").length) {
	    var foodsRequests = __webpack_require__(2);
	    foodsRequests.getFoods();
	  } else if ($("#recipe-table").length) {
	    var foods = arguments[0].ajaxSettings.url.substring(62).split('+');
	    debugger;
	    var recipe = __webpack_require__(3);
	    recipe.getRecipes(foods);
	  }
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	var getDiaryFoods = function getDiaryFoods() {
	  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/meals").then(function (response) {
	    return response.json();
	  }).then(function (meals) {
	    return getMeals(meals);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var getMeals = function getMeals(meals) {
	  meals.forEach(function (meal) {
	    getMealFoods(meal);
	  });
	  displayTotals();
	  return meals;
	};

	var getMealFoods = function getMealFoods(meal) {
	  $("." + meal.name + "-table").html('');
	  meal.foods.forEach(function (food) {
	    $("." + meal.name + "-table").append("<tr>\n        <td class=\"food-name\">" + food.name + "</td>\n        <td class=\"food-calories\">" + food.calories + " Cal</td>\n        <td class=\"trash-square\" id=\"" + meal.id + " " + food.id + "\">\n          <i class=\"btn btn-sm trash-btn far fa-trash-alt\" id=\"" + meal.id + " " + food.id + "\" aria-label=\"Delete\" aria-hidden=\"true\"></i>\n        </td>\n      </tr>");
	  });
	  addCaloriesConsumed(meal.name, meal.foods);
	  addGoalCalories(meal.name);
	  addRemainingCalories(meal.name, meal.foods);
	};

	var addCaloriesConsumed = function addCaloriesConsumed(mealName, mealFoods) {
	  var totalCaloriesConsumed = calculateCaloriesConsumed(mealName, mealFoods);
	  $("." + mealName + "-table").append("<tr>\n      <td class=\"font-weight-bold\">Consumed</td>\n      <td class=\"total-meal-calories font-weight-bold\">" + totalCaloriesConsumed + " Cal</td>\n      <td> </td>\n    </tr>");
	};

	var calculateCaloriesConsumed = function calculateCaloriesConsumed(mealName, mealFoods) {
	  var foodCalorieList = Array.from(mealFoods, function (food) {
	    return food.calories;
	  });
	  return foodCalorieList.reduce(function (acc, calories) {
	    return acc + calories;
	  }, 0);
	};

	var addGoalCalories = function addGoalCalories(mealName) {
	  $("." + mealName + "-table").append("<tr>\n      <td class=\"font-weight-bold\">Goal</td>\n      <td class=\"goal-meal-calories font-weight-bold\">" + findCalorieGoal(mealName) + " Cal</td>\n      <td> </td>\n    </tr>");
	};

	var findCalorieGoal = function findCalorieGoal(mealName) {
	  if (mealName === "Breakfast") {
	    return 400;
	  } else if (mealName === "Lunch") {
	    return 600;
	  } else if (mealName === "Dinner") {
	    return 800;
	  } else if (mealName === "Snack") {
	    return 200;
	  }
	};

	var addRemainingCalories = function addRemainingCalories(mealName, mealFoods) {
	  $("." + mealName + "-table").append("<tr>\n      <td class=\"font-weight-bold\">Remaining</td>\n      <td class=\"remaining-meal-calories font-weight-bold\">" + findRemainingCalories(mealName, mealFoods) + " Cal</td>\n      <td> </td>\n    </tr>");
	};

	var findRemainingCalories = function findRemainingCalories(mealName, mealFoods) {
	  if (mealName === "Breakfast") {
	    return 400 - calculateCaloriesConsumed(mealName, mealFoods);
	  } else if (mealName === "Lunch") {
	    return 600 - calculateCaloriesConsumed(mealName, mealFoods);
	  } else if (mealName === "Dinner") {
	    return 800 - calculateCaloriesConsumed(mealName, mealFoods);
	  } else if (mealName === "Snack") {
	    return 200 - calculateCaloriesConsumed(mealName, mealFoods);
	  }
	};

	var displayTotals = function displayTotals() {
	  var totalConsumed = findTotalCaloriesConsumed();
	  var totalGoal = findTotalGoalCalories();
	  var totalRemaining = totalGoal - totalConsumed;
	  $("#total-calories-consumed").html(totalConsumed + " Cal");
	  $("#total-goal-calories").html(totalGoal + " Cal");
	  $("#total-calories-remaining").html(totalRemaining + " Cal");
	};

	var findTotalCaloriesConsumed = function findTotalCaloriesConsumed() {
	  var totalCalories = 0;
	  $(".total-meal-calories").each(function () {
	    totalCalories += parseInt($(this).text().slice(0, -4));
	  });
	  return totalCalories;
	};

	var findTotalGoalCalories = function findTotalGoalCalories() {
	  var totalCalories = 0;
	  $(".goal-meal-calories").each(function () {
	    totalCalories += parseInt($(this).text().slice(0, -4));
	  });
	  return totalCalories;
	};

	var getFoodsForDropDown = function getFoodsForDropDown() {
	  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/foods").then(function (response) {
	    return response.json();
	  }).then(function (foods) {
	    return populateDropDown(foods);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var populateDropDown = function populateDropDown(foods) {
	  foods.forEach(function (food) {
	    $(".dropdown-menu").append("<a id=\"" + food.id + "\" class=\"dropdown-item\">" + food.name + "</a>");
	  });
	};

	var addBreakfastFood = function addBreakfastFood(food) {
	  var foodId = parseInt($("#selected-food-id").text());
	  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/meals/2/foods/" + foodId, {
	    method: "POST",
	    headers: { "Content-Type": "application/json; charset=utf-8" }
	  }).then(function (response) {
	    return response.json();
	  }).then(function (status) {
	    return checkMealFoodPostStatus(status);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var addLunchFood = function addLunchFood(food) {
	  var foodId = parseInt($("#selected-food-id").text());
	  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/meals/3/foods/" + foodId, {
	    method: "POST",
	    headers: { "Content-Type": "application/json; charset=utf-8" }
	  }).then(function (response) {
	    return response.json();
	  }).then(function (status) {
	    return checkMealFoodPostStatus(status);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var addDinnerFood = function addDinnerFood(food) {
	  var foodId = parseInt($("#selected-food-id").text());
	  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/meals/1/foods/" + foodId, {
	    method: "POST",
	    headers: { "Content-Type": "application/json; charset=utf-8" }
	  }).then(function (response) {
	    return response.json();
	  }).then(function (status) {
	    return checkMealFoodPostStatus(status);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var addSnackFood = function addSnackFood(food) {
	  var foodId = parseInt($("#selected-food-id").text());
	  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/meals/4/foods/" + foodId, {
	    method: "POST",
	    headers: { "Content-Type": "application/json; charset=utf-8" }
	  }).then(function (response) {
	    return response.json();
	  }).then(function (status) {
	    return checkMealFoodPostStatus(status);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var checkMealFoodPostStatus = function checkMealFoodPostStatus(status) {
	  getDiaryFoods();
	  resetDropDown();
	  hideInstructions();
	};

	var resetDropDown = function resetDropDown() {
	  $("#dropdownMenuButton").html("Add a Food");
	};

	var showInstructions = function showInstructions() {
	  $("#instructions").html("Click on a meal to add your selected food.");
	};

	var hideInstructions = function hideInstructions() {
	  $("#instructions").html("&nbsp;");
	};

	$(".dropdown-menu, .dropdown-item").click(function (event) {
	  var selected = $(event.target).text();
	  $(".dropdown-toggle").html(selected);
	  $("#selected-food-id").html(event.target.id);
	  showInstructions();
	});

	$("#breakfast-btn").click(function (event) {
	  var selectedFood = $(".dropdown-toggle").text();
	  if (selectedFood != "Add a Food") {
	    addBreakfastFood(selectedFood);
	  }
	});

	$("#lunch-btn").click(function (event) {
	  var selectedFood = $(".dropdown-toggle").text();
	  if (selectedFood != "Add a Food") {
	    addLunchFood(selectedFood);
	  }
	});

	$("#dinner-btn").click(function (event) {
	  var selectedFood = $(".dropdown-toggle").text();
	  if (selectedFood != "Add a Food") {
	    addDinnerFood(selectedFood);
	  }
	});

	$("#snack-btn").click(function (event) {
	  var selectedFood = $(".dropdown-toggle").text();
	  if (selectedFood != "Add a Food") {
	    addSnackFood(selectedFood);
	  }
	});

	$(".meal-table, .trash-btn").click(function (event) {
	  var ids = event.target.id.split(' ');
	  var mealId = ids[0];
	  var foodId = ids[1];
	  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/meals/" + mealId + "/foods/" + foodId, {
	    method: "DELETE"
	  }).then(function (response) {
	    return response.json();
	  }).then(function (status) {
	    return checkMealFoodPostStatus(status);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	});

	module.exports = {
	  getDiaryFoods: getDiaryFoods,
	  getFoodsForDropDown: getFoodsForDropDown
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var getFoods = function getFoods() {
	  fetch('https://blooming-sea-65150.herokuapp.com/api/v1/foods').then(function (response) {
	    return response.json();
	  }).then(function (foods) {
	    return renderFood(foods);
	  });
	};

	var renderFood = function renderFood(foods) {
	  foods.forEach(function (food) {
	    $('#food-table-info').prepend('<tr class="food-item-row food-item-' + food.id + '" data="food-' + food.id + '">\n        <td class="food-recipe-check"><input type="checkbox" name=' + food.name + '/></td>\n        <td class="food-item-name" contenteditable=\'true\'>' + food.name + '</td>\n        <td class="food-item-calories" contenteditable=\'true\'>' + food.calories + '</td>\n        <td>\n          <div class="button-container">\n            <button id="food-item-' + food.id + '" class="food-item-delete-btn" aria-label="Delete"><i class="btn btn-sm trash-btn far fa-trash-alt" aria-label="Delete" aria-hidden="true"></i></button>\n          </div>\n        </td>\n        <td>\n          <div class="button-container">\n            <button id="food-item-save-' + food.id + '" class="food-item-save-btn" disabled="true">Save</button>\n          </div>\n        </td>\n      </tr>');
	  });
	  hideSearch();
	  filterFood();
	};

	$('.food-table').on('click', '.food-item-delete-btn', function () {
	  var food = $(event.target.parentNode);
	  var foodId = parseInt(food[0].id.substring(10));
	  fetch('https://blooming-sea-65150.herokuapp.com/api/v1/foods/' + foodId, { method: 'DELETE' });

	  event.target.parentNode.parentNode.parentNode.parentNode.remove();
	});

	$('.food-table').on('click', '.food-item-name, .food-item-calories', function () {
	  var currentValue = event.target.innerText;
	  $('.food-table').on('keyup', '.food-item-name, .food-item-calories', function () {
	    var foodId = parseInt(event.target.parentNode.className.substring(24));
	    var newValue = event.target.innerText;
	    if (newValue != currentValue) {
	      $('#food-item-save-' + foodId)[0].disabled = false;
	    } else {
	      $('#food-item-save-' + foodId)[0].disabled = true;
	    }
	  });
	});

	$('#submit-foods-button').on('click', function () {
	  var checkedArray = [];
	  var checkGroup = $('.food-table').find('input[type="checkbox"]');
	  checkGroup.each(function (element) {
	    if (this.checked) {
	      checkedArray.push(this.name.slice(0, -1));
	    }
	  });
	  var checkedString = checkedArray.join('+');
	  if (checkedArray.length != 0) {
	    window.location = '/quantified-self-fe/recipes.html?q=' + checkedString;
	  }
	});

	$('.food-table').on('click', '.food-item-save-btn', function () {
	  event.preventDefault();
	  var saveButton = event.target;
	  var newName = event.target.parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.innerText;
	  var newCalories = parseInt(event.target.parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText);
	  var foodId = parseInt(event.target.id.substring(15));
	  fetch('https://blooming-sea-65150.herokuapp.com/api/v1/foods/' + foodId, {
	    method: 'PATCH',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ 'food': { 'name': newName, 'calories': newCalories } })
	  }).then(function () {
	    saveButton.disabled = true;
	  });
	});

	$('.btn').on('click', function () {
	  event.preventDefault();
	  var foodName = $('#foodName').val();
	  var foodCal = $('#foodCalories').val();
	  fetch('https://blooming-sea-65150.herokuapp.com/api/v1/foods', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ 'food': { "name": '' + foodName, "calories": '' + foodCal } })
	  }).then(function (response) {
	    return response.json();
	  }).then(function (food) {
	    return renderFood([food]);
	  });
	});

	var renderSearch = function renderSearch(foods) {
	  $('#search-results').empty();
	  showSearch();
	  foods.forEach(function (food) {
	    $('#search-results').prepend('<tr class="food-item-row food-item-' + food.id + '" data="food-' + food.id + '">\n        <td class="food-recipe-check"><input type="checkbox" name=' + food.name + '/></td>\n        <td class="food-item-name" contenteditable=\'true\'>' + food.name + '</td>\n        <td class="food-item-calories" contenteditable=\'true\'>' + food.calories + '</td>\n        <td>\n          <div class="button-container">\n            <button id="food-item-' + food.id + '" class="food-item-delete-btn" aria-label="Delete"><i class="btn btn-sm trash-btn far fa-trash-alt" aria-label="Delete" aria-hidden="true"></i></button>\n          </div>\n        </td>\n        <td>\n          <div class="button-container">\n            <button id="food-item-' + food.id + '" class="food-item-save-btn" disabled="true">Save</button>\n          </div>\n        </td>\n      </tr>');
	  });
	};

	var foodMaker = function foodMaker(tr) {
	  var collection = $(tr).find('td');
	  var foodName = collection[1].innerText;
	  var foodCalories = collection[2].innerText;
	  return { name: foodName, calories: foodCalories };
	};

	var hideFoods = function hideFoods() {
	  var foods = document.getElementById("food-table-info");
	  foods.style.visibility = "collapse";
	};

	var hideSearch = function hideSearch() {
	  var search = document.getElementById("search-results");
	  search.style.visibility = "collapse";
	};

	var showSearch = function showSearch() {
	  var search = document.getElementById("search-results");
	  search.style.visibility = "visible";
	};

	var showFoods = function showFoods() {
	  var foods = document.getElementById("food-table-info");
	  foods.style.visibility = "visible";
	};

	var filterFood = function filterFood() {
	  var foods = $('#food-table-info').find('tr');
	  var articles = [];
	  var i;
	  for (i = 0; i < foods.length; i++) {
	    articles.push(foodMaker(foods[i]));
	  }
	  var allFoods = articles;
	  $('#food-filter-input').on('keyup', function () {
	    var foundFood = [];
	    var search = $('#food-filter-input').val().toLowerCase();
	    var n;
	    for (n = 0; n < allFoods.length; n++) {
	      if (allFoods[n].name.toLowerCase().includes(search)) {
	        foundFood.push(allFoods[n]);
	      }
	    }
	    if (search === "") {
	      showFoods();
	      hideSearch();
	    } else if (foundFood.length != 0) {
	      hideFoods();
	      renderSearch(foundFood);
	    } else {
	      hideFoods();
	      hideSearch();
	    }
	  });
	};

	module.exports = {
	  getFoods: getFoods
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	var getRecipes = function getRecipes(ingredients) {
	  var parameters = '&allowedIngredient[]=' + ingredients.join('&allowedIngredient[]=');
	  fetch('http://api.yummly.com/v1/api/recipes?' + parameters, {
	    headers: {
	      'X-Yummly-App-ID': '26ca64db',
	      'X-Yummly-App-Key': 'e75c2d8902701bdc9f4d6988fcb38233'
	    }
	  }).then(function (response) {
	    return response.json();
	  }).then(function (recipes) {
	    return populateTable(recipes);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var populateTable = function populateTable(recipes) {
	  recipes.matches.forEach(function (recipe) {
	    var ingredientsString = recipe.ingredients.join(", ");
	    $('#recipe-table').append('<tr>\n        <td id="recipe-name">' + recipe.recipeName + '</td>\n        <td id="recipe-picture"><img src="' + recipe.smallImageUrls[0] + '"></td>\n        <td id="recipe-ingredients">' + ingredientsString + '</td>\n      </tr>');
	  });
	};

	module.exports = {
	  getRecipes: getRecipes
	};

/***/ })
/******/ ]);