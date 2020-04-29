import React from "react";
import { FiPackage, FiCalendar } from "react-icons/fi";
import {
  StyCard,
  Header,
  Body,
  Valores,
  CashBack,
  Status,
  Cod,
} from "./styles";
import { ShopPurchase } from "../../utils/interfaces";

const Card: React.FC<ShopPurchase> = (props) => {
  const { codigo, valor, data, cashBackPerc, st } = props;
  // const { color, desc } = st;

  function formatDate(dataString: string): string {
    const arrDate = dataString.split("-");
    return `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
  }

  return (
    <>
      <StyCard elevation={3} color={st.color}>
        <Header>
          <Valores>
            <div className="total">R$ {valor.toFixed(2).replace(".", ",")}</div>
            {/* <p>Cashback</p> */}
            <CashBack>
              <div>
                R${" "}
                {((valor * cashBackPerc) / 100)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
              </div>
              <div>{cashBackPerc}%</div>
            </CashBack>
          </Valores>
          <hr />
          <Body>
            <Cod>
              <div>
                <FiPackage />
                {codigo}
              </div>
              <div>
                <FiCalendar />
                {formatDate(data)}
              </div>
            </Cod>
            <Status color={st.color}>{st.desc}</Status>
          </Body>
        </Header>
      </StyCard>
    </>
  );
};

export default Card;
