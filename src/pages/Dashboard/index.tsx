/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';

import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import {
  Container, CardContainer, Card, TableContainer,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  // eslint-disable-next-line camelcase
  created_at: Date;
}

interface User {
  name: string;
  balance: string;
  avatar?: string;
}

const Dashboard: React.FC = () => {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [balance, setBalance] = useState<User>(() => {
  //   const token = localStorage.getItem('@GoFluffly:token');
  //   const user = localStorage.getItem('@GoFluffly:user');

  //   await api.post('acconts', token.)
  // } as User);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      // TODO
    }

    loadTransactions();
  }, []);

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
            <h1 data-testid="balance-total">R$ 4000,00</h1>
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
