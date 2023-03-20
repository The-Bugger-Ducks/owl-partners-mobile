import { Button, Close, Drop, Text } from "@components";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { Container, DropDowArea, StatusTypeText, StatusView, TextInput } from "./styles";
import { useForm, Controller } from 'react-hook-form'
import { useState } from "react";



type formDataPorps = {
    partner: string;
    classification: string;
    location: string;
    adress: string;
    members_number: string;
    email: string;
    status: [];

}


interface ModalProps {
    visible: boolean;
    onClose: () => void;
}


const data = [
    { id: 1, description: "Em prospecção" },
    { id: 2, description: "Primeiro contato feito" },
    { id: 3, description: "Primeira reunião marcada/realizada" },
    { id: 4, description: "Documentação enviada/em análise (Parceiro)" },
    { id: 5, description: "Documentação devolvida (Academy)" },
    { id: 6, description: "Documentação devolvida (Legal)" },
    { id: 7, description: "Documentação Analisada e devolvida (Parceiro)" },
    { id: 8, description: "Preparação de Executive Sumary (Academy)" },
    { id: 9, description: "ES em analise (Legal)" },
    { id: 10, description: "ES em analise (Academy Global)" },
    { id: 11, description: "Pronto para assinatura, Parceria Firmada" }
]


export function PartnershipForm({ visible, onClose }: ModalProps) {




    const { control, handleSubmit, formState: { errors } } = useForm<formDataPorps>()
    const [selectStatus, setSelecteStatus] = useState('Status')
    const [isClicked, setIsClicked] = useState(false)


    function hendlerPartnershitForm(data: formDataPorps) {
        console.log(data);
        onClose(false)
        
    }

    function toggleStatusPartnerDropDown() {
        setIsClicked(!isClicked)
    }

    function handlerStatusPartenerSelected(data: { description: string }) {
        setSelecteStatus(data.description)
        setIsClicked(false)

    }




    return (


        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            transparent

        >
            <Container>
                <View style={{ justifyContent: "space-between", flexDirection: "row", gap: 140.25, marginBottom: 24 }}>
                    <Text>Adicionar nova parceria</Text>

                    <TouchableOpacity onPress={onClose}>
                        <Close color="#666666" />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{ gap: 12 }}>
                        <Text weight="500">Informações gerais</Text>

                        <Controller
                            control={control}
                            name="partner"
                            rules={{
                                required: 'informe o nome do parceiro'
                            }}
                            render={({ field: { onChange } }) => (
                                <View>
                                    <Text>Parceria</Text>
                                    <TextInput
                                        placeholder="The Bugger Ducks"
                                        onChangeText={onChange}
                                    />
                                    {errors.partner && <Text>Este campo é obrigatório</Text>}
                                </View>
                            )}
                        />


                        <Controller
                            control={control}
                            name="classification"
                            render={({ field: { onChange } }) => (
                                <View>
                                    <Text>Classificação </Text>
                                    <TextInput placeholder="Universidade" onChangeText={onChange} />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="location"
                            render={({ field: { onChange } }) => (
                                <View>
                                    <Text>Localização</Text>
                                    <TextInput placeholder="São Paulo, Brasil" onChangeText={onChange} />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="adress"
                            render={({ field: { onChange } }) => (
                                <View>
                                    <Text>Endereço</Text>
                                    <TextInput placeholder="Rua 21, 123" onChangeText={onChange} />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="members_number"
                            render={({ field: { onChange } }) => (
                                <View>
                                    <Text>Número de membros</Text>
                                    <TextInput placeholder="100" onChangeText={onChange} />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange } }) => (

                                <View>
                                    <Text>E-mail</Text>
                                    <TextInput placeholder="nome@gmail.com" onChangeText={onChange} />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="status"
                            rules={{
                                required: 'informe o status da parceria'
                            }}
                            render={({ field: { onChange } }) => (
                                <View>
                                    <Text>Status</Text>
                                    <TouchableOpacity
                                        onPress={() => { toggleStatusPartnerDropDown()}}
                                        
                                    >

                                        <StatusView  style={{ justifyContent: "space-between", flexDirection: "row", gap: 140.25 }}>
                                            <Text>{selectStatus}</Text>
                                            <Drop />
                                        </StatusView>

                                    </TouchableOpacity>

                                    {isClicked ?
                                        <DropDowArea>
                                            {data.map((status) => {
                                                return (
                                                    <TouchableOpacity key={status.id} style={{}}>

                                                        <StatusTypeText onPress={() => { handlerStatusPartenerSelected(status), onChange(status.description)}}>
                                                            {status.description}
                                                        </StatusTypeText>
                                                    </TouchableOpacity>
                                                )
                                            })}

                                        </DropDowArea>
                                        : null}

                                    {errors.partner && <Text>Este campo é obrigatório</Text>}
                                </View>
                            )}
                        />


                    </View>
                </ScrollView>

                <View style={{ padding: 20 }}>
                    <Button type="filled" onPress={handleSubmit(hendlerPartnershitForm)}>
                        Adicionar parceria
                    </Button>
                </View>

            </Container>

        </Modal>


    )
} 