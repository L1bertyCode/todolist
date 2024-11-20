import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./EditableSpan.module.css";
import { AppInput } from "@/shared/ui/AppInput/AppInput";
interface EditableSpanProps {
  title: string;
  onChangeTitle: (newTitle: string) => void;
};
export const EditableSpan = ({ title, onChangeTitle }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);

  return (
    <>
      {!editMode ?
        <span className={s.editableSpan}
          onDoubleClick={() => setEditMode(true)}
        >
          {value}
        </span> :
        <AppInput
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setValue(e.currentTarget.value); }}
          autoFocus
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              setEditMode(false);
              onChangeTitle(value);
            }
          }}
          onBlur={() => {
            setEditMode(false);
            onChangeTitle(value);
          }}
        />
      }

    </>
  );
};