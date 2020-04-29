import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { deviceWidth } from "../../styles/devices";

export const StyCard = styled(Paper)`
  margin: 8px 20px;
  width: 100%;
  height: 128px;
  font-size: 12px;
  background: #00000033 !important;
  color: white !important;
  display: block;
  max-width: 400px;
  place-content: center;
  border-left: 5px solid ${(props) => props.color};

  hr {
    height: 80%;
    display: flex;
    align-self: center;
    border: 1px solid ${(props) => props.color};
  }
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 140px);
  height: 100%;
  flex-flow: column;

  div {
    margin: 5px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const Cod = styled.div`
  display: flex;
  justify-content: space-between;
  height: 28px;

  div {
    display: flex;
    align-items: center;

    @media (max-width: 380px) {
      margin: 2px 0px;
    }

    svg {
      margin-right: 5px;
      font-size: 15px;
    }
  }

  @media (max-width: 380px) {
    flex-flow: column;
  }
`;

export const Status = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  color: ${(props) => props.color} !important;
  margin-top: 10px !important;
  height: 100%;

  @media ${deviceWidth.mobileL} {
    font-size: 25px;
  }
`;

export const Valores = styled.div`
  align-items: center;
  display: flex;
  margin-left: 8px;
  font-size: 20px;
  justify-content: center;
  flex-flow: column;

  .total {
    font-size: 22px;
  }

  p {
    margin-top: 8px;
  }

  div {
    align-self: flex-start;
  }
`;

export const CashBack = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  padding: 1px 0px;
  border-top: 2px solid white;
`;
