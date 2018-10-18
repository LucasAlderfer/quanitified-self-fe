# QUANTIFIEDself Front-end
QUANTIFIEDself is a web application that tracks food with calories, and four different meals with foods.  A typical day is calculated to include 2000 calories, and each food eaten in a meal will subtract its corresponding calories from this total count.  You can also select different foods and view recipes that utilize these ingredients, powered by the Yummly API.

## Production Link
https://jplynch35.github.io/quantified-self-fe/

## Usage
#### Foods
The foods page allows you to create new foods along with their calorie count to the collection of foods, these foods can then be added to meals on the meals page.  Foods can be added be filling in the food name field with the name of the food and the calories field with the number of calories and then clicking on the 'Add Food' button.  
You can search through the listed foods by typing in the name of a food in the 'Filter by name' field, you do not need to submit the search, the list of foods will react as you type in the name of the food that you are looking for.  
You can change the information of any food listed by just clicking into the field, either the name or calories of the listed food, and then the 'Save' button will activate when a change has been made and once clicked the database will save the changes.  
Foods can be removed from the list by clicking on the Delete button on the corresponding row.  
Recipes for specific foods, or recipes that contiain multiple foods can be found by checking the box for a food or multiple foods and then clicking on the 'Look for Recipes' button at the bottom of the list.  This button will redirect to a new page with a list of recipes being served from the Yummly API.
<img width="1440" alt="screen shot 2018-10-17 at 9 58 10 pm" src="https://user-images.githubusercontent.com/36676968/47130664-d60d8c80-d257-11e8-902b-99be312e4954.png">

#### Meals
The meals page allows you to assign foods to meals (Breakfast, Lunch, Dinner, and Snacks). Each food added will total the meal calories and be added to the total calorie count, shown at the bottom.
<img width="1440" alt="screen shot 2018-10-17 at 6 54 58 pm" src="https://user-images.githubusercontent.com/32905782/47125569-891ebb80-d241-11e8-8470-9d439ad796a7.png">

In order to add a food to a meal, click on the dropdown menu titled 'Add a Food'.  This will show you all the foods you have available form the foods page.  Select your chosen food and then click on one of the meal names displayed above each table.  This will add the food to the selected meal and update the table.
<img width="1437" alt="screen shot 2018-10-17 at 6 55 12 pm" src="https://user-images.githubusercontent.com/32905782/47125720-4c06f900-d242-11e8-8790-4633f6bf0904.png">

You can also remove any of the foods from a meal by clicking on the trash icon next associated with the chosen food.

#### Recipes
The recipes page will show you recipe names and pictures that include the ingredients chosen on the foods page.  You simply check the boxes next to the foods you want to include in the ingredients list, and then click the recipes button.  You will be directed to the recipes page with the associated table.
<img width="1426" alt="screen shot 2018-10-17 at 8 58 45 pm" src="https://user-images.githubusercontent.com/36676968/47130196-bd9c7280-d255-11e8-9e54-bbc8f23e7a8b.png">
## Initial Setup

1. Clone the repository down locally

  ```
  git clone https://github.com/JPLynch35/quantified-self-fe.git
  ```
2. CD into the `quantified-self-fe` directory

3. Install the dependencies

  ```
  npm install
  ```

## Running the Server Locally

To see the code in action locally, you need to fire up a development server. Use the command:

```
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:8080/` to run your application.

The local version and the production version will be using the following site for the back end `http://https://blooming-sea-65150.herokuapp.com`

## Built With

* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://chaijs.com/)
* [Yummly API](https://developer.yummly.com/)
