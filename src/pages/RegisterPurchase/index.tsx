import React, { useCallback, useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import {
  FiCalendar,
  FiPackage,
  FiCreditCard,
  FiArrowLeft,
} from "react-icons/fi";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { useToast } from "../../hooks/toast";

import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer, Title } from "./styles";
import {
  StringToNumber,
  NumbertoLocaleString,
} from "../../utils/getSetCurrencyValue";
import { useAuth } from "../../hooks/auth";

interface RegisterProductFormData {
  codigo: string;
  valor: string;
  data: string;
}

const RegisterProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user, confirmLogon } = useAuth();

  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState("");

  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    confirmLogon();
  }, [confirmLogon]);

  const handleChangeValor = useCallback((e) => {
    setValor(NumbertoLocaleString(StringToNumber(e.target.value)));
  }, []);

  const handleSubmit = useCallback(
    async (data: RegisterProductFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          codigo: Yup.string().required("Código obrigatório"),
          valor: Yup.string().required("Valor obrigatório"),
          data: Yup.string().required("Data obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        await axios.post("/api/registerPurchase", {
          codigo: data.codigo,
          valor: StringToNumber(data.valor),
          data: data.data,
        });

        addToast({
          type: "success",
          title: "Cadastro realizado",
          description: "Você já pode fazer seu logon no CashBack",
        });

        setLoading(false);

        history.push("/dashboard");
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        addToast({
          type: "error",
          title: "Erro no cadastro",
          description: "Cheque os dados informados.",
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Title>
              <Link to="/dashboard">
                <FiArrowLeft />
              </Link>
              <h1>Registrar Compra</h1>
            </Title>
            <Input
              name="codigo"
              icon={FiPackage}
              type="text"
              placeholder="Código"
              value="12345AB"
            />
            <Input
              name="valor"
              icon={FiCreditCard}
              type="text"
              placeholder="Valor da Compra"
              value={valor}
              onChange={handleChangeValor}
            />
            <Input
              name="data"
              icon={FiCalendar}
              type="date"
              placeholder="Data da Compra"
              value="2020-03-21"
            />

            <Button loading={loading} type="submit">
              Registrar
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default RegisterProduct;
