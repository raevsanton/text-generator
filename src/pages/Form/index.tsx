import { useForm } from "react-hook-form";
import circle from "@/assets/images/circle.png";
import repeatIcon from "@/assets/images/repeat-03.svg";
import { useGenerateLetter } from "@/hooks/useGenerateLetter";
import type { FormValues } from "@/store/types";
import { Button } from "@/ui/Button";
import { ButtonCopy } from "@/ui/Button/ButtonCopy";
import { BUTTON_VARIANT } from "@/ui/Button/types";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import { cn } from "@/utils/cn";

const defaultStateForm: FormValues = {
  jobTitle: "",
  company: "",
  skills: "",
  details: "",
};

const TEXT_MAX_LIMIT = 1200;

interface PreviewContentProps {
  isLoading: boolean;
  isError: boolean;
  generatedApplication: string;
}

const PreviewContent = ({ isLoading, isError, generatedApplication }: PreviewContentProps) => {
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={circle} alt="loading" className="animate-pulse" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <p className="font-medium text-error-base">
          Generation failed
          <br />
          Please try again or generate later
        </p>
      </div>
    );
  }

  if (generatedApplication) {
    return <p className="whitespace-pre-wrap text-primary">{generatedApplication}</p>;
  }

  return <p className="text-secondary">Your personalized job application will appear here...</p>;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: defaultStateForm,
    mode: "onChange",
  });

  const {
    generate,
    isLoading,
    isSuccess,
    isError,
    generatedLetter: generatedApplication,
    reset: resetGeneration,
  } = useGenerateLetter();

  const watchedFields = watch();
  const detailsValue = watch("details");

  const onSubmit = (data: FormValues) => {
    const trimmedData = {
      jobTitle: data.jobTitle.trim(),
      company: data.company.trim(),
      skills: data.skills.trim(),
      details: data.details.trim(),
    };
    generate(trimmedData);
  };

  const handleTryAgain = () => {
    resetGeneration();
    handleSubmit(onSubmit)();
  };

  const title =
    watchedFields.jobTitle || watchedFields.company
      ? `${watchedFields.jobTitle}${watchedFields.jobTitle && watchedFields.company ? ", " : ""}${watchedFields.company}`
      : "New application";

  const isButtonDisabled = !isValid || detailsValue.length > TEXT_MAX_LIMIT;

  return (
    <div className="mb-12 flex flex-col gap-8 md:flex-row md:justify-between">
      <div className="w-full min-w-0 md:w-1/2">
        <h1
          className={cn(
            "truncate pb-1 font-fixel-display text-3xl md:text-5xl",
            watchedFields.jobTitle || watchedFields.company ? "text-primary" : "text-secondary",
          )}
          title={title}
        >
          {title}
        </h1>
        <hr className="mt-3 mb-4 w-full border-border-base" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              label="Job title"
              placeholder="Product manager"
              classNames={{ wrapper: "flex-1" }}
              {...register("jobTitle", { required: true })}
            />
            <Input
              label="Company"
              placeholder="Apple"
              classNames={{ wrapper: "flex-1" }}
              {...register("company", { required: true })}
            />
          </div>
          <Input
            label="I am good at..."
            placeholder="HTML, CSS and doing things in time"
            {...register("skills", { required: true })}
          />
          <Textarea
            label="Additional details"
            placeholder="Describe why you are a great fit or paste your bio"
            limit={TEXT_MAX_LIMIT}
            value={detailsValue}
            {...register("details", { required: true })}
          />
          <Button
            size="lg"
            type="submit"
            className="w-full"
            {...(isSuccess
              ? {
                  leftIcon: <img src={repeatIcon} alt="repeat" />,
                  variant: BUTTON_VARIANT.SECONDARY,
                  onClick: (e) => {
                    e.preventDefault();
                    handleTryAgain();
                  },
                }
              : {
                  disabled: isButtonDisabled,
                  isLoading: isLoading,
                })}
          >
            {isSuccess ? "Try Again" : "Generate Now"}
          </Button>
        </form>
      </div>

      <div className="flex min-h-[400px] w-full flex-col rounded-xl bg-bg-gray md:h-[615px] md:w-1/2">
        <div className="relative flex-1 overflow-y-auto p-6 pb-0">
          <PreviewContent
            isLoading={isLoading}
            isError={isError}
            generatedApplication={generatedApplication}
          />
          <div className="pointer-events-none sticky bottom-0 -mx-6 h-16 bg-gradient-to-t from-bg-gray to-transparent" />
        </div>
        {generatedApplication && (
          <div className="flex justify-end p-6 pt-2">
            <ButtonCopy
              content={generatedApplication}
              className="font-semibold text-tertiary hover:text-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};
