import { ClipboardEventHandler, FormEventHandler, KeyboardEventHandler } from "react";

export const getInputNumbersValue = (input: HTMLInputElement) => {
  return input.value.replace(/\D/g, "");
};

export const onPhonePaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
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

export const onPhoneInput: FormEventHandler<HTMLInputElement> = (e) => {
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

export const onPhoneKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
  const input = e.target as HTMLInputElement;
  const inputValue = input.value.replace(/\D/g, "");
  if (e.keyCode == 8 && inputValue.length == 1) {
    input.value = "";
  }
};
