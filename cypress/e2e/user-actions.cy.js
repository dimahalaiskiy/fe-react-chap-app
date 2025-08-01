describe("User Actions Dropdown", () => {
  beforeEach(() => {
    // Mock the authentication
    cy.intercept("POST", "**/auth/me", {
      statusCode: 200,
      body: {
        user: {
          id: "current-user",
          username: "testuser",
          displayName: "Test User",
          email: "test@example.com",
          avatar: "",
          createdAt: new Date().toISOString(),
        },
      },
    }).as("authCheck");

    // Mock the users search endpoint
    cy.intercept("GET", "**/users*", {
      statusCode: 200,
      body: {
        rows: [
          {
            id: "user1",
            username: "johndoe",
            displayName: "John Doe",
            email: "john@example.com",
            avatar: "",
            createdAt: new Date().toISOString(),
          },
          {
            id: "user2",
            username: "janedoe",
            displayName: "Jane Doe",
            email: "jane@example.com",
            avatar: "",
            createdAt: new Date().toISOString(),
          },
        ],
        pagination: {
          skip: 10,
          limit: 10,
          total: 2,
        },
      },
    }).as("getUsers");

    // Mock the create chat endpoint
    cy.intercept("POST", "**/chat", {
      statusCode: 200,
      body: {
        id: "new-chat-id",
        participants: [
          {
            id: "user1",
            username: "johndoe",
            displayName: "John Doe",
            email: "john@example.com",
            avatar: "",
            createdAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
      },
    }).as("createChat");

    // Visit the modal with the user search
    cy.visit("/");
    cy.wait("@authCheck");

    // Open create chat modal (this implementation may need adjusting based on how your app opens the modal)
    cy.get("button").contains("Create Chat").click();
    cy.wait("@getUsers");
  });

  it("should show context menu when clicking the action button", () => {
    // Find and click the action button (three dots)
    cy.get("button").contains("•••").first().click();

    // Verify the context menu appears
    cy.get(".context-menu-container").should("be.visible");

    // Verify menu items
    cy.get(".context-menu-container").contains("Start Chat").should("be.visible");
    cy.get(".context-menu-container").contains("Block User").should("be.visible");
    cy.get(".context-menu-container").contains("Report User").should("be.visible");
    cy.get(".context-menu-container").contains("Delete User").should("be.visible");
  });

  it("should close context menu when clicking outside", () => {
    // Open context menu
    cy.get("button").contains("•••").first().click();
    cy.get(".context-menu-container").should("be.visible");

    // Click outside
    cy.get("body").click(0, 0);

    // Verify menu closes
    cy.get(".context-menu-container").should("not.exist");
  });

  it("should start a chat when clicking Start Chat option", () => {
    // Open context menu
    cy.get("button").contains("•••").first().click();

    // Click Start Chat
    cy.get(".context-menu-container").contains("Start Chat").click();

    // Verify chat creation was triggered
    cy.wait("@createChat");

    // Verify navigation to the new chat
    cy.url().should("include", "/new-chat-id");
  });

  it("should show a toast when selecting Block User", () => {
    // Open context menu
    cy.get("button").contains("•••").first().click();

    // Click Block User
    cy.get(".context-menu-container").contains("Block User").click();

    // Verify toast appears
    cy.contains("User user1 would be blocked").should("be.visible");
  });
});
