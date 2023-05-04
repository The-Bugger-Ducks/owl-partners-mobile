export interface IPartnership {
  id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  zipCode?: string;
  state: string;
  city: string;
  neighborhood?: string;
  address?: string;
  classification: string;
  status: string;
  memberNumber: number;
  disabled?: boolean;
}

export interface IPartnershipEdit {
  name: string;
  email: string;
  phoneNumber: string;
  zipCode?: string;
  state: string;
  city: string;
  neighborhood?: string;
  address?: string;
  classification: string;
  status: string;
  memberNumber: number;
}

export interface IModalPropsEdit {
  visible: boolean;
  onClose: () => void;
  closeAfterUpdate: () => void;
  partnerProps: IPartnership;
}

export interface IModalPropsForm {
  visible: boolean;
  onClose: () => void;
  closeAfterUpdate: () => void;
}

export enum PartnerStatus {
  EmProspeccao = "Em prospecção",
  PrimeiroContatoFeito = "Primeiro contato feito",
  PrimeiraReuniaoMarcadaRealizada = "Primeira reunião marcada/realizada",
  DocumentacaoEnviadaEmAnalise_Parceiro = "Documentação enviada/em análise (Parceiro)",
  DocumentacaoDevolvida_EmAnaliseAcademy = "Documentação devolvida (Academy)",
  DocumentacaoDevolvida_EmAnaliseLegal = "Documentação devolvida (Legal)",
  DocumentacaoAnalisadaDevolvida_Parceiro = "Documentação Analisada e devolvida (Parceiro)",
  EmPreparacaoDeExecutiveSummary_Academy = "Preparação de Executive Sumary (Academy)",
  ESEmAnalise_Legal = "ES em analise (Legal)",
  ESEmAnaliseAcademy_Global = "ES em analise (Academy Global)",
  ProntoParaAssinatura = "Pronto para assinatura",
  ParceriaFirmada = "Parceria Firmada",
}
