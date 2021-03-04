# workouts-app
Web application to select workouts

### Supported features:

#### Given I open workouts main page
- Then I see "Awesome workouts" in the title
- And I can see a "global header" with "an image logo"
- And I can see a "top bar" with two filters: StartDate and Category
- And I can see a "list of workouts" with "workout item"
- And I see maximum "20" of "workout item" per page
- When I use the pagination component
- Then I can see other workouts
- When I click on one "workout item"
- Then I'll be redirected to the "Workout Detail" Page
- When I can see a "Workout Detail Page"
- Then I can see the fields: name, description, startDate and category
- Then I can come back to the Workout List Page from the Workout Detail Page

### Scenario: Fliltering result

#### Given I open workaouts main page
- Then The startDate filter will show all months from today till the next 12 months
- And It should show only workouts where startDate month matches
- And The category filter should be multiple-choice
- When c1 and c7 are selected the list
- Then should be filtered and show workouts that have category either c1 or c7
- And at the end of a list, there should be a pagination bar
- And should indicate the total amount of workouts
- And page number
- And and pages in between
- And It should hidewhen results are less than page size 20

## installing the app

make sure you have the correct node environment setup for running te app.

### DB
create a database use the file `db/workouts_app.sql`
then change the config for development  environment on `config/development.js`

```
  dataBase: {
    host: [YOUR_HOST],
    user:  [YOUR_USER],
    password: [YOUR_PASS],
    name: 'workouts_app',
  },
```
### App

`node: v15.0.0` 

if you use nvm 
`$ nvm use`


To install the app
`$ npm install`

## Running the app



### production

To start the app on production mode (not to be used locally)
`$ npm run build`
`$ npm run start`
the app will run on port `8080`

### development
`$ npm run build`
`$ npm run start:dev`

### development watch
run each task on separated bash terminal
`$ npm run build:client:watch`
`$ npm run build:server:watch`
`$ npm run start:dev`

## Testing
### acceptance
To run te acceptance on console

`$ npm run test:acceptance`

to run test manually

`$ npm run test:acceptance:watch`

## What is missing?
- Error handling for requests
- loading interactions
- unit test coverage
- docker image script creator
- error pages
- aria accessibility
- DB table for categories description
- remove hardcoded string from the client, add internationalization
- improve and clean step_definitions for acceptance test

