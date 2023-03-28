import React, { useState, useEffect } from "react";

import { View } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { StackActions, useNavigation } from "@react-navigation/native";

import authRequest from "../../../shared/services/auth.request";
import { IUserLogin } from "../../../shared/interfaces/user.interface";
import { validEmailPattern } from "../../../shared/constants/validEmailPattern";

import StorageController from "../../../shared/utils/handlers/StorageController";
import { PropsStack } from "../../../shared/types/rootStackParamList";

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
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<IUserLogin>();

  const navigation = useNavigation<PropsStack>();

  useEffect(() => {
    (async () => {
      const token = await StorageController.getToken();

      if (token) goToApp();
    })();
  }, []);

  const onSubmit: SubmitHandler<IUserLogin> = async data => {
    try {
      setIsLoading(true);
      await authRequest.authenticate(data);
      goToApp();
    } catch (error) {
      if (error === "Unauthorized") {
        setError("password", { message: "Senha incorreta. Tente novamente" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  function goToApp() {
    navigation.dispatch(StackActions.replace("Home"));
  }

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

          <LoadingContainer>{isLoading && <Loading />}</LoadingContainer>

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
                  {...register("email", { pattern: validEmailPattern })}
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
            render={({
              field: { onChange },
              fieldState: { error, isTouched },
            }) => (
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
                  <IconButton
                    onPress={() => setVisiblePassword(!visiblePassword)}
                  >
                    {visiblePassword ? <EyeHidden /> : <Eye />}
                  </IconButton>
                </PasswordInputContainer>
                {error && (
                  <InfoErrorContainer>
                    <Info fillColor="#EF4444" strokeColor="#EF4444" size={20} />
                    <Text color="#EF4444" size={14}>
                      {errors?.password?.message}
                    </Text>
                  </InfoErrorContainer>
                )}
              </View>
            )}
          />
        </Form>
        <Button
          type="filled"
          disabled={!isDirty || !isValid || isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          Fazer Login
        </Button>
      </FormContainer>
    </Container>
  );
}