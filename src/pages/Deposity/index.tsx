/* eslint-disable no-use-before-define */
import React, {
  useRef, useCallback,
} from 'react';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';

import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, CardContainer, Card, DeposityContainer,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const Deposity: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [balance, setBalance] = useState<Balance>({} as Balance);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }, [],
  );

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
        <DeposityContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Deposity</h1>

            <Input name="value" type="number" icon={FiMail} placeholder="Value" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Deposity</Button>

          </Form>
        </DeposityContainer>
      </Container>
    </>
  );
};

export default Deposity;
