const getFoods = () => {
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/foods`)
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

$('#food-table-info, .food-item-delete-btn').on('click', function() {
  let food = $(event.target)
  let foodId = parseInt(food[0].id.substring(10))
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/foods/${foodId}`, {method: 'DELETE'})
  event.target.parentNode.parentNode.remove();
})

$('.btn').on('click', function() {
  event.preventDefault();
  let foodName = $('#foodName').val()
  let foodCal = $('#foodCalories').val()
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/foods`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'food': { "name": `${foodName}`, "calories": `${foodCal}` }})
  })
  .then(response => response.json())
  .then(food => renderFood([food]))
})

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
  getFoods: getFoods
}
