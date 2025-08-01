describe("Chat Item Component", () => {
  beforeEach(() => {
    cy.visit("/");

    // Intercept and mock chat data
    cy.intercept("GET", "**/chats", {
      statusCode: 200,
      body: [
        {
          id: "1",
          participants: [
            {
              id: "user1",
              username: "testuser",
              displayName: "Test User",
              email: "test@example.com",
              avatar: "",
              createdAt: new Date().toISOString(),
            },
          ],
          lastMessage: {
            content: "Hello, this is a test message",
            createdAt: new Date().toISOString(),
          },
          unread: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }).as("getChats");

    // Intercept authentication check
    cy.intercept("POST", "**/auth/me", {
      statusCode: 200,
      body: {
        user: {
          id: "currentUser",
          username: "currentuser",
          displayName: "Current User",
          email: "current@example.com",
          avatar: "",
          createdAt: new Date().toISOString(),
        },
      },
    }).as("authCheck");

    cy.wait(["@getChats", "@authCheck"]);
  });

  it("should display chat items correctly", () => {
    cy.get('[data-testid="chat-list-item"]').should("exist");
    cy.get('[data-testid="chat-list-item"]').should("contain", "testuser");
    cy.get('[data-testid="message-text"]').should("contain", "Hello, this is a test message");
  });

  it("should display unread badge when there are unread messages", () => {
    cy.get('[data-testid="chat-list-item"]').within(() => {
      cy.contains("2").should("exist");
    });
  });

  it("should navigate to chat when clicked", () => {
    cy.get('[data-testid="chat-list-item"]').click();
    cy.url().should("include", "/1");
  });

  it("should have selected class when the chat is currently active", () => {
    cy.get('[data-testid="chat-list-item"]').click();
    cy.get('[data-testid="chat-list-item"]').should("have.class", "selected");
  });

  it("should format time correctly", () => {
    cy.get('[data-testid="message-time"]').should("exist");
  });
});
