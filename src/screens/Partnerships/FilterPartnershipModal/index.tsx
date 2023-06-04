import { useState } from "react";

import { Icon, Modal, Text } from "@components";
import { statusSelectOptions } from "@constants";
import { PartnerStatus } from "@interfaces/partner.interface";

import { Container, OptionButton } from "./styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  onFilter: (status: PartnerStatus | null) => void;
}

export function FilterPartnershipModal({ visible, onClose, onFilter }: Props) {
  const [optionSelected, setOptionSelected] = useState<PartnerStatus | null>(
    null,
  );

  return (
    <Modal
      title="Selecione um status"
      visible={visible}
      onClose={onClose}
      buttonTitle="Filtrar"
      onPressButton={() => {
        onFilter(optionSelected);
        onClose();
      }}
      content={
        <Container>
          {statusSelectOptions.map((status, key) => (
            <OptionButton
              key={key}
              onPress={() => {
                if (status.value === optionSelected) {
                  return setOptionSelected(null);
                }
                setOptionSelected(status.value as PartnerStatus);
              }}
            >
              {optionSelected === status.value ? (
                <Icon icon="check" />
              ) : (
                <Icon icon="circle" />
              )}

              <Text
                weight={optionSelected === status.value ? "500" : "400"}
                size={13}
              >
                {status.description}
              </Text>
            </OptionButton>
          ))}
        </Container>
      }
    />
  );
}
