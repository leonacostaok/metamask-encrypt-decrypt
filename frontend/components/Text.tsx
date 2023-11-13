import styled from "styled-components";
import NextLink from 'next/link'

export const Text = styled.p`
  text-align: center;
  line-height: 1.4;
  color: white;
  margin-block-start: 0;
  margin-block-end: 0;

  &:hover {
    color: #eaeaea;
    font-weight: bold;
  }
`

export const BoldText = styled.p`
     text-align: center;
    font-weight: 900;
  color:white;
  margin-block-start: 0;
  margin-block-end: 0;
`

export const TextError = styled.p`
  color: red;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const TextWarning = styled.p`
  color: yellow;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const LinkText = styled.span`
     text-align: center;
  line-height: 1.4;
  text-decoration: underline;
  color:white;
  margin-block-start: 0;
  margin-block-end: 0;
  &:hover {
    color: rgb(42, 196, 231);
    cursor: pointer !important;
  }
`

export const Link = styled(NextLink)`
     text-align: center;
  line-height: 1.4;
  text-decoration: underline;
  color:white;
  margin-block-start: 0;
  margin-block-end: 0;
  &:hover {
    color: rgb(42, 196, 231);
    cursor: pointer !important;
  }
`
