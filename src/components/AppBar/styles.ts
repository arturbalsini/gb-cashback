import styled from "styled-components";
import { AppBar, Toolbar } from "@material-ui/core";
import { deviceWidth } from "../../styles/devices";

export const StyAppBar = styled(AppBar)`
  background-color: #363636 !important;
  flex-direction: row-reverse !important;
`;

export const StyLogo = styled(Toolbar)`
  justify-content: center;
  position: absolute !important;

  img {
    width: 150px;
  }

  @media (max-width: 475px) {
    img {
      width: 75px;
    }
  }
`;

export const StyCashBack = styled(Toolbar)`
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const Logo = styled.img`
  position: relative;
  bottom: 2px;
  left: 26px;
  @media (min-width: 475px) {
    display: none;
  }
`;

export const LogoTexto = styled.img`
  @media (max-width: 475px) {
    display: none;
    width: 100px;
  }
`;
