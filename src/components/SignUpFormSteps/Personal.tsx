import { IFormValues } from "providers/signup/register/types";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@components/InputForm";
import { Form } from "@components/Form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Dispatch, SetStateAction, useId, useState } from "react";
import { IconsProps } from "@components/InputForm/InputStringAction";
import Link from "next/link";

export const Personal = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<IFormValues>();
  const [seeingPassword, setSeeingPassword] = useState(false);
  const [seeingRepeatPassword, setSeeingRepeatPassword] = useState(false);

  const passwordErrors = errors.password?.message ?? errors.repeatPassword?.message;

  const checkboxId = useId();

  const handlePasswordAction = (setState: Dispatch<SetStateAction<boolean>>) => () => {
    setState((status) => !status);
  };

  const passwordType = seeingPassword ? "text" : "password";
  const repeatPasswordType = seeingRepeatPassword ? "text" : "password";
  const seePasswordIcons = [AiOutlineEye, AiOutlineEyeInvisible] as IconsProps;

  return (
    <>
      <Form.MultipleInRow className="my-2.5">
        <Input.String
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
          label="Nome:"
          placeholder="Guy"
          autoFocus
          required
        />
        <Input.String
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
          label="Sobrenome:"
          placeholder="Hawkins"
          required
        />
      </Form.MultipleInRow>
      <Input.String
        {...register("email")}
        errorMessage={errors.email?.message}
        type="email"
        label="E-mail:"
        placeholder="guyhawkins@mail.com"
        required
        rootClasses="my-2.5"
      />
      <div className="my-2.5">
        <Form.MultipleInRow className="my-2.5">
          <Input.Root grow={1}>
            <Input.StringAction
              {...register("password")}
              label="Senha:"
              placeholder="*********"
              type={passwordType}
              icons={seePasswordIcons}
              active={seeingPassword}
              onAction={handlePasswordAction(setSeeingPassword)}
              required
            />
            <Input.Error className="sm:hidden" errorMessage={errors.password?.message} />
          </Input.Root>
          <Input.StringAction
            {...register("repeatPassword")}
            label="Confirmar senha:"
            placeholder="*********"
            type={repeatPasswordType}
            icons={seePasswordIcons}
            active={seeingRepeatPassword}
            onAction={handlePasswordAction(setSeeingRepeatPassword)}
            required
          />
        </Form.MultipleInRow>
        <Input.Error
          className="flex sm:hidden"
          errorMessage={errors.repeatPassword?.message}
        />
        <Input.Error className="hidden sm:flex" errorMessage={passwordErrors} />
      </div>
      <div className="my-5">
        <Controller
          control={control}
          name="isTermsAccepted"
          render={({ field }) => (
            <Input.Checkbox
              {...field}
              id={checkboxId}
              tabIndex={20}
              required
              label={<AcceptTerms />}
            />
          )}
        />

        <Input.Error errorMessage={errors.isTermsAccepted?.message} />
      </div>
    </>
  );
};

export function AcceptTerms() {
  return (
    <>
      Concordo com os{" "}
      <Link href="/terms" target="_blank" className="text-primary-01 underline">
        Termos de Serviço
      </Link>{" "}
      e com processamento dos meus dados de acordo com o{" "}
      <Link href="/privacy-policy" target="_blank" className="text-primary-01 underline">
        Aviso de Privacidade
      </Link>
    </>
  );
}