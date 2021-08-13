// eslint-disable-next-line no-use-before-define
import React, {
  createContext, useContext, useCallback, useState,
} from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  // eslint-disable-next-line no-use-before-define
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}
export interface ToastMessage {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

// eslint-disable-next-line react/prop-types
const ToastProvider: React.FC = ({ children }) => {
  const [messeges, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((oldMessages) => [...oldMessages, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messeges} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { ToastProvider, useToast };
