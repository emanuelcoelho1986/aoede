describe('Aeode - Comments', () => {
  const formMockData = {
    author: 'John Snow',
    comment: 'You know nothing John Snow'
  };

  function fillForm() {
    cy.get('input[type="text"]').type(formMockData.author);
    cy.get('textarea').type(formMockData.comment);
  }

  function checkFilledForm() {
    cy.get('input[type="text"]').should('have.value', formMockData.author);
    cy.get('textarea').should('have.value', formMockData.comment);
  }

  beforeEach(() => {
    cy.visit('http://localhost:4200');
    // We have a controlled database, we can assume names to be checked
    cy.get('.card:first').click();
  })

  it('should navigate to the first post', () => {
    cy.title().should('eq', 'Aeode - Post - Blog post #1');
  });

  it('should fill form', () => {
    fillForm();
    checkFilledForm();
  });

  it('should clear form after fill', () => {
    fillForm();
    checkFilledForm();

    cy.get('button[data-test-cancel-button]').click();

    cy.get('input[type="text"]').should('have.value', '');
    cy.get('textarea').should('have.value', '');
  });

  it('should submit comment', () => {
    fillForm();
    checkFilledForm();

    cy.get('button[type="submit"]').click();

    // Animation a load time
    cy.wait(500);

    // Check if we have the desired comment
    cy.get('[data-test-author]').contains(formMockData.author).scrollIntoView().should('exist');
    cy.get('[data-test-comment]').contains(formMockData.comment).scrollIntoView().should('exist');
  });
})
