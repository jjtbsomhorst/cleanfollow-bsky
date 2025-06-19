import { RepoStatus } from "./RepoStatus.tsx";

export enum RepoStatusLabel {
  BLOCKEDBY = "Blocked By",
  BLOCKING = "Blocking",
  DELETED = "Deleted",
  DEACTIVATED = "Deactivated",
  SUSPENDED = "Suspended",
  HIDDEN = "Hidden",
  YOURSELF = "Me",
  INACTIVE = "Inactive"
}

export function getRepoStatusLabel(status: RepoStatus|undefined) {
  return status ?? RepoStatusLabel[status];
}