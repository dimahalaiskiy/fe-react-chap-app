describe("Authentication", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe("Registration", () => {
    beforeEach(() => {
      cy.visit("/register");
    });

    it("should display registration form", () => {
      cy.get("form").should("exist");
      cy.get('input[name="username"]').should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('input[name="confirmPassword"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
      cy.contains("Login here").should("be.visible");
    });

    it("should validate form inputs", () => {
      cy.get('input[name="username"]').type("t");
      cy.contains("min 3 symbol requires").should("be.visible");

      cy.get('input[name="username"]').clear().type("testuser");
      cy.get('input[name="email"]').type("invalid-email");
      cy.contains("invalid email").should("be.visible");

      cy.get('input[name="displayName"]').type("te");
      cy.contains("min 3 symbol requires").should("be.visible");

      cy.get('input[name="password"]').clear().type("password123");
      cy.get('input[name="confirmPassword"]').type("password456");
      cy.contains("doesn't match").should("be.visible");
    });

    it("should register a new user successfully", () => {
      cy.intercept("POST", "**/auth/register", {
        statusCode: 201,
        body: {
          success: true,
          user: {
            _id: "12345",
            username: "newuser",
            email: "newuser@example.com",
            displayName: "New User",
            avatar: "",
            createdAt: new Date().toISOString(),
          },
        },
      }).as("registerRequest");

      cy.get('input[name="username"]').type("newuser");
      cy.get('input[name="email"]').type("newuser@example.com");
      cy.get('input[name="displayName"]').type("newuser");
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="confirmPassword"]').type("password123");

      cy.get('button[type="submit"]').click();

      cy.wait("@registerRequest");

      cy.url().should("include", "/login");

      cy.contains("Profile created").should("be.visible");
    });

    it("should handle registration error", () => {
      cy.intercept("POST", "**/auth/register", {
        statusCode: 409,
        body: "Username already exists",
      }).as("registerErrorRequest");

      cy.get('input[name="username"]').type("existinguser");
      cy.get('input[name="email"]').type("existing@example.com");
      cy.get('input[name="displayName"]').type("existinguser");
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="confirmPassword"]').type("password123");

      cy.get('button[type="submit"]').click();
      cy.wait("@registerErrorRequest");
      cy.url().should("include", "/register");
      cy.contains("Username already exists").should("be.visible");
    });
  });

  describe("Login", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("should display login form", () => {
      cy.get("form").should("exist");
      cy.get('input[name="username"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
      cy.contains("New here?").should("be.visible");
      cy.contains("Register").should("be.visible");
    });

    it("should validate login inputs", () => {
      cy.get('input[name="username"]').type("testuser");
      cy.get('button[type="submit"]').should("be.disabled");

      cy.get('input[name="username"]').clear();
      cy.get('input[name="password"]').type("password123");
      cy.get('button[type="submit"]').should("be.disabled");

      cy.get('input[name="username"]').clear().type("testuser");
      cy.get('button[type="submit"]').should("be.enabled");
    });

    it("should login successfully", () => {
      cy.intercept("POST", "**/auth/login", {
        statusCode: 200,
        body: {
          success: true,
          user: {
            _id: "12345",
            username: "testuser",
            email: "test@example.com",
            displayName: "Test User",
            avatar: "",
            createdAt: new Date().toISOString(),
          },
        },
      }).as("loginRequest");

      cy.get('input[name="username"]').type("testuser");
      cy.get('input[name="password"]').type("password123");

      cy.get('button[type="submit"]').click();
      cy.wait("@loginRequest");
      cy.url().should("include", "/");
    });

    it("should handle login error", () => {
      cy.intercept("POST", "**/auth/login", {
        statusCode: 401,
        body: "Invalid username or password",
      }).as("loginErrorRequest");

      cy.get('input[name="username"]').type("wronguser");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.get('button[type="submit"]').click();
      cy.wait("@loginErrorRequest");
      cy.url().should("include", "/login");
      cy.contains("Invalid username or password").should("be.visible");
    });
  });

  describe("Protected Routes", () => {
    it("should redirect to login when accessing protected route while logged out", () => {
      cy.intercept("POST", "**/auth/protected", {
        statusCode: 401,
        body: {
          success: false,
          message: "Not authenticated",
        },
      }).as("authCheckFailed");

      cy.visit("/");
      cy.wait("@authCheckFailed");

      cy.url().should("include", "/login");
    });

    it("should access protected route when logged in", () => {
      cy.intercept("POST", "**/auth/protected", {
        statusCode: 200,
        body: {
          success: true,
          user: {
            _id: "12345",
            username: "testuser",
            email: "test@example.com",
            displayName: "Test User",
            avatar: "",
            createdAt: new Date().toISOString(),
          },
        },
      }).as("authCheckSuccess");

      cy.visit("/");
      cy.wait("@authCheckSuccess");
      cy.url().should("include", "/");
    });
  });

  describe("Logout", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/auth/protected", {
        statusCode: 200,
        body: {
          success: true,
          user: {
            _id: "12345",
            username: "testuser",
            displayName: "Test User",
            email: "test@example.com",
            avatar: "",
            createdAt: new Date().toISOString(),
          },
        },
      }).as("authCheckSuccess");

      cy.visit("/");
      cy.wait("@authCheckSuccess");
    });

    it("should logout successfully", () => {
      cy.intercept("POST", "**/auth/logout", {
        statusCode: 200,
        body: {
          success: true,
          message: "Logged out successfully",
        },
      }).as("logoutRequest");

      cy.get("#profile-button").click();
      cy.contains("Logout").click();
      cy.wait("@logoutRequest");
      cy.url().should("include", "/login");
    });
  });
});
