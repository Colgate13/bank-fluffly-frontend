import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signinBackgroundImg from '../../assets/background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 700px;

  img {
    transition: transform 0.5s;

    &:hover {
      transform: scale(1.15);
    }
  }
`;
const appeartFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  animation: ${appeartFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: background-color 0.3s;
      transition: transform 0.5s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
        transform: scale(1.15);
      }
    }
    // To falando que eu quero estilizar os 'a' que estão diretamente dentro do content
    // e não os que estão mais um nivel para dentro/ os filhos
  }
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: background-color 0.3s;
    transition: transform 0.5s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
      transform: scale(1.15);
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signinBackgroundImg}) no-repeat center;
  background-size: cover;
`;
