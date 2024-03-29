import { Icon } from "../Icon";
import { Text } from "../Text";
import { Comment, Container, EditIcon, MeetingDetails, Title } from "./styles";

interface CardProps {
  id: string;
  type: "annotation" | "update" | "meeting";
  date: string;
  time: string;
  partner?: string;
  title?: string;
  description?: string;
  edit?: boolean;
  author?: string;
  onPress?: () => void;
  onEdit?: () => void;
  canEdit: boolean;
  isEdited?: boolean;
}

export function Card({
  id,
  type,
  date,
  time,
  partner,
  title,
  description,
  edit = true,
  author,
  onPress,
  onEdit,
  canEdit,
  isEdited = false,
}: CardProps) {
  const props: SpecificCardProps["props"] = {
    id,
    date,
    time,
    partner,
    title,
    description,
    edit,
    author,
    onPress,
    onEdit,
    canEdit,
    isEdited,
  };

  if (type === "annotation") return <Anotation props={props} />;
  if (type === "update") return <Update props={props} />;
  return <Meeting props={props} />;
}

export interface SpecificCardProps {
  props: {
    id: string;
    date: string;
    time: string;
    partner?: string;
    title?: string;
    description?: string;
    edit?: boolean;
    author?: string;
    onPress?: () => void;
    onEdit?: () => void;
    canEdit: boolean;
    isEdited?: boolean;
  };
}

function Update({ props }: SpecificCardProps) {
  return (
    <Container onPress={props.onPress} activeOpacity={0.7}>
      <Title>
        <Text color="#000000" size={12} weight="500">
          Atualização | {props.date}, {props.time}
        </Text>
        {props.canEdit && (
          <EditIcon onPress={props.onEdit}>
            <Icon icon="edit" />
          </EditIcon>
        )}
      </Title>
      <Text color="#999999" size={12} numberOfLines={1}>
        {props.description}
      </Text>
      <Comment>
        <Text size={12}>Comentado por {props.author}</Text>
      </Comment>
    </Container>
  );
}

function Anotation({ props }: SpecificCardProps) {
  return (
    <Container onPress={props.onPress} activeOpacity={0.7}>
      <Title>
        <Text color="#000000" size={12} weight="500">
          Anotação | {props.date}, {props.time}{" "}
          {props.isEdited && (
            <Text color="#999999" size={12} weight="500">
              (editado)
            </Text>
          )}
        </Text>
        {props.canEdit && (
          <EditIcon onPress={props.onEdit}>
            <Icon icon="edit" />
          </EditIcon>
        )}
      </Title>
      {props.title && <Text size={14}>{props.title}</Text>}
      <Text color="#999999" size={12} numberOfLines={1}>
        {props.description}
      </Text>
      <Comment>
        <Text size={12}>Criado por {props.author}</Text>
      </Comment>
    </Container>
  );
}

function Meeting({ props }: SpecificCardProps) {
  return (
    <Container onPress={props.onPress} activeOpacity={0.7}>
      <Title>
        <Text color="#000000" size={12} weight="500">
          {props.date} | {props.partner}
        </Text>
        {props.canEdit && (
          <EditIcon onPress={props.onEdit}>
            <Icon icon="edit" />
          </EditIcon>
        )}
      </Title>
      <MeetingDetails>
        <Text color="#999999" size={14}>
          {props.time}
        </Text>
        <Text size={14} numberOfLines={1}>
          {props.title}
        </Text>
      </MeetingDetails>
    </Container>
  );
}
