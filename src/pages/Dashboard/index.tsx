import React, { useEffect, useState, Provider } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShopPurchase } from "../../utils/interfaces";
import ButtonFloat from "../../components/ButtonFloat";
import AppBar from "../../components/AppBar";
import Card from "../../components/Card";

import { Container, AnimationContainer, ListCards } from "./styles";
import { useAuth } from "../../hooks/auth";

const Dashboard: React.FC = () => {
  const [shopping, setShopping] = useState<ShopPurchase[]>([]);
  const { user, confirmLogon } = useAuth();
  const { id } = user;

  useEffect(() => {
    confirmLogon();
    const getShopping = async (): Promise<any> => {
      Promise.all([
        axios.get(`api/purchase?id=${id}`),
        axios.get("api/status"),
      ]).then(([responseShopping, responseStatus]) => {
        setShopping(
          responseShopping.data.map((shop: ShopPurchase) => {
            return {
              st: responseStatus.data[shop.statusID - 1],
              ...shop,
            };
          }),
        );
      });
    };
    getShopping();
  }, [confirmLogon]);

  return (
    <Container>
      <AnimationContainer>
        <AppBar />
        <ListCards>
          {shopping.map((shop: ShopPurchase) => {
            return <Card key={shop.id} {...shop} />;
          })}
        </ListCards>
        <Link to="register">
          <ButtonFloat />
        </Link>
      </AnimationContainer>
    </Container>
  );
};

export default Dashboard;
