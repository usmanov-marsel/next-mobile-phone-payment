import React, {
  ClipboardEventHandler,
  DetailedHTMLProps,
  FormEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  useState,
} from "react";
import styles from "./FormPayment.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import cn from "classnames";
import axios from "axios";
import { Modal } from "../Modal/Modal";
import { useRouter } from "next/router";
import { BackButtom } from "../CancelButtom/CancelButtom";

interface FormPaymentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  operatorName: string;
}

interface IRequisites {
  tel: string;
  sum: number;
}

const getInputNumbersValue = (input: HTMLInputElement) => {
  return input.value.replace(/\D/g, "");
};

const onPhonePaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
  const input = e.target as HTMLInputElement;
  if (!input) {
    return;
  }
  const inputNumbersValue = getInputNumbersValue(input);
  const pasted = e.clipboardData;
  if (pasted) {
    const pastedText = pasted.getData("Text");
    if (/\D/g.test(pastedText)) {
      input.value = inputNumbersValue;
      return;
    }
  }
};

const onPhoneInput: FormEventHandler<HTMLInputElement> = (e) => {
  const input = e.target as HTMLInputElement;
  const selectionStart = input.selectionStart;
  let inputNumbersValue = getInputNumbersValue(input);
  let formattedInputValue = "";

  if (input.value == "+") {
    return;
  }

  if (!inputNumbersValue) {
    return (input.value = "");
  }

  if (input.value.length != selectionStart) {
    return;
  }

  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
    var firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
    formattedInputValue = input.value = firstSymbols + " ";
    if (inputNumbersValue.length > 1) {
      formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
    }
  } else {
    formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
  }
  input.value = formattedInputValue;
};

const onPhoneKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
  const input = e.target as HTMLInputElement;
  const inputValue = input.value.replace(/\D/g, "");
  if (e.keyCode == 8 && inputValue.length == 1) {
    input.value = "";
  }
};

export const FormPayment = ({ operatorName }: FormPaymentProps) => {
  const router = useRouter();
  const [successSubmit, setSuccessSubmit] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRequisites>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IRequisites> = async (data) => {
    data.tel = data.tel.replace(/\D/g, "");
    try {
      await axios.post(process.env.NEXT_PUBLIC_DOMAIN + "/api/payment");
      router.push("/");
    } catch (e) {
      setSuccessSubmit(false);
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <BackButtom />
        <div className={styles.title}>{operatorName}</div>
        <div className={styles.wrapper}>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="tel">
              Номер телефона
            </label>
            <input
              placeholder="+7 000 000 00 00"
              type="tel"
              {...register("tel", {
                required: "Телефон обязателен к заполнению",
                pattern: {
                  value: /[+7|8]\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                  message: "Неверный формат телефона",
                },
              })}
              className={cn(styles.input, {
                [styles.inputError]: errors.tel,
              })}
              onKeyDown={onPhoneKeyDown}
              onInput={onPhoneInput}
              onPaste={onPhonePaste}
            />
            {errors.tel && <p className={styles.p}>{errors.tel.message}</p>}
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="sum">
              Сумма
            </label>
            <input
              type="number"
              {...register("sum", {
                required: "Сумма обязательна к заполнению",
                min: {
                  value: 1,
                  message: "Сумма не может быть меньше 1 руб.",
                },
                max: {
                  value: 1000,
                  message: "Сумма не моет быть больше 1000 руб",
                },
              })}
              placeholder="1–1000 ₽"
              className={cn(styles.input, {
                [styles.inputError]: errors.tel,
              })}
            />
            {errors.sum && <p className={styles.p}>{errors.sum.message}</p>}
          </div>
        </div>

        <input
          className={cn(styles.input, {
            [styles.inputActive]: isValid,
          })}
          type="submit"
          disabled={!isValid}
        />
      </form>
      <Modal isOpen={!successSubmit}>
        <div className={styles.errorWrapper}>
          <div className={styles.error}>Что-то пошло не так, пожалуйста заполните форму заново</div>
          <button className={styles.button} onClick={() => setSuccessSubmit(!successSubmit)}>
            ОК
          </button>
        </div>
      </Modal>
    </>
  );
};
