import { Button, Card, Header, Input, Loading, Tabs, Text } from "@components";
import { IComment } from "@interfaces/annotation.interface";
import AnnotationController from "@requests/AnnotationController";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import {
  ButtonsContainer,
  Container,
  HistoryContainer,
  LoadingContainer,
} from "./styles";

export function Partnership() {
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [annotations, setAnnotations] = useState<IComment[]>();

  async function getData() {
    const comments = await AnnotationController.getAnnotations(
      "baadc558-2791-4f9a-8d1e-e01a0a92b432",
    );
    setAnnotations(comments);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  function handleDeletePartnership() {
    alert("Parceria excluída!");
  }

  function handleUpdatePartnership() {
    // PartnershipController.updatePartnership();
    alert("Parceria editada!");
  }

  return (
    <Container>
      <Header />

      <ButtonsContainer>
        <Button type="unfilled" onPress={handleDeletePartnership}>
          Deletar parceria
        </Button>
        <Button onPress={handleUpdatePartnership} style={{ marginVertical: 8 }}>
          Editar informações
        </Button>
      </ButtonsContainer>

      <HistoryContainer>
        <Tabs onChangeTab={tab => setTab(tab)} />

        {tab === 0 ? (
          <History data={annotations} isLoading={isLoading} />
        ) : (
          <MeetingList />
        )}
      </HistoryContainer>
    </Container>
  );
}

interface HistoryProps {
  data?: IComment[];
  isLoading: boolean;
}

function History({ data, isLoading }: HistoryProps) {
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

      {isLoading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        data?.map(card => {
          return (
            <Card
              key={card.id}
              id={card.id}
              type={card.title ? "annotation" : "update"}
              date={formatDate(card.createdAt)}
              time={formatTime(card.createdAt)}
              description={card.comment}
              author={card.userName}
              title={card.title}
            />
          );
        })
      )}
    </>
  );
}

function MeetingList() {
  return <Text>Em breve...</Text>;
}
