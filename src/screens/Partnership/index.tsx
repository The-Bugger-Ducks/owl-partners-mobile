import {
  Button,
  Card,
  Header,
  Input,
  Loading,
  Modal,
  Tabs,
  Text,
} from "@components";
import { IComment } from "@interfaces/annotation.interface";
import { IPartnership } from "@interfaces/partner.interface";
import { useRoute } from "@react-navigation/native";
import AnnotationController from "@requests/AnnotationController";
import PartnershipController from "@requests/PartnershipController";
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
  const [data, setData] = useState<IPartnership>();
  const [isLoading, setIsLoading] = useState(true);
  const {
    params: { partnershipId },
  } = useRoute<
    Readonly<{
      key: string;
      name: string;
      params: { partnershipId: string };
    }>
  >();

  async function getData() {
    setIsLoading(true);
    const partnershipData = await PartnershipController.getPartnership(
      partnershipId,
    );
    setData(partnershipData);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [partnershipId]);

  async function handleDeletePartnership() {
    await PartnershipController.deletePartnership(partnershipId);
  }

  function handleUpdatePartnership() {
    // PartnershipController.updatePartnership();
    alert("Parceria editada!");
  }

  return (
    <Container>
      <Header />

      {data?.disabled ? (
        <Text
          size={12}
          weight="500"
          style={{
            padding: 24,
            margin: 24,
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
          }}
        >
          Essa parceria foi deletada e, portanto, não pode ser atualizada.
        </Text>
      ) : (
        <ButtonsContainer>
          <Button type="unfilled" onPress={handleDeletePartnership}>
            Deletar parceria
          </Button>
          <Button
            onPress={handleUpdatePartnership}
            style={{ marginVertical: 8 }}
          >
            Editar informações
          </Button>
        </ButtonsContainer>
      )}

      <HistoryContainer>
        <Tabs onChangeTab={tab => setTab(tab)} />

        {tab === 0 ? (
          <History isDisabled={isLoading || (data?.disabled ?? false)} />
        ) : (
          <MeetingList />
        )}
      </HistoryContainer>
    </Container>
  );
}

interface HistoryProps {
  isDisabled: boolean;
}

function History({ isDisabled }: HistoryProps) {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [annotations, setAnnotations] = useState<IComment[]>();
  const [modalComment, setModalComment] = useState<IComment>();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const {
    params: { partnershipId },
  } =
    useRoute<
      Readonly<{ key: string; name: string; params: { partnershipId: string } }>
    >();

  async function getData() {
    setIsLoading(true);
    const comments = await AnnotationController.getAnnotations(partnershipId);
    setAnnotations(comments);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [partnershipId]);

  async function handleAddComment() {
    setIsLoading(true);
    await AnnotationController.createAnnotation(partnershipId, newComment);
    const updatedComments = await AnnotationController.getAnnotations(
      partnershipId,
    );
    updatedComments && setAnnotations(updatedComments);
    setNewComment("");
    setIsLoading(false);
  }

  async function handleEditComment() {
    setIsLoading(true);
    await AnnotationController.updateAnnotation(
      modalComment?.id ?? "",
      partnershipId,
      editedComment,
    );
    const updatedComments = await AnnotationController.getAnnotations(
      partnershipId,
    );
    updatedComments && setAnnotations(updatedComments);
    setEditedComment("");
    setIsLoading(false);
    setIsEditCommentModalOpen(false);
  }

  return (
    <ListContainer scrollEnabled>
      {!isDisabled && (
        <Input
          label={"Inserir atualização"}
          placeholder={"Nova atualização sobre a parceria..."}
          value={newComment}
          onChangeText={text => setNewComment(text)}
          hasOutIcon
          onPressIcon={handleAddComment}
        />
      )}

      <Text size={14} color={"#666666"} style={{ marginVertical: 16 }}>
        Todas as atualizações e anotações
      </Text>

      {isLoading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : annotations?.length === 0 ? (
        <Text
          size={14}
          color={"#999999"}
          style={{ textAlign: "center", marginVertical: 24 }}
        >
          Sem atualizações ou anotações
        </Text>
      ) : (
        annotations?.map(card => {
          const isEdited = card.createdAt != card.updatedAt;

          return (
            <Card
              key={card.id}
              id={card.id}
              type={card.title ? "annotation" : "update"}
              date={formatDate(isEdited ? card.updatedAt : card.createdAt)}
              time={formatTime(isEdited ? card.updatedAt : card.createdAt)}
              description={card.comment}
              author={`${card.User.name} ${card.User.lastName}`}
              title={card.title}
              onPress={() => {
                setModalComment(card);
                setIsCommentModalOpen(true);
              }}
              onEdit={() => {
                setModalComment(card);
                setEditedComment(card.comment);
                setIsEditCommentModalOpen(true);
              }}
            />
          );
        })
      )}

      <Modal
        visible={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        title={`Autor(a): ${modalComment?.User.name}`}
        content={<Text>{modalComment?.comment}</Text>}
      />

      <Modal
        visible={isEditCommentModalOpen}
        onClose={() => setIsEditCommentModalOpen(false)}
        title={"Editar comentário"}
        buttonTitle="Editar comentário"
        onPressButton={handleEditComment}
        isLoading={isLoading}
        content={
          <Input
            value={editedComment}
            onChangeText={text => setEditedComment(text)}
          />
        }
      />
    </ListContainer>
  );
}

function MeetingList() {
  return <Text>Em breve...</Text>;
}
