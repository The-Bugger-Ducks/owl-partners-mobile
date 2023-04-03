import { isAndroid } from "@utils/checkPlatform";
import { ReactNode } from "react";
import { Modal as ReactNativeModal, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Loading } from "../Loading";
import { Text } from "../Text";
import { Container, Footer, Header, Overlay } from "./styles";

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
            <Text size={16} weight="500">
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666666" />
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
