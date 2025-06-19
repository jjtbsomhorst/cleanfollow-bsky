import { RepoStatus } from "../enums/RepoStatus.tsx";

export interface FollowerStateSelectionProps {
  status: RepoStatus,
  label: string,
  size: number,
  index: number,
  length: number,
  editRecords: (status, field, value ) => void,
}

export function FollowerStateSelection(props: FollowerStateSelectionProps) {
  return (
    <div classList={{
      "sm:pb-2 min-w-36 sm:mb-2 mt-3 sm:mt-0": true,
      "sm:border-b sm:border-b-gray-300 dark:sm:border-b-gray-500":
        props.index < props.length - 1,
    }}
    >
      <div>
        <label class="mb-2 mt-1 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            class="peer sr-only"
            checked
            onChange={(e) =>
              props.editRecords(
                props.status,
                "visible",
                e.currentTarget.checked,
              )
            }
          />
          <span class="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></span>
          <span class="ms-3 select-none">
                        {props.label} ({props.size})
                      </span>
        </label>
      </div>
      <div class="flex items-center">
        <input
          type="checkbox"
          id={props.label}
          class="h-4 w-4 rounded"
          onChange={(e) =>
            props.editRecords(
              props.status,
              "toDelete",
              e.currentTarget.checked,
            )
          }
        />
        <label for={props.label} class="ml-2 select-none">
          Select All
        </label>
      </div>
    </div>
  );
}