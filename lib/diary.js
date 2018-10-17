const getDiaryFoods = () => {
  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/meals")
    .then(response => response.json())
    .then(meals => getMeals(meals))
    .catch(error => console.error({error}))
};

const getMeals = (meals) => {
  meals.forEach(meal => {
    getMealFoods(meal)
  });
  displayTotals();
  return meals
};

const getMealFoods = (meal) => {
  $(`.${meal.name}-table`).html('');
  meal.foods.forEach(food => {
    $(`.${meal.name}-table`).append(
      `<tr>
        <td class="food-name">${food.name}</td>
        <td class="food-calories">${food.calories} Cal</td>
        <td class="trash-square" id="${meal.id} ${food.id}">
          <i class="btn btn-sm trash-btn far fa-trash-alt" id="${meal.id} ${food.id}" aria-label="Delete" aria-hidden="true"></i>
        </td>
      </tr>`
    )
  });
  addCaloriesConsumed(meal.name, meal.foods);
  addGoalCalories(meal.name);
  addRemainingCalories(meal.name, meal.foods);
};

const addCaloriesConsumed = (mealName, mealFoods) => {
  const totalCaloriesConsumed = calculateCaloriesConsumed(mealName, mealFoods);
  $(`.${mealName}-table`).append(
    `<tr>
      <td class="font-weight-bold">Consumed</td>
      <td class="total-meal-calories font-weight-bold">${totalCaloriesConsumed} Cal</td>
      <td> </td>
    </tr>`
  )
};

const calculateCaloriesConsumed = (mealName, mealFoods) => {
  const foodCalorieList = Array.from(mealFoods, food => food.calories);
  return foodCalorieList.reduce((acc, calories) => {
    return acc + calories
  }, 0)
};

const addGoalCalories = (mealName) => {
  $(`.${mealName}-table`).append(
    `<tr>
      <td class="font-weight-bold">Goal</td>
      <td class="goal-meal-calories font-weight-bold">${findCalorieGoal(mealName)} Cal</td>
      <td> </td>
    </tr>`
  )
};

const findCalorieGoal = (mealName) => {
  if (mealName === `Breakfast`) {
    return 400
  } else if (mealName === `Lunch`) {
    return 600
  } else if (mealName === `Dinner`) {
    return 800
  } else if (mealName === `Snack`) {
    return 200
  }
};

const addRemainingCalories = (mealName, mealFoods) => {
  $(`.${mealName}-table`).append(
    `<tr>
      <td class="font-weight-bold">Remaining</td>
      <td class="remaining-meal-calories font-weight-bold">${findRemainingCalories(mealName, mealFoods)} Cal</td>
      <td> </td>
    </tr>`
  )
};

const findRemainingCalories = (mealName, mealFoods) => {
  if (mealName === `Breakfast`) {
    return (400 - calculateCaloriesConsumed(mealName, mealFoods))
  } else if (mealName === `Lunch`) {
    return (600 - calculateCaloriesConsumed(mealName, mealFoods))
  } else if (mealName === `Dinner`) {
    return (800 - calculateCaloriesConsumed(mealName, mealFoods))
  } else if (mealName === `Snack`) {
    return (200 - calculateCaloriesConsumed(mealName, mealFoods))
  }
};

const displayTotals = () => {
  const totalConsumed = findTotalCaloriesConsumed();
  const totalGoal = findTotalGoalCalories();
  const totalRemaining = totalGoal - totalConsumed;
  $("#total-calories-consumed").html(totalConsumed + ` Cal`);
  $("#total-goal-calories").html(totalGoal + ` Cal`);
  $("#total-calories-remaining").html(totalRemaining + ` Cal`);
};

const findTotalCaloriesConsumed = () => {
  let totalCalories = 0;
  $(`.total-meal-calories`).each(function() {
    totalCalories += parseInt($(this).text().slice(0,-4));
  });
  return totalCalories
};

