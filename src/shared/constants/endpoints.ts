export enum USER_ENDPOINTS {
  USER_LOGIN = "/auth/login",
}

export enum PARTNERSHIP_ENDPOINTS {
  CREATE_PARTNERSHIP = "/partners",
  LIST_PARTNERSHIP = "/partners/search",

  CREATE = "/partners",
  LIST = "/partners/search",
  DETAILS = "/partners/",
  EDIT = "/partners/",
  DELETE = "/partners/",
}

export enum ANNOTATION_ENDPOINTS {
  CREATE = "/partners/comment",
  LIST = "/partners/comment/",
  EDIT = "/partners/comment/",
}

export enum MEETING_ENDPOINTS {
  CREATE = "/meetings",
  LIST = "/meetings",
  DETAILS = "/meetings/",
  EDIT = "/meetings/",
  DELETE = "/meetings/",
  COMMENTS = "/meetings/",
  ADD_COMMENT = "/meetings/",
  UPDATE_COMMENT = "/meetings/",
  BY_PARTNER = "/meetings/partner/",
}
