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
  ListContainer,
  LoadingContainer,
} from "./styles";

export function Partnership() {
  const [tab, setTab] = useState(0);

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

        {tab === 0 ? <History /> : <MeetingList />}
      </HistoryContainer>
    </Container>
  );
}

function History() {
  const [newComment, setNewComment] = useState("");
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

  async function handleAddComment() {
    setIsLoading(true);
    await AnnotationController.createAnnotation(
      "baadc558-2791-4f9a-8d1e-e01a0a92b432",
      newComment,
    );
    const updatedComments = await AnnotationController.getAnnotations(
      "baadc558-2791-4f9a-8d1e-e01a0a92b432",
    );
    updatedComments && setAnnotations(updatedComments);
    setNewComment("");
    setIsLoading(false);
  }

  return (
    <ListContainer scrollEnabled>
      <Input
        label={"Inserir atualização"}
        placeholder={"Nova atualização sobre a parceria..."}
        value={newComment}
        onChangeText={text => setNewComment(text)}
        hasOutIcon
        onPressIcon={handleAddComment}
      />

      <Text size={14} color={"#666666"} style={{ marginVertical: 16 }}>
        Todas as atualizações e anotações
      </Text>

      {isLoading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        annotations?.map(card => {
          return (
            <Card
              key={card.id}
              id={card.id}
              type={card.title ? "annotation" : "update"}
              date={formatDate(card.createdAt)}
              time={formatTime(card.createdAt)}
              description={card.comment}
              author={`${card.User.name} ${card.User.lastName}`}
              title={card.title}
            />
          );
        })
      )}
    </ListContainer>
  );
}

function MeetingList() {
  return <Text>Em breve...</Text>;
}
