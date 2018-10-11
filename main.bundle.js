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

	'use strict';

	var diaryRequests = __webpack_require__(1);
	diaryRequests.getDiaryFoods();
	diaryRequests.getFoodsForDropDown();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	var getDiaryFoods = function getDiaryFoods() {
	  fetch("https://fast-meadow-36413.herokuapp.com/api/v1/meals").then(function (response) {
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
	  meal.foods.forEach(function (food) {
	    $("." + meal.name + "-table").append("<tr>\n        <td class=\"food-name\">" + food.name + "</td>\n        <td class=\"food-calories\">" + food.calories + " Cal</td>\n      </tr>");
	  });
	  addCaloriesConsumed(meal.name, meal.foods);
	  addGoalCalories(meal.name);
	  addRemainingCalories(meal.name, meal.foods);
	};

	var addCaloriesConsumed = function addCaloriesConsumed(mealName, mealFoods) {
	  var totalCaloriesConsumed = calculateCaloriesConsumed(mealName, mealFoods);
	  $("." + mealName + "-table").append("<tr>\n      <td class=\"font-weight-bold\">Consumed</td>\n      <td class=\"total-meal-calories font-weight-bold\">" + totalCaloriesConsumed + " Cal</td>\n    </tr>");
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
	  $("." + mealName + "-table").append("<tr>\n      <td class=\"font-weight-bold\">Goal</td>\n      <td class=\"goal-meal-calories font-weight-bold\">" + findCalorieGoal(mealName) + " Cal</td>\n    </tr>");
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
	  $("." + mealName + "-table").append("<tr>\n      <td class=\"font-weight-bold\">Remaining</td>\n      <td class=\"remaining-meal-calories font-weight-bold\">" + findRemainingCalories(mealName, mealFoods) + " Cal</td>\n    </tr>");
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
	  fetch("https://fast-meadow-36413.herokuapp.com/api/v1/foods").then(function (response) {
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
	  fetch("https://fast-meadow-36413.herokuapp.com/api/v1/meals/1", {});
	};

	var findFoodId = function findFoodId(food) {
	  food;
	};

	$(".dropdown-menu, .dropdown-item").click(function (event) {
	  var selected = $(event.target).text();
	  $(".dropdown-toggle").html(selected);
	});

	$("#breakfast-btn\"").click(function (event) {
	  var selectedFood = $(".dropdown-toggle").text();
	  if (selectedFood != "Add a Food") {
	    addBreakfastFood(selectedFood);
	  }
	});

	module.exports = {
	  getDiaryFoods: getDiaryFoods,
	  getFoodsForDropDown: getFoodsForDropDown
	};
/***/ })
/******/ ]);