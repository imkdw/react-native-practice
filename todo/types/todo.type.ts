import { TODO_FILTERS, TODO_STATUS } from "@/constants/todo.const";

export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];

export type TodoFilter = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];

export type TodoFilterItem = {
  key: TodoFilter;
  label: string;
};
