import React, { useEffect, useContext, useState } from 'react';
import { UserProfileContext } from '../../context/UserProfileProvider';
import { Link } from 'react-router-dom';
import { ButtonStyled } from '../../components/button/Button.styles';
import api from '../../services/api/core';

export const Home = () => {
  const data = useContext(UserProfileContext);

  if (!data) {
    return <div>Loading</div>;
  }

  const getProtecrion = async () => {
    try {
      const { data } = await api.post('auth/protected');
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <ButtonStyled onClick={getProtecrion}>Get Protecrion</ButtonStyled>
    </div>
  );
};
