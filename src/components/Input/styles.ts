import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainetProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainetProps>`
  background: #adadad;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #ccbfff;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) => props?.isErrored
    && css`
      border-color: #c53030;
    `}

  ${(props) => props.isFocused
    && css`
      color: #5636d3;
      border-color: #5636d3;
    `}

  ${(props) => props.isFilled
    && css`
      color: #5636d3;
    `}



  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }

    &:hover {
      border-color: #c53030 transparent;
    }
  }
`;
