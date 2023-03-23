import { Edit } from "../Icons/Edit";
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
  };
}

function Update({ props }: SpecificCardProps) {
  return (
    <Container>
      <Title>
        <Text color="#000000" size={12} weight="500">
          Atualização | {props.date}, {props.time}
        </Text>
        <EditIcon>
          <Edit />
        </EditIcon>
      </Title>
      <Text color="#999999" size={12} numberOfLines={1}>
        {props.description}
      </Text>
      <Comment>
        <Text color="#333333" size={12}>
          Comentado por {props.author}
        </Text>
      </Comment>
    </Container>
  );
}

function Anotation({ props }: SpecificCardProps) {
  return (
    <Container>
      <Title>
        <Text color="#000000" size={12} weight="500">
          Anotação | {props.date}, {props.time}
        </Text>
        <EditIcon>
          <Edit />
        </EditIcon>
      </Title>
      <Text color="#333333" size={14}>
        {props.title}
      </Text>
      <Text color="#999999" size={12} numberOfLines={1}>
        {props.description}
      </Text>
      <Comment>
        <Text color="#333333" size={12}>
          Criado por {props.author}
        </Text>
      </Comment>
    </Container>
  );
}

function Meeting({ props }: SpecificCardProps) {
  return (
    <Container>
      <Title>
        <Text color="#000000" size={12} weight="500">
          {props.date} | {props.partner}
        </Text>
        <EditIcon>
          <Edit />
        </EditIcon>
      </Title>
      <MeetingDetails>
        <Text color="#999999" size={14}>
          {props.time}
        </Text>
        <Text color="#333333" size={14} numberOfLines={1}>
          {props.title}
        </Text>
      </MeetingDetails>
    </Container>
  );
}
