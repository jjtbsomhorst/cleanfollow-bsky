import { createEffect, createSignal, For, Show } from "solid-js";
import { RepoStatus } from "../enums/RepoStatus.tsx";
import FollowRecord from "../types/FollowRecord.tsx";
import Follower from "../components/Follower.tsx"
import { FollowerStateSelection } from "./FollowerStateSelection.tsx";

export interface FollowersProps {
  followRecords: FollowRecord[];
  setFollowRecords: (
    index: number[],
    field: keyof FollowRecord,
    value: boolean,
  ) => void;
}

export function Followers(props: FollowersProps) {
  const [selectedCount, setSelectedCount] = createSignal(0);

  createEffect(() => {
    setSelectedCount(props.followRecords.filter((record) => record.toDelete).length);
  });

  function editRecords(
    status: RepoStatus,
    field: keyof FollowRecord,
    value: boolean,
  ) {
    const range = props.followRecords
      .map((record, index) => {
        if (record.status === status) return index;
      })
      .filter((i) => i !== undefined);
    props.setFollowRecords(range, field, value);
  }

  function getRecordCount(status: RepoStatus) {
    return props.followRecords.filter((record) => record.status === status).length;
  }


  const options: { status: RepoStatus; label: string }[] = [
    { status: RepoStatus.DELETED, label: "Deleted" },
    { status: RepoStatus.DEACTIVATED, label: "Deactivated" },
    { status: RepoStatus.SUSPENDED, label: "Suspended" },
    { status: RepoStatus.BLOCKEDBY, label: "Blocked By" },
    { status: RepoStatus.BLOCKING, label: "Blocking" },
    { status: RepoStatus.HIDDEN, label: "Hidden" },
    { status: RepoStatus.INACTIVE, label: "Inactive" },
  ];

  return (
    <div class="mt-6 flex flex-col sm:w-full sm:flex-row sm:justify-center">
      <div class="dark:bg-dark-500 sticky top-0 mb-3 mr-5 flex w-full flex-wrap justify-around border-b border-b-gray-400 bg-slate-100 pb-3 sm:top-3 sm:mb-0 sm:w-auto sm:flex-col sm:self-start sm:border-none">
        <div class="min-w-36 pt-3 sm:pt-0">
          <span>
            Selected: {selectedCount()}/{props.followRecords.length}
          </span>
        </div>
        <For each={options}>
          {(option, index) => (
              <Show when={getRecordCount(option.status)}>
                <FollowerStateSelection {...option} index={index()} length={options.length} editRecords={editRecords} size={getRecordCount(option.status)} label={option.label} />
              </Show>
          )}
        </For>
      </div>
      <div class="sm:min-w-96">
        <For each={props.followRecords}>
          {(record, index) => (
            <Show when={record.visible}>
              <div
                classList={{
                  "mb-1 flex items-center border-b dark:border-b-gray-500 py-1":
                    true,
                  "bg-red-300 dark:bg-rose-800": record.toDelete,
                }}
              >
                <div class="mx-2">
                  <input
                    type="checkbox"
                    id={"record" + index()}
                    class="h-4 w-4 rounded"
                    checked={record.toDelete}
                    onChange={(e) =>
                      props.setFollowRecords(
                        index(),
                        "toDelete",
                        e.currentTarget.checked,
                      )
                    }
                  />
                </div>
                <Follower index={index()} record={record} />
              </div>
            </Show>
          )}
        </For>
      </div>
    </div>
  );
}