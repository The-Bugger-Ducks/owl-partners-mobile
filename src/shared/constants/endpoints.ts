export enum USER_ENDPOINTS {
  USER_LOGIN = "/auth/login",
  CREATE = "/users/",
  LIST = "/users",
  DELETE = "/users/",
  UPDATE = "/users/",
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
  COMMENTS = "/meetings/comment/",
  ADD_COMMENT = "/meetings/comment",
  UPDATE_COMMENT = "/meetings/comment/",
  BY_PARTNER = "/meetings/partner/",
}
