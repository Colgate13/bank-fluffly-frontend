// eslint-disable-next-line no-use-before-define
import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  // eslint-disable-next-line react/require-default-props
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <Link to="/">
        <img src={Logo} alt="GoFinances" />
      </Link>
      <nav>
        <Link to="/deposity">Deposity</Link>
        <Link to="/withdraw">Withdraw</Link>

        <Link to="/pay">Pay</Link>

      </nav>
    </header>
  </Container>
);

export default Header;
