import { Given, Then } from "cypress-cucumber-preprocessor/steps";

const url = "http://localhost:8080";

// TODO change selector for data-js data-test
const selectors = {
  "global header": "body header",
  "an image logo": '[data-js="logo"]',
  "top bar": '[data-js="top-bar"]',
  "list of workouts": '[data-js="gallery"]',
  "workout item": '[data-js="gallery-item"]',
  "Workout Detail Page": '[data-js="details-page"]',
  filterStartDate: ".start-date-selector",
  filterCategory: ".category-selector",
  paginationNext: '[data-js="pagination-next"]',
  name: '[data-js="name"]',
  description: '[data-js="description"]',
  startDate: '[data-js="start-date"]',
  category: '[data-js="category"]',
  backHome: '[data-js="back-home"]',
  paginationBar: ".pagination",
  totalWorkouts: '[data-js="total-workouts"]',
  currentPage: '[data-js="current-page"]',
  nextPageNumber: '[data-js="next-page-number"]',
};

const pages = {
  "Workout Detail": "/workouts/",
};
const months = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

Given("I open workouts main page", () => {
  cy.visit(url);
});

Then(`I see {string} in the title`, (title) => {
  cy.title().should("include", title);
});

Then(
  `I can see a {string} with two filters: StartDate and Category`,
  (containerSelector) => {
    cy.get(selectors[containerSelector])
      .children(selectors.filterCategory)
      .should("be.visible");
    cy.get(selectors[containerSelector])
      .children(selectors.filterStartDate)
      .should("be.visible");
  }
);

Then(`I can see a {string} with {string}`, (container, child) => {
  cy.get(selectors[container]).children(selectors[child]).should("be.visible");
});

Then(`I can see a {string}`, (container) => {
  cy.get(selectors[container]).should("be.visible");
});

Then(`I see maximum {string} of {string} per page`, (maxQuantity, type) => {
  cy.get(selectors[type]).should("have.length", maxQuantity);
});

When(`I use the pagination component`, () => {
  cy.get(selectors["workout item"]).eq(0).should("have.attr", "data-id", 1);
  cy.get(selectors["workout item"]).eq(19).should("have.attr", "data-id", 20);
  cy.get(selectors.paginationBar).find('.item[value="2"]:eq(1)').click();
});

Then(`I can see other workouts`, () => {
  cy.get(selectors["workout item"]).eq(0).should("have.attr", "data-id", 21);
  cy.get(selectors["workout item"]).eq(19).should("have.attr", "data-id", 40);
});

When(`I click on one {string}`, (selector) => {
  cy.get(selectors[selector]).eq(10).children("a").click();
});

Then(`I'll be redirected to the {string} Page`, (page) => {
  cy.location("pathname").should("include", pages[page]);
});

Then(`I can see the fields: name, description, startDate and category`, () => {
  cy.get(selectors.name).should("be.visible");
  cy.get(selectors.description).should("be.visible");
  cy.get(selectors.startDate).should("be.visible");
  cy.get(selectors.category).should("be.visible");
});

When(
  `I can come back to the Workout List Page from the Workout Detail Page`,
  () => {
    cy.get(selectors.backHome).click();
    cy.location("pathname").should("be.equal", "/");
  }
);

Then(
  `The startDate filter will show all months from today till the next 12 months`,
  () => {
    cy.get(selectors.filterStartDate)
      .focus()
      .find(".item")
      .then((options) => {
        const optionsList = [...options];
        expect(optionsList.length).to.equal(13);
        optionsList.forEach((o) => {
          expect(months).to.contains(o.innerText);
        });
      });
  }
);

Then(`The category filter should be multiple-choice`, () => {
  cy.get(selectors.filterCategory)
    .focus()
    .find(".ui.label")
    .then((options) => {
      const optionsList = [...options];
      expect(optionsList.length).to.equal(2);
      optionsList.forEach((o) => {
        expect(["c1", "c7"]).to.contains(o.getAttribute("value"));
      });
    });
});

When(`c1 and c7 are selected in the list`, () => {
  cy.get(selectors.filterCategory)
    .find(".item")
    .then((options) => {
      const optionsList = [...options];
      optionsList.forEach((o) => {
        if (o.innerText === "c7" || o.innerText === "c1") {
          o.click();
        }
      });
    });
  cy.wait(200);
  cy.get(selectors.filterCategory)
    .find(".item")
    .then((options) => {
      const optionsList = [...options];
      optionsList.forEach((o) => {
        if (o.innerText === "c1") {
          o.click();
        }
      });
    });
  cy.wait(200);
});

Then(`It should show only workouts where startDate month matches`, () => {
  cy.get(selectors.filterStartDate)
    .find(".item")
    .then((options) => {
      const datesList = [...options];
      datesList.forEach((o) => {
        if (o.innerText === "March") {
          o.click();
        }
      });
    });
  cy.wait(200);
  cy.get(selectors["workout item"])
    .find('[data-js="start-date"]')
    .then((dates) => {
      const datesList = [...dates];
      expect(datesList.length).to.equal(20);
      datesList.forEach((o) => {
        expect(o.innerText).to.contains("2021-03-");
      });
    });
});

Then(
  `should be filtered and show workouts that have category c1 and c7`,
  () => {
    let c1Included = false;
    let c7Included = false
    cy.get(selectors["workout item"])
      .find('[data-js="start-category"]')
      .then((options) => {
        const workoutsList = [...options];
        workoutsList.forEach((o) => {
          expect(["c1", "c7"]).to.contains(o.innerText);
          if (o.innerText === "c7") {
            c7Included = true;
          }
          if (o.innerText === "c1") {
            c1Included = true;
          }
        });
        expect(c1Included).to.be.true;
        expect(c7Included).to.be.true;
      });
  }
);

Then(`at the end of a list, there should be a pagination bar`, () => {
  cy.get(selectors.filterStartDate)
    .find(".item")
    .then((options) => {
      const datesList = [...options];
      datesList.forEach((o) => {
        if (o.innerText === "September") {
          o.click();
        }
      });
    });
  cy.get(selectors.paginationBar).should("be.visible");
});

Then(`should indicate the total amount of workouts`, () => {
  cy.get(selectors.totalWorkouts).should("be.visible");
  cy.get(selectors.totalWorkouts).should("have.contain", "23");
});

Then(`page number`, () => {
  cy.get(selectors.paginationBar).find(".active.item").should("be.visible");
  cy.get(selectors.paginationBar).find(".active.item").should("have.text", "1");
});
``;

Then(`and pages in between`, () => {
  cy.get(selectors.paginationBar)
    .children('.item[type="nextItem"]')
    .should("be.visible");
  cy.get(selectors.paginationBar)
    .children('.item[type="nextItem"]')
    .should("have.attr", "value", "2");
});

Then(`It should hide when results are less than page size (20)`, () => {
  cy.get(selectors.filterCategory).focus();
  cy.wait(200);
  cy.get(selectors.filterCategory)
    .focus()
    .find('.ui.label[value="c7"] .delete')
    .click();
  cy.wait(200);
  cy.get(selectors.filterCategory)
    .find('.ui.label[value="c1"] .delete')
    .click();
  cy.wait(200);
  cy.get(selectors.filterCategory)
    .find(".item")
    .then((options) => {
      const optionsList = [...options];
      optionsList.forEach((o) => {
        if (o.innerText === "c3") {
          o.click();
        }
      });
    });
  cy.wait(200);
  cy.get(selectors.paginationBar).should("not.be.exist");
});

Then("I refresh the page", () => {
  cy.reload();
});
