Feature: Workouts Page

  As a user, I want to see a list of workouts and their details so that I can choose one that best fits my schedule.

  @focus
  Scenario: Workouts Page
    Given I open workaouts main page
    Then I see "Awesome workouts" in the title
    And I can see a "global header" with "an image logo"
    And I can see a "top bar" with two filters: StartDate and Category
    And I can see a "list of workouts" with "workout item"
    And I see maximum "20" of "workout item" per page
    When I use the pagination component
    Then I can see other workouts
    When I click on one "workout item"
    Then I'll be redirected to the "Workout Detail" Page
    When I can see a "Workout Detail Page"
    Then I can see the fields: name, description, startDate and category
    Then I can come back to the Workout List Page from the Workout Detail Page

  @focus
  Scenario: Fliltering result
    Given I open workaouts main page
    Then The startDate filter will show all months from today till the next 12 months
    And It should show only workouts where startDate month matches
    And The category filter should be multiple-choice
    When c1 and c7 are selected the list
    Then should be filtered and show workouts that have category either c1 or c7
    And at the end of a list, there should be a pagination bar
    And should indicate the total amount of workouts
    And page number
    And and pages in between
    And It should hidewhen results are less than page size 20
