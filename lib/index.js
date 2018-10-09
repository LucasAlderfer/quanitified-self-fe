const getDiaryFoods = () => {
  fetch("https://fast-meadow-36413.herokuapp.com/api/v1/meals")
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
  meal.foods.forEach(food => {
    $(`.${meal.name}-table`).append(
      `<tr>
        <td class="food-name">${food.name}</td>
        <td class="food-calories">${food.calories} Cal</td>
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
      <td class="total-meal-calories">${totalCaloriesConsumed} Cal</td>
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
      <td class="goal-meal-calories">${findCalorieGoal(mealName)} Cal</td>
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
      <td class="remaining-meal-calories">${findRemainingCalories(mealName, mealFoods)} Cal</td>
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

getDiaryFoods();
