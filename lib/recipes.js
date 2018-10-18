getRecipes = (ingredients) => {
  parameters = '&allowedIngredient[]=' + ingredients.join('&allowedIngredient[]=')
  fetch(`http://api.yummly.com/v1/api/recipes?${parameters}`, {
    headers: {
      'X-Yummly-App-ID': '26ca64db',
      'X-Yummly-App-Key': 'e75c2d8902701bdc9f4d6988fcb38233'
    }
  })
  .then(response => response.json())
  .then(recipes => populateTable(recipes))
  .catch(error => console.error({error}))
};

populateTable = (recipes) => {
  recipes.forEach (recipe => {
    $(`#recipe-table`).append(
      `<tr>
        <td id="recipe-name">recipe.recipeName</td>
        <td id="recipe-picture">recipe.smallImageUrls[0]</td>
      </tr>`
    )
  })
};
