import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import { deviceHeight } from "../../styles/devices";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 0.7s;

  img {
    margin-top: 50px;
    width: 200px;
  }

  @media ${deviceHeight.mobileS} {
    img {
      margin-top: 5px;
    }
  }

  form {
    margin: 20px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      margin-top: 24px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }
  }

  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }

    svg {
      margin-right: 8px;
    }
  }
`;
