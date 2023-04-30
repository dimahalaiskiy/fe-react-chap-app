import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  height: 90vh;
`;

export const Text = styled.div`
  margin-top: 26px;
  display: flex;
  span {
    display: block;
    margin-right: 6px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.16);
  }
  a {
    text-decoration: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    :hover {
      background-image: linear-gradient(
        94.21deg,
        #fcc914 -11.67%,
        #fe6f37 35.99%,
        #c66add 85.06%,
        #9a74f1 122.91%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }
  }
`;
