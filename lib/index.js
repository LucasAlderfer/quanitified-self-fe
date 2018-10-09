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
  return meals
};

const getMealFoods = (meal) => {
  meal.foods.forEach(food => {
    $(`.${meal.name}-table`).append(
      `<tr>
        <td id="food-name">${food.name}</td>
        <td id="food-calories">${food.calories} Cal</td>
      </tr>`
    )
  });
  addCaloriesConsumed(meal.name, meal.foods);
  addGoalCalories(meal.name)
  addRemainingCalories(meal.name, meal.foods)
};

const addCaloriesConsumed = (mealName, mealFoods) => {
  const totalCaloriesConsumed = calculateCaloriesConsumed(mealName, mealFoods);
  $(`.${mealName}-table`).append(
    `<tr>
      <td id="food-name", class="font-weight-bold">Consumed</td>
      <td id="food-calories">${totalCaloriesConsumed} Cal</td>
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
      <td id="food-name", class="font-weight-bold">Goal</td>
      <td id="food-calories">${findCalorieGoal(mealName)} Cal</td>
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
      <td id="food-name", class="font-weight-bold">Remaining</td>
      <td id="food-calories">${findRemainingCalories(mealName, mealFoods)} Cal</td>
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

getDiaryFoods();
