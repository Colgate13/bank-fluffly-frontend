/* eslint-disable no-use-before-define */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { FormHandles } from '@unform/core';
import {
  FiMail, FiLock, FiEye, FiAirplay,
} from 'react-icons/fi';

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
  keyfree: string;
  value: number;
  message: string;
  password: string;
}

interface Request {
  balance: string;
}
const Pay: React.FC = () => {
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
          keyfree: Yup.string().required('KeyFree é obrigatoria'),
          message: Yup.string().notRequired(),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post<Request>('acconts/transactions', {
          keyFree: data.keyfree,
          value: Number(data.value),
          message: data.message,
          password: data.password,
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
            <h1>Pay with Keyfree</h1>
            <Input name="keyfree" type="text" icon={FiMail} placeholder="KeyFree of recipient" />
            <Input name="message" type="text" icon={FiEye} placeholder="Message" />
            <Input step="0.01" name="value" type="number" icon={FiAirplay} placeholder="Value" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Pay</Button>

          </Form>
        </DeposityContainer>
      </Container>
    </>
  );
};

export default Pay;
