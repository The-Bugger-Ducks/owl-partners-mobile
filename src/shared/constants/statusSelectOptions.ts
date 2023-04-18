type Status = {
  id: number;
  description: string;
  value: string;
};

export const statusSelectOptions: Status[] = [
  { id: 1, description: "Em prospecção", value: "EmProspeccao" },
  {
    id: 2,
    description: "Primeiro contato feito",
    value: "PrimeiroContatoFeito",
  },
  {
    id: 3,
    description: "Primeira reunião marcada/realizada",
    value: "PrimeiraReuniaoMarcadaRealizada",
  },
  {
    id: 4,
    description: "Documentação enviada/em análise (Parceiro)",
    value: "DocumentacaoEnviadaEmAnalise_Parceiro",
  },
  {
    id: 5,
    description: "Documentação devolvida (Academy)",
    value: "DocumentacaoDevolvida_EmAnaliseAcademy",
  },
  {
    id: 6,
    description: "Documentação devolvida (Legal)",
    value: "DocumentacaoDevolvida_EmAnaliseLegal",
  },
  {
    id: 7,
    description: "Documentação Analisada e devolvida (Parceiro)",
    value: "DocumentacaoAnalisadaDevolvida_Parceiro",
  },
  {
    id: 8,
    description: "Preparação de Executive Sumary (Academy)",
    value: "EmPreparacaoDeExecutiveSummary_Academy",
  },
  { id: 9, description: "ES em analise (Legal)", value: "ESEmAnalise_Legal" },
  {
    id: 10,
    description: "ES em analise (Academy Global)",
    value: "ESEmAnaliseAcademy_Global",
  },
  {
    id: 11,
    description: "Pronto para assinatura",
    value: "ProntoParaAssinatura",
  },
  { id: 12, description: "Parceria Firmada", value: "ParceriaFirmada" },
];
