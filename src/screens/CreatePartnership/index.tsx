import { Button, Header, Text } from "@components";
import { PartnershipForm } from "@screens/PartnershipForm";
import { useState } from "react";
import { Container, ButtonView, SearchView } from "./styles";


export function CreatePartnership() {

    const [visibleModal, setVisibleModal] = useState(false);
    return (
        <Container>
            <Header isHero={true} />

            <ButtonView>
                <Button type="unfilled" onPress={() => setVisibleModal(true)}>
                    Adicionar nova parceria
                </Button>
            </ButtonView>

            <SearchView>
                <Text>Parcerias encontradas</Text>
            </SearchView>

            <PartnershipForm visible={visibleModal} onClose={() => setVisibleModal(false)}/>
        </Container>

    );
} 