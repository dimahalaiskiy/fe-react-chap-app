import React from 'react';

import { SidebarHeading, SidebarWrapper } from './sidebar.styled';

interface Sidebar {}

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarHeading>Chats</SidebarHeading>
    </SidebarWrapper>
  );
};
