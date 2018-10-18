const getRecipes = (ingredients) => {
  var parameters = '&allowedIngredient[]=' + ingredients.join('&allowedIngredient[]=')
  fetch(`https://api.yummly.com/v1/api/recipes?${parameters}`, {
    headers: {
      'X-Yummly-App-ID': '26ca64db',
      'X-Yummly-App-Key': 'e75c2d8902701bdc9f4d6988fcb38233'
    }
  })
  .then(response => response.json())
  .then(recipes => populateTable(recipes))
  .catch(error => console.error({error}))
};

const populateTable = (recipes) => {
  recipes.matches.forEach (recipe => {
    var ingredientsString = recipe.ingredients.join(", ")
    $(`#recipe-table`).append(
      `<tr>
        <td id="recipe-name">${recipe.recipeName}</td>
        <td id="recipe-picture"><img src="${recipe.smallImageUrls[0]}"></td>
        <td id="recipe-ingredients">${ingredientsString}</td>
      </tr>`
    )
  })
};

module.exports ={
  getRecipes: getRecipes
}
