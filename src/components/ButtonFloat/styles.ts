import styled from "styled-components";
import Fab from "@material-ui/core/Fab";

export const StyFab = styled(Fab)`
  background: #f05a21 !important;

  position: relative;
  left: 211px;

  @media (max-width: 560px) {
    position: none;
    left: 0px;
  }

  &:hover {
    background-color: #c34618 !important;
  }

  svg {
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  bottom: 10px;
  position: fixed !important;

  @media (max-width: 560px) {
    right: 10px;
  }
`;
