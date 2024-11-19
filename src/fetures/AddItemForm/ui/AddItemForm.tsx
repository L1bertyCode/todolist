import { AppInput } from "@/shared/ui/AppInput/AppInput";
import s from "./AddItemForm.module.css";
import { AppButton } from "@/shared/ui/AppButton/AppButton";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import cn from "classnames";
interface AddItemFormProps {
  addItem: (item: string) => void;
};
export const AddItemForm = ({
  addItem
}: AddItemFormProps) => {

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState("");

  const addItemHandler = () => {
    if (value) {
      setError("");
      addItem(value);
      setValue("");
    } else {
      setError("Field is requred");
    }

  };
  return (
    <div
      className={s.addItemForm}>
      <AppInput
        className={cn(error && s.error)}
        value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          setError("");
          if (e.key === "Enter") {
            addItemHandler();
          }
        }}
      />
      <AppButton onClick={addItemHandler}>+</AppButton>
      {error && <div className={s["error-message"]}>{error}</div>}
    </div>
  );
};