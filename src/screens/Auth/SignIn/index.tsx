import React from "react";
import { useForm, Controller } from "react-hook-form";

import { View } from "react-native";

import { Button, Text } from "@components";

import {
  Container,
  Form,
  FormContainer,
  TextContainer,
  TextInput,
} from "./styles";

type formProps = {
  email: string;
  password: string;
};

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>();

  // async function onSubmit(data, error) {

  //   try {
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  return (
    <Container>
      <FormContainer behavior="padding">
        <Form>
          <TextContainer>
            <Text size={14} opacity={0.9}>
              Bem vindo(a) ao
            </Text>
            <Text size={24} weight="700">
              OWL
              <Text size={24}>PARTNERS</Text>
            </Text>
          </TextContainer>

          <Controller
            control={control}
            name="email"
            rules={{
              required: "informe o nome do parceiro",
            }}
            render={({ field: { onChange } }) => (
              <View>
                <Text>Email</Text>
                <TextInput
                  placeholder="The Bugger Ducks"
                  onChangeText={onChange}
                  keyboardType="email-address"
                />
                {errors.partner && <Text>Este campo é obrigatório</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="partner"
            rules={{
              required: "informe o nome do parceiro",
            }}
            render={({ field: { onChange } }) => (
              <View>
                <Text>Senha</Text>
                <TextInput
                  placeholder="The Bugger Ducks"
                  onChangeText={onChange}
                  textContentType="password"
                  secureTextEntry={true}
                />
                {errors.partner && <Text>Este campo é obrigatório</Text>}
              </View>
            )}
          />
        </Form>
        <Button type="filled" disabled>
          Fazer Login
        </Button>
      </FormContainer>
    </Container>
  );
}
