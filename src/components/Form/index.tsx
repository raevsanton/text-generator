import { useState } from "react";
import circle from "@/assets/images/circle.png";
import repeatIcon from "@/assets/images/repeat-03.svg";
import { generateCoverLetter } from "@/services/ai";
import { useStore } from "@/store/useStore";
import { Button } from "@/ui/Button";
import { BUTTON_VARIANT } from "@/ui/Button/types";
import { ButtonCopy } from "@/ui/ButtonCopy";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import { cn } from "@/utils/cn";

const defaultStateForm = {
  jobTitle: "",
  company: "",
  skills: "",
  details: "",
};

export const Form = () => {
  const [formData, setFormData] = useState(defaultStateForm);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [generatedApplication, setGeneratedApplication] = useState("");

  const addApplication = useStore((state) => state.addApplication);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const text = await generateCoverLetter(formData);
      setGeneratedApplication(text);
      addApplication({
        company: formData.company,
        jobTitle: formData.jobTitle,
        content: text,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to generate cover letter:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setFormData(defaultStateForm);
    setIsSuccess(false);
    setIsError(false);
    setGeneratedApplication("");
  };

  const title =
    formData.jobTitle || formData.company
      ? `${formData.jobTitle}${formData.jobTitle && formData.company ? ", " : ""}${formData.company}`
      : "New application";

  const renderPreviewContent = () => {
    if (isLoading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={circle} alt="loading" className="animate-pulse" />
        </div>
      );
    }

    if (isError) {
      return <p className="text-red-500">Failed to generate</p>;
    }

    if (generatedApplication) {
      return <p className="whitespace-pre-wrap text-primary">{generatedApplication}</p>;
    }

    return <p className="text-secondary">Your personalized job application will appear here...</p>;
  };

  return (
    <div className="mb-12 flex flex-col gap-8 md:flex-row md:justify-between">
      <div className="w-full min-w-0 md:w-1/2">
        <h1
          className={cn(
            "truncate pb-1 font-fixel-display text-3xl md:text-5xl",
            formData.jobTitle || formData.company ? "text-primary" : "text-secondary",
          )}
          title={title}
        >
          {title}
        </h1>
        <hr className="mt-3 mb-4 w-full border-border-base" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              name="jobTitle"
              label="Job title"
              placeholder="Product manager"
              classNames={{ wrapper: "flex-1" }}
              value={formData.jobTitle}
              onChange={onInputChange}
            />
            <Input
              name="company"
              label="Company"
              placeholder="Apple"
              classNames={{ wrapper: "flex-1" }}
              value={formData.company}
              onChange={onInputChange}
            />
          </div>
          <Input
            name="skills"
            label="I am good at..."
            placeholder="HTML, CSS and doing things in time"
            value={formData.skills}
            onChange={onInputChange}
          />
          <Textarea
            name="details"
            label="Additional details"
            placeholder="Describe why you are a great fit or paste your bio"
            limit={1200}
            value={formData.details}
            onChange={onInputChange}
          />
          <Button
            size="lg"
            className="w-full"
            {...(isSuccess
              ? {
                  leadingIcon: <img src={repeatIcon} alt="repeat" />,
                  variant: BUTTON_VARIANT.SECONDARY,
                  onClick: handleTryAgain,
                }
              : {
                  disabled: formData.details.length === 0,
                  isLoading: isLoading,
                  onClick: handleGenerate,
                })}
          >
            {isSuccess ? "Try Again" : "Generate Now"}
          </Button>
        </div>
      </div>

      <div className="flex min-h-[400px] w-full flex-col rounded-xl bg-bg-gray md:h-[615px] md:w-1/2">
        <div className="relative flex-1 overflow-y-auto p-6 pb-0">
          {renderPreviewContent()}
          <div className="pointer-events-none sticky bottom-0 -mx-6 h-16 bg-gradient-to-t from-bg-gray to-transparent" />
        </div>
        {generatedApplication && (
          <div className="flex justify-end p-6 pt-2">
            <ButtonCopy text="Copy to clipboard" value={generatedApplication || ""} />
          </div>
        )}
      </div>
    </div>
  );
};
