import { Card, Input, Loading, Modal, Text } from "@components";
import { RootStackParamList } from "@custom-types/rootStackParamList";
import { IComment } from "@interfaces/annotation.interface";
import { RouteProp, useRoute } from "@react-navigation/native";
import annotationRequests from "@requests/annotation.requests";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

interface AnnotationsListyProps {
  isPartnershipDisabled: boolean;
}

export function AnnotationsList({
  isPartnershipDisabled,
}: AnnotationsListyProps) {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [annotations, setAnnotations] = useState<IComment[]>();
  const [modalComment, setModalComment] = useState<IComment>();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const route = useRoute<RouteProp<RootStackParamList, "Partnership">>();

  const { id } = route.params;

  async function getData() {
    setIsLoading(true);
    const comments = await annotationRequests.getAnnotations(id);
    setAnnotations(comments);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [id]);

  async function handleAddComment() {
    setIsLoading(true);
    await annotationRequests.createAnnotation(id, newComment);
    const updatedComments = await annotationRequests.getAnnotations(id);
    updatedComments && setAnnotations(updatedComments);
    setNewComment("");
    setIsLoading(false);
  }

  async function handleEditComment() {
    setIsLoading(true);
    await annotationRequests.updateAnnotation(
      modalComment?.id ?? "",
      id,
      editedComment,
    );
    const updatedComments = await annotationRequests.getAnnotations(id);
    updatedComments && setAnnotations(updatedComments);
    setEditedComment("");
    setIsLoading(false);
    setIsEditCommentModalOpen(false);
  }

  return (
    <ScrollView scrollEnabled>
      {!isPartnershipDisabled && (
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
        <View style={{ marginTop: 24 }}>
          <Loading />
        </View>
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

              isDisabled={isPartnershipDisabled}
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
    </ScrollView>
  );
}
