/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';

import total from '../../assets/total.svg';

import Header from '../../components/Header';

import {
  Container, CardContainer, Card, TableContainer,
} from './styles';

interface User {
  id: string;
  balance: string;
  email: string;
  name: string;
}

const Dashboard: React.FC = () => {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);

  function currencyFormat(num: string) {
    const aux = Number(num);
    return `$${aux.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  }

  const [user, setUser] = useState<User>(() => {
    const data = localStorage.getItem('@GoFluffly:user');

    if (data) {
      const dataFormat = JSON.parse(data);

      return {
        id: dataFormat.id,
        balance: dataFormat.balance,
        email: dataFormat.email,
        name: dataFormat.name,
      };
    }
    return {} as User;
  });

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      console.log(user);
    }

    loadTransactions();
  }, [user]);

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
            <h1 data-testid="balance-total">{currencyFormat(user.balance)}</h1>
          </Card>
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
