import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const CustomInput = styled.input`
  padding: 10px 30px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  outline: none;
  border-bottom: 1px solid #d1d1d1;
  margin: 12px 0;

  &:hover {
    animation: ${rotate} 2s linear infinite;
  }

  &:focus {
    border: 1px solid #8d9ce2;
  }
`;
