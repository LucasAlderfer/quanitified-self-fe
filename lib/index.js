const getDiaryFoods = () => {
  fetch("https://fast-meadow-36413.herokuapp.com/api/v1/meals")
    .then(response => response.json())
    .then(meals => getMeals(meals))
    .catch(error => console.error({error}))
};

const getMeals = (meals) => {
  meals.forEach(meal => {
    getMealFoods(meal)
  })
};

const getMealFoods = (meal) => {
  meal.foods.forEach(food => {
    $(`.${meal.name}-table`).append(
      `<tr>
        <td id="food-name">${food.name}</td>
        <td id="food-calories">${food.calories} cal</td>
      </tr>`
    )
  })
};

getDiaryFoods();
