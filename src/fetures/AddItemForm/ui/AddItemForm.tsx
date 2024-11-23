import { AppInput } from "@/shared/ui/AppInput/AppInput";
import s from "./AddItemForm.module.css";
import { AppButton } from "@/shared/ui/AppButton/AppButton";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import MuiButton from '@mui/material/Button';
import cn from "classnames";
import TextField from "@mui/material/TextField";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';

interface AddItemFormProps {
  addItem: (item: string) => void;
};
export const AddItemForm = ({
  addItem
}: AddItemFormProps) => {

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addItemHandler = () => {
    if (value) {
      setError("");
      addItem(value);
      setValue("");
    } else {
      setError("Field is required");
    }

  };
  return (
    <div
      className={s.addItemForm}>
      <TextField
        label={"Enter a title"}
        variant="outlined"
        size={'small'}
        error={!!error}
        helperText={error}
        value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          setError("");
          if (e.key === "Enter") {
            addItemHandler();
          }
        }} />
      <IconButton onClick={addItemHandler} color={'primary'}>
        <AddBoxIcon />
      </IconButton>
      {/* <MuiButton
          variant="contained"
          onClick={addItemHandler}>+</MuiButton> */}
      {/* <AppInput
        className={cn(error && s.error)}
        value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          setError(false);
          if (e.key === "Enter") {
            addItemHandler();
          }
        }}
      /> */}
      {/* {error ? <div className={s["error-message"]}>{"Field is required"}</div> : undefined} */}
    </div>
  );
};