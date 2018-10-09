const getFoods = () => {
  fetch(`https://fast-meadow-36413.herokuapp.com/api/v1/foods`)
  .then(response => response.json())
  .then(foods => renderFood(foods))
}

const renderFood = (foods) => {
  foods.forEach(food => {
    $('#food-table-info').prepend(
      `<article class="food-item-row food-item-${food.id}" data="food-${food.id}">
         <p class="food-item-name">${food.name}</p>
         <p class="food-item-calories">${food.calories}</p>
         <div class="button-container">
           <button id="food-item-${food.id}" class="food-item-delete-btn" aria-label="Delete">-</button>
         </div>
       </article>`
    )
  })
  hideSearch();
  filterFood();
}

const renderSearch = (foods) => {
  $('#search-results').empty();
  showSearch();
  foods.forEach(food => {
    $('#search-results').prepend(
      `<article class="food-item-row">
        <p class="food-item-name">${food.name}</p>
        <p class="food-item-calories">${food.calories}</p>
        </article>`
    )
  })
}

const foodMaker = (article) => {
  let collection = $(article).find('p')
  let foodName = collection[0].innerText
  let foodCalories = collection[1].innerText
  return { name: foodName, calories: foodCalories }
}

const hideFoods = () => {
  let foods = document.getElementById("food-table-info");
  foods.style.display = "none";
}

const hideSearch = () => {
  let search = document.getElementById("search-results");
  search.style.display = "none";
}

const showSearch = () => {
  let search = document.getElementById("search-results");
  search.style.display = "block";
}

const showFoods = () => {
  let foods = document.getElementById("food-table-info");
  foods.style.display = "block";
}

const filterFood = () => {
  var foods = $('#food-table-info').find('article')
  var articles = []
  var i
  for(i = 0; i < foods.length; i++) {
    articles.push(foodMaker(foods[i]));
  }
  var allFoods = articles
  $('#food-filter-input').on('keyup', function() {
    var foundFood = []
    let search = $('#food-filter-input').val().toLowerCase()
    var n
    for(n = 0; n < allFoods.length; n++) {
      if (allFoods[n].name.toLowerCase().includes(search)) {
        foundFood.push(allFoods[n])
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
}

module.exports = {
  getFoods: getFoods,
  filterFood: filterFood
}
