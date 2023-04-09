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
import { RouteProp, useRoute } from "@react-navigation/native";
import { IPartnership, IPartnershipEdit } from "@interfaces/partner.interface";
import AnnotationController from "@requests/AnnotationController";
import PartnershipController from "@requests/PartnershipController";
import { formatDate } from "@utils/formatDate";
import { formatTime } from "@utils/formatTime";
import { useEffect, useState } from "react";
import {
  ButtonsContainer,
  ContactView,
  Container,
  HistoryContainer,
  InformationView,
  ListContainer,
  LoadingContainer,
  PartnerInfoView,
} from "./styles";
import { ScrollView, View } from "react-native";
import { PartnershipEdit } from "@screens/PartnershipEdit";
import { RootStackParamList } from "src/shared/types/rootStackParamList";

export function Partnership() {
  const [tab, setTab] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData] = useState<IPartnership>();
  const [isLoading, setIsLoading] = useState(true);
  const [isPartnerDisable, setIsPartnerDisable] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, "Partnership">>();

  const { id } = route.params;

  async function getPartnerships() {
    setIsLoading(true);
    const partnerships = await PartnershipController.getPartnership(id);
    setData(partnerships);
    setIsLoading(false);
  }

  useEffect(() => {
    getPartnerships();
  }, []);

  function handleCloseEditModal() {
    getPartnerships();
    setVisibleModal(false);
  }

  async function handleDeletePartnership() {
    await PartnershipController.deletePartnership(id);
    getPartnerships();
  }

  async function handleUpdatePartnership() {
    setVisibleModal(true);
  }

  return (
    <Container>
      <Header />
      <ScrollView>
        {!data?.disabled ? (
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
        ) : null}
        <PartnerInfoView>
          <View>
            <Text>Informação da parceria</Text>
          </View>
          <InformationView>
            <Text color="#EF4444" size={14} weight="500" numberOfLines={1}>
              {data?.classification} |{" "}
              <Text size={14} weight="500">
                {data?.name}
              </Text>
            </Text>
            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              Status:{" "}
              <Text size={16} weight="400">
                {data?.status}
              </Text>
            </Text>
            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              Quantidade de membros :{" "}
              <Text size={16} weight="400">
                {data?.memberNumber}
              </Text>
            </Text>
            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              Localização:{" "}
              <Text size={16} weight="400">
                {data?.state}
              </Text>
            </Text>
          </InformationView>
          <ContactView>
            <Text color="#000000" weight="500">
              Informações de contato
            </Text>

            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              E-mail:{" "}
              <Text size={16} weight="400">
                {data?.email}{" "}
              </Text>
            </Text>
            <Text color="#999999" size={16} weight="400" numberOfLines={1}>
              Telefone:{" "}
              <Text size={16} weight="400">
                {data?.phoneNumber}
              </Text>
            </Text>
          </ContactView>
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
              Essa parceria foi deletada e, portanto, não pode ser modificada.
            </Text>
          ) : null}

          {data && (
            <PartnershipEdit
              visible={visibleModal}
              onClose={() => setVisibleModal(false)}
              closeAfterUpdate={() => handleCloseEditModal()}
              partnerProps={data}
            />
          )}
        </PartnerInfoView>

        <HistoryContainer>
          <Tabs onChangeTab={tab => setTab(tab)} />
          {tab === 0 ? (
            <History isDisabled={isLoading || (data?.disabled ?? false)} />
          ) : (
            <MeetingList />
          )}
        </HistoryContainer>
      </ScrollView>
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
  const route = useRoute<RouteProp<RootStackParamList, "Partnership">>();

  const { id } = route.params;

  async function getData() {
    setIsLoading(true);
    const comments = await AnnotationController.getAnnotations(id);
    setAnnotations(comments);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [id]);

  async function handleAddComment() {
    setIsLoading(true);
    await AnnotationController.createAnnotation(id, newComment);
    const updatedComments = await AnnotationController.getAnnotations(id);
    updatedComments && setAnnotations(updatedComments);
    setNewComment("");
    setIsLoading(false);
  }

  async function handleEditComment() {
    setIsLoading(true);
    await AnnotationController.updateAnnotation(
      modalComment?.id ?? "",
      id,
      editedComment,
    );
    const updatedComments = await AnnotationController.getAnnotations(id);
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
