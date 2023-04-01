import { useState } from "react";
import { Text } from "../Text";
import { Container, Tab } from "./styles";

interface TabsProps {
  tabHeaders?: string[];
  onChangeTab: (currentTab: number) => void;
}

export function Tabs({
  tabHeaders = ["Histórico", "Reuniões"],
  onChangeTab,
}: TabsProps) {
  const [currentTab, setCurrentTab] = useState(0);

  function handleChangeTab(tabIndex: number) {
    setCurrentTab(tabIndex);
    onChangeTab(tabIndex);
  }

  return (
    <Container>
      {tabHeaders.map((tab, index) => {
        const isActive = currentTab === index;
        return (
          <Tab
            key={index}
            onPress={() => handleChangeTab(index)}
            isActive={isActive}
            activeOpacity={0.7}
          >
            <Text
              size={14}
              weight="500"
              color={isActive ? "#EF4444" : "#666666"}
            >
              {tab}
            </Text>
          </Tab>
        );
      })}
    </Container>
  );
}
