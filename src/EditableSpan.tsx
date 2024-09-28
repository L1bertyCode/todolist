import TextField from "@mui/material/TextField"
import { ChangeEvent, useState } from "react"

type PropsType = {
  value: string
  onChange: (newTitle: string) => void
}
export const EditableSpan = ({ value, onChange }: PropsType) => {

  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(value)

  const activatedEditModeHandler = () => {
    setEditMode(true)
  }
  const deactivateEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
  }
  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  return (
    <>
      {editMode ?
        (
          <TextField
            variant={'outlined'}
            value={title}
            size={'small'}
            onChange={changeTitleHandler}
            onBlur={deactivateEditModeHandler}
            autoFocus
          />
        ) : (
          <span onClick={activatedEditModeHandler}>{value}</span>
        )
      }
    </>
  )
}