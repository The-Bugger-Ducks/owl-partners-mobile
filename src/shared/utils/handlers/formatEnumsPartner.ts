import { IPartnership, PartnerStatus } from "@interfaces/partner.interface";

function getPartnerStatusEnumByKey(status: PartnerStatus) {
  const findStatus = Object.entries(PartnerStatus).find(
    ([key, _]) => key === status,
  );

  if (findStatus) {
    const [statusKey, statusValue] = findStatus;
    return { statusKey, statusValue };
  }

  return null;
}

function getPartnerStatusEnumByValue(
  status: string,
): { statusKey: string; statusValue: string } | null {
  const findStatus = Object.entries(PartnerStatus).find(
    ([_, value]) => value === status,
  );

  if (findStatus) {
    const [statusKey, statusValue] = findStatus;
    return { statusKey, statusValue };
  }

  return null;
}

function formatStatus(partner: IPartnership): IPartnership {
  const findStatusValue = getPartnerStatusEnumByKey(
    partner.status as PartnerStatus,
  )?.statusValue;

  if (findStatusValue) {
    partner.status = findStatusValue;
  }

  return partner;
}

function formatPartnerStatusByList(partners: IPartnership[]) {
  return partners.map(partner => formatStatus(partner)) ?? [];
}

export {
  formatPartnerStatusByList,
  formatStatus,
  getPartnerStatusEnumByKey,
  getPartnerStatusEnumByValue,
};
