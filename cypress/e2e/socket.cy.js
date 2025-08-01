/// <reference types="cypress" />

describe("Socket Service", () => {
  beforeEach(() => {
    // Mock socket.io-client
    cy.window().then((win) => {
      win.socketStub = {
        on: cy.stub().as("socketOn"),
        emit: cy.stub().as("socketEmit"),
        connect: cy.stub().as("socketConnect"),
        disconnect: cy.stub().as("socketDisconnect"),
        connected: true,
        id: "mock-socket-id",
      };

      // Stub io function to return our mock socket
      win.io = cy.stub().returns(win.socketStub);
    });

    // Visit the login page and log in to initialize socket
    cy.visit("/login");
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("password123");
    cy.get('[data-testid="login-button"]').click();

    // Wait for navigation to chat page
    cy.url().should("include", "/chat");
  });

  it("should initialize socket connection on login", () => {
    // Verify io was called with correct URL and options
    cy.window().its("io").should("be.called");
    cy.get("@socketConnect").should("be.called");
  });

  it("should register all necessary event listeners", () => {
    // Verify listeners for key socket events
    cy.get("@socketOn").should("be.calledWith", "connect");
    cy.get("@socketOn").should("be.calledWith", "disconnect");
    cy.get("@socketOn").should("be.calledWith", "message:received");
    cy.get("@socketOn").should("be.calledWith", "chat:created");
    cy.get("@socketOn").should("be.calledWith", "chat:updated");
    cy.get("@socketOn").should("be.calledWith", "user:typing");
    cy.get("@socketOn").should("be.calledWith", "user:stop_typing");
    cy.get("@socketOn").should("be.calledWith", "connect_error");
  });

  it("should emit message when sending a chat message", () => {
    // Navigate to a specific chat
    cy.get('[data-testid="chat-item"]').first().click();

    // Type and send a message
    const testMessage = "Hello, this is a test message";
    cy.get('[data-testid="message-input"]').type(testMessage);
    cy.get('[data-testid="send-button"]').click();

    // Verify message:sent event was emitted with correct data
    cy.get("@socketEmit").should("be.calledWith", "message:sent");
    cy.get("@socketEmit").invoke("getCall", -1).its("args.1").should("include", {
      content: testMessage,
    });
  });

  it("should update UI when receiving a new message", () => {
    // Navigate to a specific chat
    cy.get('[data-testid="chat-item"]').first().click();

    // Get initial message count
    cy.get('[data-testid="message-item"]').then((initialMessages) => {
      const initialCount = initialMessages.length;

      // Simulate receiving a new message via socket
      cy.window().then((win) => {
        const newMessageEvent = win.socketStub.on
          .getCalls()
          .find((call) => call.args[0] === "message:received");

        if (newMessageEvent && typeof newMessageEvent.args[1] === "function") {
          const messageHandler = newMessageEvent.args[1];

          // Call the handler with a mock message
          messageHandler({
            id: "new-message-id",
            content: "This is a new message from the socket",
            senderId: "other-user-id",
            chatId: "current-chat-id",
            createdAt: new Date().toISOString(),
          });
        }
      });

      // Verify a new message appears in the UI
      cy.get('[data-testid="message-item"]').should("have.length.greaterThan", initialCount);
      cy.contains("This is a new message from the socket").should("be.visible");
    });
  });

  it("should show typing indicator when remote user is typing", () => {
    // Navigate to a specific chat
    cy.get('[data-testid="chat-item"]').first().click();

    // Initially, no typing indicator
    cy.get('[data-testid="typing-indicator"]').should("not.exist");

    // Simulate receiving typing event
    cy.window().then((win) => {
      const typingEvent = win.socketStub.on
        .getCalls()
        .find((call) => call.args[0] === "user:typing");

      if (typingEvent && typeof typingEvent.args[1] === "function") {
        typingEvent.args[1]({ chatId: "current-chat-id", userId: "other-user-id" });
      }
    });

    // Verify typing indicator appears
    cy.get('[data-testid="typing-indicator"]').should("be.visible");

    // Simulate stop typing event
    cy.window().then((win) => {
      const stopTypingEvent = win.socketStub.on
        .getCalls()
        .find((call) => call.args[0] === "user:stop_typing");

      if (stopTypingEvent && typeof stopTypingEvent.args[1] === "function") {
        stopTypingEvent.args[1]({ chatId: "current-chat-id", userId: "other-user-id" });
      }
    });

    // Verify typing indicator disappears
    cy.get('[data-testid="typing-indicator"]').should("not.exist");
  });

  it("should emit typing events when user types in message input", () => {
    // Navigate to a chat
    cy.get('[data-testid="chat-item"]').first().click();

    // Type a message, which should trigger typing event
    cy.get('[data-testid="message-input"]').type("Hello");

    // Verify user:typing event was emitted
    cy.get("@socketEmit").should("be.calledWith", "user:typing");

    // Wait for debounce period and verify stop typing event
    cy.wait(1000); // Assuming the debounce is less than 1 second
    cy.get("@socketEmit").should("be.calledWith", "user:stop_typing");
  });

  it("should mark messages as read when viewing a chat", () => {
    // Navigate to a chat with unread messages
    cy.get('[data-testid="chat-item"]').contains("Unread").first().click();

    // Verify message:read event was emitted
    cy.get("@socketEmit").should("be.calledWith", "message:read");
  });

  it("should handle chat creation correctly", () => {
    // Click on new chat button
    cy.get('[data-testid="new-chat-button"]').click();

    // Select a user to chat with
    cy.get('[data-testid="user-list-item"]').first().click();

    // Verify chat:create event was emitted
    cy.get("@socketEmit").should("be.calledWith", "chat:create");

    // Simulate receiving chat:created event
    cy.window().then((win) => {
      const chatCreatedEvent = win.socketStub.on
        .getCalls()
        .find((call) => call.args[0] === "chat:created");

      if (chatCreatedEvent && typeof chatCreatedEvent.args[1] === "function") {
        chatCreatedEvent.args[1]({
          id: "new-chat-id",
          participants: [
            { id: "current-user-id", username: "Current User" },
            { id: "other-user-id", username: "Other User" },
          ],
          createdAt: new Date().toISOString(),
        });
      }
    });

    // Verify the new chat appears in the sidebar
    cy.contains("Other User").should("be.visible");
  });

  it("should disconnect socket when logging out", () => {
    // Open user menu and click logout
    cy.get('[data-testid="user-menu-button"]').click();
    cy.get('[data-testid="logout-button"]').click();

    // Verify disconnect was called
    cy.get("@socketDisconnect").should("be.called");

    // Verify redirect to login page
    cy.url().should("include", "/login");
  });

  it("should handle reconnection correctly", () => {
    // Simulate disconnect
    cy.window().then((win) => {
      const disconnectEvent = win.socketStub.on
        .getCalls()
        .find((call) => call.args[0] === "disconnect");

      if (disconnectEvent && typeof disconnectEvent.args[1] === "function") {
        disconnectEvent.args[1]();
      }
    });

    // Should show disconnected state
    cy.get('[data-testid="connection-status"]').should("contain", "Disconnected");

    // Simulate reconnect
    cy.window().then((win) => {
      const reconnectEvent = win.socketStub.on
        .getCalls()
        .find((call) => call.args[0] === "reconnect");

      if (reconnectEvent && typeof reconnectEvent.args[1] === "function") {
        reconnectEvent.args[1]();
      }
    });

    // Should show connected state
    cy.get('[data-testid="connection-status"]').should("contain", "Connected");
  });

  it("should handle connection errors appropriately", () => {
    // Simulate connection error
    cy.window().then((win) => {
      const errorEvent = win.socketStub.on
        .getCalls()
        .find((call) => call.args[0] === "connect_error");

      if (errorEvent && typeof errorEvent.args[1] === "function") {
        errorEvent.args[1]({ message: "Authentication failed" });
      }
    });

    // Should show error message
    cy.get('[data-testid="error-notification"]').should("contain", "Connection error");
  });

  it("should update user status correctly", () => {
    // Open user menu
    cy.get('[data-testid="user-menu-button"]').click();

    // Change status
    cy.get('[data-testid="status-away"]').click();

    // Verify status change event was emitted
    cy.get("@socketEmit").should("be.calledWith", "user:status_change");
    cy.get("@socketEmit").invoke("getCall", -1).its("args.1").should("include", {
      status: "away",
    });
  });
});
