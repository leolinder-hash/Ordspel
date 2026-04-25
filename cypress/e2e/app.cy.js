describe("Word game app", () => {
  it("loads the start page", () => {
    cy.visit("/");

    cy.get("h1").should("contain", "Guess the word!");
  })

  it("starts a game correctly", () => {
    cy.visit("/");
    cy.contains("Start").click();
    cy.get(".input__guess").should("exist");
  })

  it("Stars a game with selected word length", () => {
    cy.visit("/");
    cy.get(".letter__length").click().clear().type(7);
    cy.contains("Start").click();
    cy.get(".row").first().find(".cell").should("have.length", 7);
  })

  it("Starts a game with duplicate letters as false", () => {
    cy.intercept("POST", "/api/game/start").as("startGame");
    cy.visit("/");
    cy.contains("Start").click();
    cy.wait("@startGame")
      .its("request.body.allowDuplicateLetters")
      .should("equal", false);
  })

  it("Wins a full game with predictable word", () => {
    cy.visit("/");
    cy.contains("Start").click();
    cy.get("input").type("crane{enter}");
    cy.contains("won");
  })

  it("Shows confirmation after sending in highscore-form", () => {
    cy.visit("/");
    cy.contains("Start").click();
    cy.get("input").type("crane{enter}");
    cy.get("input").last().type("Peter");
    cy.contains("Submit").click();
    cy.contains("Your score was saved!");
  })

  it("navigates to the highscore page", () => {
    cy.visit("/");
    cy.contains("Highscores").click();
    cy.url().should("include", "highscores");
  })

  it("navigates to the about us page", () => {
    cy.visit("/");
    cy.contains("About us").click();
    cy.url().should("include", "about");
  })
})

