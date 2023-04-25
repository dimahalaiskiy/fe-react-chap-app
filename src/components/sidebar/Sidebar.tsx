import React from 'react';

import { SidebarHeading, SidebarWrapper } from './sidebar.styles';

interface Sidebar {}

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarHeading>Chats</SidebarHeading>
    </SidebarWrapper>
  );
};
