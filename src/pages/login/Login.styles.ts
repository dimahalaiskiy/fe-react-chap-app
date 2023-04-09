import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  height: 90vh;
`;

export const Text = styled.div`
  margin-top: 20px;
  display: flex;
  span {
    display: block;
    margin-right: 6px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
  a {
    text-decoration: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.16);
    :hover {
      color: #ffffff;
    }
  }
`;
