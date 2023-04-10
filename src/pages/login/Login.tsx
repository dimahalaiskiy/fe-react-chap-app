import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { emailValidator } from '../../utils/helpers/validateEmail';
import api from '../../services/api/core';

import { Layout } from '../../layout/Layout';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';

import { Wrapper, Text } from './Login.styles';

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigate = useNavigate();

  const isValidForm = emailValidator(email) && password.length >= 1;

  const registerUser = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      console.log('data', response);
      const cookies = response.headers['set-cookie'];
      console.log('cookies', cookies);
      if (cookies !== undefined) {
        document.cookie = cookies[0];
      }
      if (response.data === 'OK') {
        navigate('/home');
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Input
          type='email'
          margin='0px 0px 18px 0px'
          label='email'
          value={email}
          error={!isValidEmail}
          errorMessage='invalid email'
          setValue={(e) => {
            setEmail(e.currentTarget.value);
            if (!isValidEmail) setIsValidEmail(false);
          }}
        />
        <Input
          type='password'
          margin='0px 0px 18px 0px'
          label='password'
          value={password}
          error={password.length > 16}
          errorMessage='max length is 16 symbols'
          setValue={(e) => setPassword(e.currentTarget.value)}
        />
        <Button
          margin='18px 0px 0px 0px'
          disabled={!isValidForm}
          onClick={registerUser}
          text='Join'
        >
          {isLoading && <Spinner margin='0px 0px 0px 20px' />}
        </Button>
        <Text>
          <span>Are You a New Member?</span>
          <Link to='/register'>Register Here</Link>
        </Text>
      </Wrapper>
    </Layout>
  );
};
