import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  useEffect(() => {}, []);
  return <Link to='/login'>Login</Link>;
};
