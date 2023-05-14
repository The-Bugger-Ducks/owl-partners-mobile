import React, { useEffect, useState } from "react";

import {
  Button,
  Eye,
  EyeHidden,
  Header,
  Info,
  Loading,
  Text,
} from "@components";
import { validEmailPattern } from "@constants";
import { PropsStack } from "@custom-types/rootStackParamList";
import { IUserLogin } from "@interfaces/user.interface";
import { StackActions, useNavigation } from "@react-navigation/native";
import authRequest from "@requests/auth.request";
import StorageController from "@utils/handlers/StorageController";
import { isAxiosError } from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import {
  ButtonsArea,
  Container,
  Form,
  FormContainer,
  IconButton,
  InfoErrorContainer,
  InputPassword,
  LoadingContainer,
  PasswordInputContainer,
  TextInput,
} from "./styles";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<IUserLogin>();

  const navigation = useNavigation<PropsStack>();

  useEffect(() => {
    handleUserAuthentication();
  }, []);

  const onSubmit: SubmitHandler<IUserLogin> = async data => {
    try {
      setErrorMessage(null);
      setIsLoading(true);
      await authRequest.authenticate(data);
      goToApp();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            setError("password", {
              message: "Senha incorreta. Tente novamente",
            });
            throw new Error("Unauthorized");
          }
        }
      }
      const genericMessageError = "Algo inesperado aconteceu, tente novamente!";

      setErrorMessage(genericMessageError);
      throw new Error(genericMessageError);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleUserAuthentication() {
    const token = await StorageController.getToken();

    if (token) goToApp();
  }

  function goToApp() {
    navigation.dispatch(StackActions.replace("HomeStack"));
  }

  return (
    <Container>
      <FormContainer>
        <Form>
          <Header align="center" isHero />

          <LoadingContainer>{isLoading && <Loading />}</LoadingContainer>

          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
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
            rules={{ required: true }}
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
                {(error || errorMessage) && (
                  <InfoErrorContainer>
                    <Info fillColor="#EF4444" strokeColor="#EF4444" size={20} />
                    <Text color="#EF4444" size={14}>
                      {errors?.password?.message ?? errorMessage}
                    </Text>
                  </InfoErrorContainer>
                )}
              </View>
            )}
          />
        </Form>

        <ButtonsArea style={{ gap: 15 }}>
          <Button
            type="filled"
            disabled={!isDirty || !isValid || isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Fazer Login
          </Button>

          <Button type="filled" onPress={() => navigation.navigate("SignUp")}>
            Cadastrar conta
          </Button>
        </ButtonsArea>
      </FormContainer>
    </Container>
  );
}
