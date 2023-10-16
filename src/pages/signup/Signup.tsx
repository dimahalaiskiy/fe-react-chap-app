import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { CoreApiProvider } from '../../services/api';
import { emailValidator } from '../../utils/validateEmail';

import { Form } from './signup.styled';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import { Wrapper, Text } from '../login/login.styled';

import Spinner from '../../components/spinner/Spinner';

export const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isMatchedPassword, setIsMatchPasswords] = useState(true);

  const navigate = useNavigate();

  const handleChangeRepeatedPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setRepeatedPassword(event.currentTarget.value);
    setIsMatchPasswords(password === event.currentTarget.value);
  };

  const handleInputKeyDown = (e: any) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      console.log('pressing enter..');
      registerUser();
    }
  };

  const isValidForm =
    nickname.length > 1 && emailValidator(email) && isMatchedPassword;

  const registerUser = async () => {
    setIsLoading(true);
    try {
      const data = await CoreApiProvider.register({
        email,
        nickname,
        password,
      });
      if (data.statusText === 'Created') {
        toast.success('Profile created');
        navigate('/login');
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={(e: FormEvent) => handleInputKeyDown(e)}>
        <Input
          margin="0px 0px 18px 0px"
          label="nickname"
          value={nickname}
          error={nickname.length !== 0 && nickname.length < 2}
          errorMessage="min 2 symbol requires"
          setValue={(e) => setNickname(e.currentTarget.value)}
        />
        <Input
          type="email"
          margin="0px 0px 18px 0px"
          label="email"
          value={email}
          error={!isValidEmail}
          errorMessage="invalid email"
          setValue={(e) => {
            setEmail(e.currentTarget.value);
            if (!isValidEmail) setIsValidEmail(false);
          }}
        />
        <Input
          type="password"
          margin="0px 0px 18px 0px"
          label="password"
          value={password}
          error={password.length > 16}
          errorMessage="max length is 16 symbols"
          setValue={(e) => setPassword(e.currentTarget.value)}
        />
        <Input
          type="password"
          margin="0px 0px 18px 0px"
          label="repeat password"
          value={repeatedPassword}
          error={!isMatchedPassword}
          errorMessage="doesn't match"
          setValue={handleChangeRepeatedPassword}
        />
        <Button
          type="submit"
          text="Sign up"
          margin="18px 0px 0px 0px"
          disabled={!isValidForm}
          onClick={registerUser}
        >
          {isLoading && <Spinner margin="0px 0px 0px 20px" />}
        </Button>
        <Text>
          <span>Already has account?</span>
          <Link to="/login">Log In Here</Link>
        </Text>
      </Form>
    </Wrapper>
  );
};
