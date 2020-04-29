import React, { useCallback, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiLock,
  FiCreditCard,
} from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { useToast } from "../../hooks/toast";

import getValidationErrors from "../../utils/getValidationErrors";

import logo from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer } from "./styles";

interface SignUpFormData {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState("");

  const { addToast } = useToast();

  const history = useHistory();

  const handleChange = useCallback((e) => {
    const cpfMask = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
    setCpf(cpfMask);
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          password: Yup.string().min(6, "No mínimo 6 digitos"),
          cpf: Yup.string().matches(
            /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            "CPF inválido",
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        await axios.post("/api/signup", data);

        addToast({
          type: "success",
          title: "Cadastro realizado",
          description: "Você já pode fazer seu logon no CashBack",
        });

        setLoading(false);

        history.push("/");
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
          <img src={logo} alt="CashBack" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input
              name="name"
              icon={FiUser}
              type="text"
              placeholder="Nome"
              value="Artur Balsini"
            />
            <Input
              name="cpf"
              icon={FiCreditCard}
              type="text"
              placeholder="CPF"
              value="046.820.369-98"
              // value={cpf}
              // onChange={handleChange}
            />
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              value="arturbalsini@gmail.com"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              value="123456"
            />

            <Button loading={loading} type="submit">
              Cadastrar
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
