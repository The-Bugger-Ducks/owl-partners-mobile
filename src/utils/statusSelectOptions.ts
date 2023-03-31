type Status = {
  id: number;
  description: string;
};

export const statusSelectOptions: Status[] = [
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
  { id: 11, description: "Pronto para assinatura" },
  { id: 12, description: "Parceria Firmada" },
];
