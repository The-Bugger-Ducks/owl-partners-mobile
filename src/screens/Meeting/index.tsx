import { Button, Card, Header, Input, Loading, Modal, Text } from "@components";
import { IComment } from "@interfaces/annotation.interface";
import { IMeeting } from "@interfaces/meeting.interface";
import { useRoute } from "@react-navigation/native";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import meetingRequest from "src/shared/services/meeting.request";
import {
  AnnotationsListContainer,
  ButtonsContainer,
  Container,
  ListContainer,
  LoadingContainer,
} from "./styles";

export function Meeting() {
  const [data, setData] = useState<IMeeting>();
  const [isLoading, setIsLoading] = useState(true);
  const [updatedMeeting, setUpdatedMeeting] = useState<IMeeting>();
  const {
    params: { meetingId },
  } = useRoute<
    Readonly<{
      key: string;
      name: string;
      params: { meetingId: string };
    }>
  >();

  async function getData() {
    setIsLoading(true);
    const meetingData = await meetingRequest.getMeeting(meetingId);
    setData(meetingData);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [meetingId]);

  async function handleDeleteMeeting() {
    await meetingRequest.deleteMeeting(meetingId);
  }

  async function handleUpdateMeeting() {
    await meetingRequest.updateMeeting(updatedMeeting!);
  }

  return (
    <Container>
      <Header />
      <ButtonsContainer>
        <Button type="unfilled" onPress={handleDeleteMeeting}>
          Deletar reunião
        </Button>
        <Button onPress={handleUpdateMeeting} style={{ marginVertical: 8 }}>
          Editar reunião
        </Button>
      </ButtonsContainer>

      <AnnotationsListContainer>
        <AnnotationsList data={data?.comments} />
      </AnnotationsListContainer>
    </Container>
  );
}

interface AnnotationsListProps {
  data?: IComment[];
}

function AnnotationsList({ data }: AnnotationsListProps) {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [annotations, setAnnotations] = useState<IComment[]>(data ?? []);
  const [modalComment, setModalComment] = useState<IComment>();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const {
    params: { meetingId },
  } =
    useRoute<
      Readonly<{ key: string; name: string; params: { meetingId: string } }>
    >();

  async function getData() {
    setIsLoading(true);
    const comments = await meetingRequest.getMeetingComments(meetingId);
    setAnnotations(comments);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [meetingId]);

  async function handleAddComment() {
    setIsLoading(true);
    await meetingRequest.createMeetingComment(meetingId, newComment);
    const updatedComments = await meetingRequest.getMeetingComments(meetingId);
    updatedComments && setAnnotations(updatedComments);
    setNewComment("");
    setIsLoading(false);
  }

  async function handleEditComment() {
    setIsLoading(true);
    await meetingRequest.updateMeetingComment(modalComment!);
    const updatedComments = await meetingRequest.getMeetingComments(meetingId);
    updatedComments && setAnnotations(updatedComments);
    setEditedComment("");
    setIsLoading(false);
    setIsEditCommentModalOpen(false);
  }

  return (
    <ListContainer scrollEnabled>
      <Input
        label={"Inserir anotação"}
        placeholder={"Nova anotação em reunião..."}
        value={newComment}
        onChangeText={text => setNewComment(text)}
        hasOutIcon
        onPressIcon={handleAddComment}
      />

      <Text size={14} color={"#666666"} style={{ marginVertical: 16 }}>
        Lista de anotações
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
          Sem anotações
        </Text>
      ) : (
        annotations?.map(card => {
          const isEdited = card.createdAt != card.updatedAt;

          return (
            <Card
              key={card.id}
              id={card.id}
              type={"annotation"}
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
        title={"Editar anotação"}
        buttonTitle="Editar anotação"
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
