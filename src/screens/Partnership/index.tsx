import { Button, Card, Header, Input, Tabs, Text } from "@components";
import { SpecificCardProps } from "src/components/Card";
import { ButtonsContainer, Container, HistoryContainer } from "./styles";

export function Partnership() {
  const historyMock: HistoryProps["data"] = [
    {
      id: "1",
      date: "21/07/2023",
      time: "16:00",
      description:
        "Troquei mensagens com a reitora, que me permitiu planejar uma palestra para conversar com os alunos mês que vem. Pretendo entrefgar novas ideias dentro de 2 semanas.",
      author: "Maria Gabriela",
    },
    {
      id: "2",
      date: "20/07/2023",
      time: "15:00",
      title: "Programa #ElesSabem",
      description:
        "Ficou decidido pelos participantes da reunião que o programa ficará ativo por um período inicial de 6 meses para adequação dos alunos à iniciativa",
      author: "João Marcos",
    },
  ];

  return (
    <Container>
      <Header />

      <ButtonsContainer>
        <Button type="unfilled" onPress={() => alert("Deletar!")}>
          Deletar parceria
        </Button>
        <Button
          onPress={() => alert("informações!")}
          style={{ marginVertical: 8 }}
        >
          Editar informações
        </Button>
      </ButtonsContainer>

      <HistoryContainer>
        <Tabs onChangeTab={tab => alert(`mudou a tab! ${tab}`)} />

        <History data={historyMock} />
      </HistoryContainer>
    </Container>
  );
}

interface HistoryProps {
  data: SpecificCardProps["props"][];
}

function History({ data }: HistoryProps) {
  return (
    <>
      <Input
        label={"Inserir atualização"}
        placeholder={"Nova atualização sobre a parceria..."}
        onChangeText={text => console.log(text)}
        hasOutIcon
      />

      <Text size={14} color={"#666666"} style={{ marginVertical: 16 }}>
        Todas as atualizações e anotações
      </Text>

      {data.map(card => {
        return (
          <Card
            key={card.id}
            id={card.id}
            type={card.title ? "annotation" : "update"}
            date={card.date}
            time={card.time}
            description={card.description}
            author={card.author}
            title={card.title}
          />
        );
      })}
    </>
  );
}
