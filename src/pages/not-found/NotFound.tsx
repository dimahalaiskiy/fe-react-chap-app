import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFoundWrapper, NotFoundText, NotFoundContent } from './notFound.styled';
import { Button } from '../../components/button/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/');
  };

  return (
    <NotFoundWrapper>
      <NotFoundContent>
        <NotFoundText>Ooops, nothing here. 404</NotFoundText>
        <Button text='Home page' width='200px' onClick={navigateToHomePage} />
      </NotFoundContent>
    </NotFoundWrapper>
  );
};
