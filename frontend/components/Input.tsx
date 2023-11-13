import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.09);
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  max-width: 400px;
  text-align: center;
  border: solid 1px transparent;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.58);
  }

  &:hover {
    border: inset 1px rgba(255, 255, 255, 0.53);
  }
`;
