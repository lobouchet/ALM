import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const LoginContainer = styled.div`
  max-width: 600px;
  min-height: 600px;
  margin: 2rem auto;
  padding: 4rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, 
      rgba(0, 180, 216, 0.1) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 30%, 
      rgba(0, 180, 216, 0.05) 0%,
      rgba(0, 0, 0, 0) 50%
    );
    pointer-events: none;
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #ff6b35, #ff9f1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  letter-spacing: 2px;
  font-weight: 800;
  position: relative;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 4px;
    background: linear-gradient(90deg, #ff6b35, #ff9f1c);
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #00b4d8;
    box-shadow: 0 0 0 2px rgba(0, 180, 216, 0.2),
                0 0 20px rgba(0, 180, 216, 0.1),
                0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Button = styled.button`
  background: #00b4d8;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: #0096c7;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 180, 216, 0.3);
    
    &::before {
      transform: translateX(100%);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 180, 216, 0.3);
  }
`;

const LinkText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1rem;

  a {
    color: #00b4d8;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: linear-gradient(90deg, #00b4d8, #e94560);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: #e94560;
      text-shadow: 0 0 10px rgba(233, 69, 96, 0.5);

      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      toast.success('Connexion réussie !');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    }
  };

  return (
    <LoginContainer>
      <Title>To Scooby-Do</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Se connecter</Button>
      </Form>
      <LinkText>
        Pas encore de compte ? <a href="/register">S'inscrire</a>
      </LinkText>
    </LoginContainer>
  );
};

export default Login; 