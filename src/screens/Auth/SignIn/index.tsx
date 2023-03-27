import React, {useState} from "react";

import { View } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import authRequest from "../../../shared/services/auth.request";
import { IUserLogin } from "../../../shared/interfaces/user.interface";
import { validEmailPattern } from "../../../shared/constants/validEmailPattern";

import { Button, Text, Info, EyeHidden, Eye, Loading } from "@components";

import {
  Container,
  Form,
  FormContainer,
  IconButton,
  InfoErrorContainer,
  InputPassword,
  LoadingContainer,
  PasswordInputContainer,
  TextContainer,
  TextInput,
} from "./styles";

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: {
      errors,
      isDirty,
      isValid
    },
  } = useForm<IUserLogin>();


  const onSubmit : SubmitHandler<IUserLogin> = async (data) => {
    try {
      setLoading(true)
      await authRequest.authenticate(data)
    } catch (error) {
      if (error === "Unauthorized") {
        setError("password", {message: "Senha incorreta. Tente novamente"});
      }
    } finally {
      setLoading(false)
    }

  };

  return (
    <Container>
      <FormContainer>
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

          <LoadingContainer>
            {loading && <Loading />}
          </LoadingContainer>

          <Controller
            control={control}
            name="email"
            rules={{
              required: true,
            }}

            render={({ field: { onChange } }) => (
              <View>
                <Text>Email</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={onChange}
                  keyboardType="email-address"
                  {...register("email", {pattern: validEmailPattern})}
                />
                {errors.email && <Text>{errors.email.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: true,
            }}
            render={({ field: { onChange }, fieldState: {error, isTouched} }) => (
              <View>
                <Text>Senha</Text>
                <PasswordInputContainer
                  borderColor={
                    error ? "#EF4444" : isTouched ? "#666666" : undefined
                  }
                >
                  <InputPassword
                    placeholder="Senha"
                    onChangeText={onChange}
                    textContentType="password"
                    secureTextEntry={!visiblePassword}
                  />
                  <IconButton onPress={() => setVisiblePassword(!visiblePassword)}>
                    {visiblePassword ? <EyeHidden /> :  <Eye />}
                  </IconButton>
                </PasswordInputContainer>
                {error && (
                  <InfoErrorContainer>
                    <Info fillColor="#EF4444" strokeColor="#EF4444"  size={20}/>
                    <Text color="#EF4444" size={14}>
                      {errors?.password?.message}
                    </Text>
                  </InfoErrorContainer>
                )}
              </View>
            )}
          />
        </Form>
        <Button type="filled" disabled={!isDirty || !isValid} onPress={handleSubmit(onSubmit)}>
          Fazer Login
        </Button>

      </FormContainer>
    </Container>
  );
}
