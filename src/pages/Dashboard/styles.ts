import styled, { keyframes } from "styled-components";
import { deviceWidth } from "../../styles/devices";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 100%;
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
  width: 100%;
  animation: ${appearFromLeft} 0.7s;
`;

export const ListCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 70px;
  width: 100%;
  height: 100%;
  place-content: center;
  flex-direction: column;

  @media (max-width: 600px) {
    margin-top: 60px;
  }

  @media ${deviceWidth.mobileL} {
    flex-direction: row;
  }
`;
