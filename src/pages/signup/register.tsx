/* eslint-disable react-hooks/exhaustive-deps */
import { CenteredContainer } from "@components/CenteredContainer";
import FormSteps from "@components/FormSteps";
import Stepper from "@components/Stepper/Stepper";
import StepperVertical from "@components/StepperVertical";
import { useMultistepForm } from "SIGNUP_SRC/hooks/useMultistepForm";
import { Personal } from "SIGNUP_SRC/steps/Personal";
import { IFormValues } from "SIGNUP_SRC/types";
import Providers from "pages/signup/_providers";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useRouter } from "next/router";
import { Location } from "SIGNUP_SRC/steps/Location";
import { Professional } from "SIGNUP_SRC/steps/Professional";
import { MultipleInputsContainer } from "SIGNUP_SRC/components/Input/MultipleInputsContainer";

export const validationPerStep: Record<number, (keyof IFormValues)[]> = {
  0: ["firstName", "lastName", "email", "password", "repeatPassword"],
  1: ["country", "state", "city", "birthDate", "skills"],
  2: ["linkedin", "github", "description"],
};

const RegisterPage = () => {
  const router = useRouter();
  const { formCurrentStep, setFormCurrentStep } = useMultistepForm();
  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = useFormContext<IFormValues>();

  const isInFirstStep = formCurrentStep === 0;
  const isInLastStep = formCurrentStep === 2;

  const formHasErrors = Object.keys(errors).length;
  if (formHasErrors) console.log("FormErrors", errors);

  const atLeastOneValidationFailed = validationPerStep[formCurrentStep].some(
    (fieldInThisStep) => fieldInThisStep in errors
  );

  const shouldGoForward = !atLeastOneValidationFailed;

  const handleActionButton = async () => {
    const allStepValidations = validationPerStep[formCurrentStep].map((field) =>
      trigger(field)
    );
    const allStepValidationsResult = await Promise.all(allStepValidations);
    const allValidationsPassed = allStepValidationsResult.every(Boolean);
    if (allValidationsPassed)
      return setFormCurrentStep((currentStep) => currentStep + 1);
  };

  const handleGoBackButton = () => {
    if (isInFirstStep) {
      return router.replace({
        pathname: "/signup/plan",
      });
    }
    setFormCurrentStep((currentStep) => currentStep - 1);
  };

  const submitHandler: SubmitHandler<IFormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <main className="flex flex-col">
      <section className="h-28 border-b border-gray-02 hidden sm:flex">
        <CenteredContainer className="flex items-center justify-between px-8 sm:px-12">
          <Stepper
            steps={[1, 2, 3]}
            currentStep={1 + formCurrentStep}
            className="hidden sm:block"
            size="regular"
          />
          <div className="max-w-xs">
            <h3 className="font-bold text-xl">Status do seu registro</h3>
            <p className="text-gray-02 text-xs w-3/4 md:block hidden">
              Acompanhe em qual parte do registro você se encontra
            </p>
          </div>
        </CenteredContainer>
      </section>
      <section className="">
        <CenteredContainer className="flex flex-col lg:flex-row justify-between px-8 sm:px-12 mt-12">
          <aside className="">
            <h2 className="text-primary-05 text-3xl font-semibold text-center lg:text-start">
              Registre-se aqui!
            </h2>
            <p className="text-gray-04 text-sm mt-2 mb-12 px-4 sm:px-0 text-center lg:w-3/4 lg:text-start">
              Preencha os campos para criar a sua conta e acessar a plataforma!
            </p>
            <StepperVertical
              currentStep={1 + formCurrentStep}
              className="hidden lg:block"
            />
          </aside>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full m-auto lg:m-0 mb-24 lg:max-w-none max-w-[48rem]"
          >
            <div className="space-y-2 mb-3">
              {formCurrentStep === 0 && <Personal />}
              {formCurrentStep === 1 && <Location />}
              {formCurrentStep === 2 && <Professional />}
            </div>
            <MultipleInputsContainer>
              <button
                type="button"
                className="sm:order-none order-1 my-1 px-3 min-h-[3rem] rounded-lg text-neutral-02 focus:outline-1 focus:outline-gray-03 focus:outline-offset-2 basis-0 min-w-0 grow bg-secondary-01 border border-gray-03 font-medium"
                onClick={handleGoBackButton}
                tabIndex={30}
              >
                Voltar
              </button>
              <button
                type={isInLastStep ? "submit" : "button"}
                className="my-1 px-3 min-h-[3rem] rounded-lg text-neutral-02 focus:outline-1 focus:outline-primary-02 focus:outline-offset-2 bg-primary-03 disabled:bg-primary-04 basis-0 min-w-0 grow font-medium"
                onClick={() => !isInLastStep && handleActionButton()}
                disabled={!shouldGoForward}
                tabIndex={25}
              >
                {isInLastStep ? "Enviar" : "Próximo"}
              </button>
            </MultipleInputsContainer>
          </form>
        </CenteredContainer>
      </section>
    </main>
  );
};

export default function Register() {
  return (
    <Providers>
      <RegisterPage />
    </Providers>
  );
}
