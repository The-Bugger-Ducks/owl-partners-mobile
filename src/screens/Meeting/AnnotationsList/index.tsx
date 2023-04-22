import { Card, Input, Loading, Modal, Text } from "@components";
import { IComment } from "@interfaces/annotation.interface";
import meetingRequest from "@requests/meeting.request";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import StorageController from "@utils/handlers/StorageController";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

interface AnnotationsListProps {
  data?: IComment[];
  meetingId: string;
}

export function AnnotationsList({ data, meetingId }: AnnotationsListProps) {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [annotations, setAnnotations] = useState<IComment[]>(data ?? []);
  const [modalComment, setModalComment] = useState<IComment>();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  const [editedComment, setEditedComment] = useState("");

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
    const user = await StorageController.getUserInfo();
    if (user)
      await meetingRequest.createMeetingComment(
        meetingId,
        newComment,
        user?.id,
      );

    const updatedComments = await meetingRequest.getMeetingComments(meetingId);
    updatedComments && setAnnotations(updatedComments);
    setNewComment("");
    setIsLoading(false);
  }

  async function handleEditComment() {
    setIsLoading(true);
    await meetingRequest.updateMeetingComment(editedComment, modalComment!.id);
    const updatedComments = await meetingRequest.getMeetingComments(meetingId);
    updatedComments && setAnnotations(updatedComments);
    setEditedComment("");
    setIsLoading(false);
    setIsEditCommentModalOpen(false);
  }

  return (
    <ScrollView scrollEnabled>
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
        <View style={{ marginTop: 24 }}>
          <Loading />
        </View>
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
              canEdit={true}
              type={"annotation"}
              date={formatDate(isEdited ? card.updatedAt : card.createdAt)}
              time={formatTime(isEdited ? card.updatedAt : card.createdAt)}
              description={card.comment}
              author={`${card.User.name} ${card.User.lastName}`}
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
    </ScrollView>
  );
}
