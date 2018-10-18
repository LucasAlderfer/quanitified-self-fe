# QUANTIFIEDself Front-end
QUANTIFIEDself is a web application that tracks food with calories, and four different meals with foods.  A typical day is calculated to include 2000 calories, and each food eaten in a meal will subtract its corresponding calories from this total count.  You can also select different foods and view reicpes that utilize these ingredients, powered by the Yummly API.

## Production Link
https://jplynch35.github.io/quantified-self-fe/

## Usage
#### Foods

#### Meals
The meals page allows the user to assign foods to meals (Breakfast, Lunch, Dinner, and Snacks). Each food added will total the meal calories and be added to the total calorie count, shown at the bottom.
<img width="1440" alt="screen shot 2018-10-17 at 6 54 58 pm" src="https://user-images.githubusercontent.com/32905782/47125569-891ebb80-d241-11e8-8470-9d439ad796a7.png">

In order to add a food to a meal, click on the dropdown menu titled 'Add a Food'.  This will show you all the foods you have available form the foods page.  Select your chosen food and then click on one of the meal names displayed above each table.  This will add the food to the selected meal and update the table.
<img width="1440" alt="screen shot 2018-10-17 at 6 55 12 pm" src="https://user-images.githubusercontent.com/32905782/47125641-d8fd8280-d241-11e8-9022-d1eb13bdb186.png">


#### Recipes

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