const findTotalGoalCalories = () => {
  let totalCalories = 0;
  $(`.goal-meal-calories`).each(function() {
    totalCalories += parseInt($(this).text().slice(0,-4));
  });
  return totalCalories
};

const getFoodsForDropDown = () => {
  fetch("https://blooming-sea-65150.herokuapp.com/api/v1/foods")
    .then(response => response.json())
    .then(foods => populateDropDown(foods))
    .catch(error => console.error({error}))
};

const populateDropDown = (foods) => {
  foods.forEach(food => {
    $(`.dropdown-menu`).append(
      `<a id="${food.id}" class="dropdown-item">${food.name}</a>`
    )
  })
};

const addBreakfastFood = (food) => {
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/meals/2/foods/${$("#selected-food-id").text()}`, {
    method: "POST",
    headers: {"Content-Type": "application/json; charset=utf-8"}
  })
  .then(response => response.json())
  .then(status => checkMealFoodPostStatus(status))
  .catch(error => console.error({error}))
};

const addLunchFood = (food) => {
  let foodId = parseInt($("#selected-food-id").text());
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/meals/3/foods/${foodId}`, {
    method: "POST",
    headers: {"Content-Type": "application/json; charset=utf-8"}
  })
  .then(response => response.json())
  .then(status => checkMealFoodPostStatus(status))
  .catch(error => console.error({error}))
};

const addDinnerFood = (food) => {
  let foodId = parseInt($("#selected-food-id").text());
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/meals/1/foods/${foodId}`, {
    method: "POST",
    headers: {"Content-Type": "application/json; charset=utf-8"}
  })
  .then(response => response.json())
  .then(status => checkMealFoodPostStatus(status))
  .catch(error => console.error({error}))
};

const addSnackFood = (food) => {
  let foodId = parseInt($("#selected-food-id").text());
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/meals/4/foods/${foodId}`, {
    method: "POST",
    headers: {"Content-Type": "application/json; charset=utf-8"}
  })
  .then(response => response.json())
  .then(status => checkMealFoodPostStatus(status))
  .catch(error => console.error({error}))
};

const checkMealFoodPostStatus = (status) => {
  getDiaryFoods();
  resetDropDown();
  hideInstructions();
};

const resetDropDown = () => {
  $(`#dropdownMenuButton`).html(`Add a Food`)
};

const showInstructions = () => {
  $(`#instructions`).html(`Click on a meal to add your selected food.`)
};

const hideInstructions = () => {
  $(`#instructions`).html(`&nbsp;`)
};

$(`.dropdown-menu, .dropdown-item`).click(function(event) {
  let selected = $(event.target).text();
  $(`.dropdown-toggle`).html(selected);
  $(`#selected-food-id`).html(event.target.id);
  showInstructions();
});

$(`#breakfast-btn`).click(function(event) {
  let selectedFood = $(`.dropdown-toggle`).text();
  if (selectedFood != `Add a Food`) {
    addBreakfastFood(selectedFood)
  }
});

$(`#lunch-btn`).click(function(event) {
  let selectedFood = $(`.dropdown-toggle`).text();
  if (selectedFood != `Add a Food`) {
    addLunchFood(selectedFood)
  }
});

$(`#dinner-btn`).click(function(event) {
  let selectedFood = $(`.dropdown-toggle`).text();
  if (selectedFood != `Add a Food`) {
    addDinnerFood(selectedFood)
  }
});

$(`#snack-btn`).click(function(event) {
  let selectedFood = $(`.dropdown-toggle`).text();
  if (selectedFood != `Add a Food`) {
    addSnackFood(selectedFood)
  }
});

$(`.meal-table, .trash-btn`).click(function(event) {
  let ids = event.target.id.split(' ');
  let mealId = ids[0];
  let foodId = ids[1];
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(status => checkMealFoodPostStatus(status))
  .catch(error => console.error({error}))
});

module.exports = {
  getDiaryFoods: getDiaryFoods,
  getFoodsForDropDown: getFoodsForDropDown
};
