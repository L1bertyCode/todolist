import { ChangeEvent, KeyboardEvent, useState } from "react"
import s from "./EditableSpan.module.css"

import TextField from "@mui/material/TextField"

interface EditableSpanProps {
  title: string
  onChange: (newTitle: string) => void
}
export const EditableSpan = ({ title, onChange }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [value, setValue] = useState<string>(title)

  return (
    <>
      {!editMode ? (
        <span className={s.editableSpan} onDoubleClick={() => setEditMode(true)}>
          {value}
        </span>
      ) : (
        <TextField
          variant={"outlined"}
          size={"small"}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
          }}
          autoFocus
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              setEditMode(false)
              onChange(value)
            }
          }}
          onBlur={() => {
            setEditMode(false)
            onChange(value)
          }}
        />
      )}
    </>
  )
}
