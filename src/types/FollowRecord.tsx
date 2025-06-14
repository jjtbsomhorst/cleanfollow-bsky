import { RepoStatus } from "../enums/RepoStatus.tsx";

type FollowRecord = {
  did: string;
  displayName: string;
  handle: string;
  uri: string;
  status: RepoStatus;
  status_label: string;
  toDelete: boolean;
  visible: boolean;
};

export default FollowRecord;