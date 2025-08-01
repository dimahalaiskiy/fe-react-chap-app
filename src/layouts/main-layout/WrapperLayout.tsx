import { OuterLayout, InnerLayout } from "./wrapperLayout.styled";
import { Header } from "@/components/header/Header";

import { useAuth } from "@/hooks/useAuth";

interface Layout {
  children: JSX.Element;
}

export const Layout: React.FC<Layout> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <OuterLayout>
      <InnerLayout>
        {isAuthenticated && <Header />}
        {children}
      </InnerLayout>
    </OuterLayout>
  );
};
