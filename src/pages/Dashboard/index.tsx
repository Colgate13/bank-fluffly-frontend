/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';

import total from '../../assets/total.svg';

import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container, CardContainer, Card, TableContainer,
} from './styles';

interface Request {
  balance: string;
}

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [balance, setBalance] = useState('');

  const balanceRealTime = useCallback(async () => {
    const { id } = user;
    const response = await api.post<Request>('acconts/FindId', {
      id,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBalance(response.data.balance);
  }, [user, token]);

  balanceRealTime();

  useEffect(() => {
    balanceRealTime();
  }, [balanceRealTime]);

  function currencyFormat(num: string) {
    const aux = Number(num);
    return `$${aux.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  }

  return (
    <>
      <Header />
      <Container>

        <CardContainer>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{currencyFormat(balance)}</h1>
          </Card>
          <h1>
            Bem vindo
            {' '}
            {user.name}
          </h1>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Mensagem</th>
                <th>Preço</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="title">Computer</td>
                <td className="income">R$ 5.000,00</td>
                <td>20/04/2020</td>
              </tr>
              <tr>
                <td className="title">Website Hosting</td>
                <td className="outcome">- R$ 1.000,00</td>
                <td>19/04/2020</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
