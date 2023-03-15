import { Header } from "@components";
import { Button } from "../../components/Button";
import { Container } from "./styles";

export function Home() {
  return (
    <Container>
      <Header isHero={true} />
    </Container>
  );
}
