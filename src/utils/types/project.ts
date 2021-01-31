import {Task} from "./task";

export type Project = {
  readonly name: string,
  readonly createdAt: string,
  readonly deletedAt: string,
  readonly id: string,
  readonly tasks: Task[]
}
