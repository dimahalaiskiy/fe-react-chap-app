import React, { useEffect, useContext, useState } from 'react';
import { UserProfileContext } from '../../context/UserProfileProvider';
import { Link } from 'react-router-dom';

export const Home = () => {
  const data = useContext(UserProfileContext);

  return (
    <>
      <Link to='/login'>Login</Link>
    </>
  );
};
