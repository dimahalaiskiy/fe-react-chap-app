import { BrowserRouter, Routes, Route } from "react-router-dom";

import ErrorBoundary from "@/hoc/error-boundary/ErrorBoundary";
import { PrivateRoute } from "@/hoc/private-route/PrivateRoute";
import { AuthProvider } from "@/context/AuthProvider";
import { SocketProvider } from "@/context/SocketProvider";
import { EmptyChatState } from "@/components/empty-chat-state/EmptyChatState";
import { ModalRoot } from "@/modals";
import { NotFound } from "@/pages/not-found/NotFound";
import { Layout } from "@/layouts/main-layout/WrapperLayout";
import { Login } from "@/pages/login/Login";
import { SignUp } from "@/pages/signup/Signup";
import { ProfileSettings } from "@/pages/profile-settings/ProfileSettings";
import { ChatView } from "@/pages/chat-view/ChatView";
import { ChatsLayout } from "@/layouts/chats-layout/ChatsLayout";
import { ToastLayout } from "@/layouts/toast-layout/ToastLayout";

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ToastLayout>
          <AuthProvider>
            <SocketProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <ChatsLayout />
                      </Layout>
                    </PrivateRoute>
                  }
                >
                  <Route index element={<EmptyChatState />} />
                  <Route path=":chatId" element={<ChatView />} />
                </Route>
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <ProfileSettings />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ModalRoot />
            </SocketProvider>
          </AuthProvider>
        </ToastLayout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
