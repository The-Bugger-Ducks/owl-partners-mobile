export interface CreatePartnerProps {
  name: string;
  email: string;
  phoneNumber: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  classification: string;
  status: string;
  memberNumber: number;
}

export interface IPartner {
  name: string;
  email: string;
  phoneNumber: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  classification: string;
  status: string;
  memberNumber: number;
  id: string;
}
