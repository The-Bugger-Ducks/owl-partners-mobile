import { Logo } from "../Icons/Logo";
import { Text } from "../Text";
import { Container, TextContainer } from "./styles";

interface HeaderProps {
  isHero?: boolean;
  align?: "center" | "left";
}

export function Header({ isHero = false, align = "left" }: HeaderProps) {
  return (
    <Container>
      <TextContainer textAlign={align}>
        {isHero && (
          <Text size={14} opacity={0.9}>
            Bem vindo(a) ao
          </Text>
        )}
        <Text size={24} weight="700">
          OWL
          <Text size={24}>PARTNERS</Text>
        </Text>
      </TextContainer>
      {align !== "center" && <Logo />}
    </Container>
  );
}
