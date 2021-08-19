/* eslint-disable no-use-before-define */
import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import { FormHandles } from '@unform/core';
import { FiLock, FiPlus } from 'react-icons/fi';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, CardContainer, Card, DeposityContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface FormData {
  password: string;
  value: number;
}

interface Request {
  balance: string;
}

const Deposity: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user, token } = useAuth();
  const [balance, setBalance] = useState('');
  const { addToast } = useToast();

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

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const schema = Yup.object().shape({
          value: Yup.number().required('Numero é obrigatorio'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post<Request>('acconts/deposity', {
          passwordAccont: data.password,
          value: Number(data.value),
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        addToast({
          type: 'success',
          title: 'Sucesso no deposito',
        });

        setBalance(response.data.balance);
      } catch (err) {
        console.log(err);
        addToast({
          type: 'error',
          title: 'Error no deposito',
        });
      }
    }, [addToast, setBalance, token],
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
            <h1 data-testid="balance-total">{currencyFormat(balance)}</h1>
          </Card>
        </CardContainer>
        <DeposityContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Deposity</h1>

            <Input step="0.01" name="value" type="number" icon={FiPlus} placeholder="Value" />
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
