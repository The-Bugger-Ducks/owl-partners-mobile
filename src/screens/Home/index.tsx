import { Button, Header } from "@components";
import { ButtonsContainer, Container } from "./styles";

export function Home() {
  return (
    <Container>
      <Header isHero={true} />

      <ButtonsContainer>
        <Button type="unfilled" onPress={() => alert("Reunião!")}>
          Agendar reunião
        </Button>
        <Button
          onPress={() => alert("Usuários!")}
          style={{ marginVertical: 8 }}
        >
          Gerenciar usuários
        </Button>
      </ButtonsContainer>
    </Container>
  );
}
