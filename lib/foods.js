const getFoods = () => {
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/foods`)
  .then(response => response.json())
  .then(foods => renderFood(foods))
}

const renderFood = (foods) => {
  foods.forEach(food => {
    $('#food-table-info').prepend(
      `<tr class="food-item-row food-item-${food.id}" data="food-${food.id}">
        <td class="food-item-name" contenteditable='true'>${food.name}</td>
        <td class="food-item-calories" contenteditable='true'>${food.calories}</td>
        <td>
          <div class="button-container">
            <button id="food-item-${food.id}" class="food-item-delete-btn" aria-label="Delete"><i class="btn btn-sm trash-btn far fa-trash-alt" aria-label="Delete" aria-hidden="true"></i></button>
          </div>
        </td>
        <td>
          <div class="button-container">
            <button id="food-item-save-${food.id}" class="food-item-save-btn" disabled="true">Save</button>
          </div>
        </td>
      </tr>`
    )
  })
  hideSearch();
  filterFood();
}

$('.food-table').on('click', '.food-item-delete-btn', function() {
  let food = $(event.target)
  let foodId = parseInt(food[0].id.substring(10))
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/foods/${foodId}`, {method: 'DELETE'})

  event.target.parentNode.parentNode.parentNode.remove();
})

$('.food-table').on('click', '.food-item-name, .food-item-calories', function() {
  let currentValue = event.target.innerText
  $('.food-table').on('keyup', '.food-item-name, .food-item-calories', function() {
    var foodId = parseInt(event.target.parentNode.className.substring(24))
    let newValue = event.target.innerText
    if(newValue != currentValue) {
      $(`#food-item-save-${foodId}`)[0].disabled = false
    } else {
      $(`#food-item-save-${foodId}`)[0].disabled = true
    }
  })
})

$('.food-table').on('click', '.food-item-save-btn', function() {
  event.preventDefault();
  let saveButton = event.target
  let newName = event.target.parentNode.parentNode.parentNode.firstElementChild.innerText
  let newCalories = parseInt(event.target.parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.innerText)
  let foodId = parseInt(event.target.id.substring(15))
  fetch(`https://blooming-sea-65150.herokuapp.com/api/v1/foods/${foodId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'food': { 'name': newName, 'calories': newCalories} })
    }
  )
  .then(() => {
    saveButton.disabled = true
  })
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
      `<tr class="food-item-row food-item-${food.id}" data="food-${food.id}">
        <td class="food-item-name" contenteditable='true'>${food.name}</td>
        <td class="food-item-calories" contenteditable='true'>${food.calories}</td>
        <td>
          <div class="button-container">
            <button id="food-item-${food.id}" class="food-item-delete-btn" aria-label="Delete"><i class="btn btn-sm trash-btn far fa-trash-alt" aria-label="Delete" aria-hidden="true"></i></button>
          </div>
        </td>
        <td>
          <div class="button-container">
            <button id="food-item-${food.id}" class="food-item-save-btn" disabled="true">Save</button>
          </div>
        </td>
      </tr>`
    )
  })
}

const foodMaker = (tr) => {
  let collection = $(tr).find('td')
  let foodName = collection[0].innerText
  let foodCalories = collection[1].innerText
  return { name: foodName, calories: foodCalories }
}

const hideFoods = () => {
  let foods = document.getElementById("food-table-info");
  foods.style.visibility = "collapse";
}

const hideSearch = () => {
  let search = document.getElementById("search-results");
  search.style.visibility = "collapse";
}

const showSearch = () => {
  let search = document.getElementById("search-results");
  search.style.visibility = "visible";
}

const showFoods = () => {
  let foods = document.getElementById("food-table-info");
  foods.style.visibility = "visible";
}

const filterFood = () => {
  var foods = $('#food-table-info').find('tr')
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
