import React from "react";
import { FiPlus } from "react-icons/fi";
import { StyFab, Container } from "./styles";

const ButtonFloat: React.FC = () => {
  return (
    <Container>
      <StyFab color="primary" size="medium" aria-label="add">
        <FiPlus />
      </StyFab>
    </Container>
  );
};

export default ButtonFloat;
