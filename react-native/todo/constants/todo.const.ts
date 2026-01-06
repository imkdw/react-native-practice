export const TODO_STATUS = {
  DONE: "DONE",
  IN_PROGRESS: "IN_PROGRESS",
} as const;

export const TODO_FILTERS = {
  ALL: "ALL",
  ...TODO_STATUS,
} as const;
