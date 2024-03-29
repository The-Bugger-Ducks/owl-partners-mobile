import { isAndroid } from "@constants";
import { ReactNode } from "react";
import { Modal as ReactNativeModal, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import { Loading } from "../Loading";
import { Text } from "../Text";
import { Container, Footer, Header, Overlay } from "./styles";
import { Icon } from "../Icon";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  buttonTitle?: string;
  onPressButton?: () => void;
  isLoading?: boolean;
}

export function Modal({
  visible,
  onClose,
  title,
  content,
  buttonTitle,
  onPressButton,
  isLoading = false,
}: ModalProps) {
  return (
    <ReactNativeModal
      visible={visible}
      animationType={buttonTitle ? "slide" : "fade"}
      onRequestClose={onClose}
      transparent
    >
      <Overlay
        behavior={isAndroid ? "height" : "padding"}
        isBottom={buttonTitle ? true : false}
      >
        <Container>
          <Header>
            <Text weight="500">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon icon="close" color="#666666" />
            </TouchableOpacity>
          </Header>
          {content}

          {buttonTitle && (
            <Footer>
              {isLoading ? (
                <Loading />
              ) : (
                <Button type="filled" onPress={onPressButton}>
                  {buttonTitle}
                </Button>
              )}
            </Footer>
          )}
        </Container>
      </Overlay>
    </ReactNativeModal>
  );
}
