import styled from "styled-components/native";

export const Container = styled.View`
  padding: 24px;
  gap: 8px;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EditIcon = styled.TouchableOpacity``;

export const Comment = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const MeetingDetails = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
