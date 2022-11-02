import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import styles from "./FormPayment.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import cn from "classnames";
import axios from "axios";
import { Modal } from "../Modal/Modal";
import { useRouter } from "next/router";
import { CancelButton } from "../CancelButton/CancelButton";
import { onPhoneInput, onPhoneKeyDown, onPhonePaste } from "../../helpers/phone";

interface FormPaymentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  operatorName: string;
}

interface IRequisites {
  tel: string;
  sum: number;
}

export const FormPayment = ({ operatorName }: FormPaymentProps) => {
  const router = useRouter();
  const [errorSubmit, setErrorSubmit] = useState(true);
  const [successSubmit, setSuccessSubmit] = useState(false);
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
      setSuccessSubmit(!successSubmit);
      setTimeout(() => router.push("/"), 1400);
    } catch (e) {
      setErrorSubmit(false);
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <CancelButton />
        <div className={styles.title}>{operatorName}</div>
        <div className={styles.wrapper}>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="tel">
              Номер телефона
            </label>
            <input
              placeholder="+7 000 000 00 00"
              type="tel"
              id="tel"
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
              id="sum"
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
                [styles.inputError]: errors.sum,
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
      <Modal isOpen={!errorSubmit}>
        <div className={styles.errorWrapper}>
          <div className={styles.error}>Что-то пошло не так, пожалуйста заполните форму заново</div>
          <button className={styles.button} onClick={() => setErrorSubmit(!errorSubmit)}>
            ОК
          </button>
        </div>
      </Modal>
      <Modal isOpen={successSubmit}>
        <div className={styles.successWrapper}>
          <div className={styles.success}>Оплата прошла успешно!</div>
        </div>
      </Modal>
    </>
  );
};
