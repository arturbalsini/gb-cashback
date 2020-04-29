import React, { useState, useEffect } from "react";
import axios from "axios";
import Slide from "@material-ui/core/Slide";
import { useScrollTrigger } from "@material-ui/core";

import { StyAppBar, StyLogo, StyCashBack, Logo, LogoTexto } from "./styles";
import logoTexto from "../../assets/footer-logo-grupo.png";
import logo from "../../assets/grupo-boticario.png";

const AppBar: React.FC = () => {
  const [scrollTarget] = useState(undefined);
  const scrollTrigger = useScrollTrigger({ target: scrollTarget });

  const [totalCashBack, setTotalCashBack] = useState<number>(0);

  useEffect(() => {
    const getTotalCashBack = async (): Promise<any> => {
      const response = await axios.get("api/totalcash");

      setTotalCashBack(response.data.total);
    };
    getTotalCashBack();
  }, []);

  return (
    <>
      <Slide appear={false} direction="down" in={!scrollTrigger}>
        <StyAppBar>
          <StyLogo className="teste">
            <LogoTexto src={logoTexto} />
            <Logo src={logo} />
          </StyLogo>
          <StyCashBack>
            <div>Saldo Atual</div>
            <div>
              R$ {totalCashBack.toFixed(2).toString().replace(".", ",")}
            </div>
          </StyCashBack>
        </StyAppBar>
      </Slide>
    </>
  );
};

export default AppBar;
