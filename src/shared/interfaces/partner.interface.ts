export interface IPartnership {
  id: string;
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
  disabled: boolean;
}

export interface IPartnershipEdit {
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
