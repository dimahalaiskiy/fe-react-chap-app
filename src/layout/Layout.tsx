import React from 'react';
import { LayoutWrapper } from './Layout.styles';

type Props = {
  children: JSX.Element;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};
