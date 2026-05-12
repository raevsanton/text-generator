import { useEffect, useRef, useState } from "react";
import { generateCoverLetter } from "@/services/ai";
import type { FormValues } from "@/store/types";
import { useStore } from "@/store/useStore";

export const useGenerateLetter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);
  const addApplication = useStore((state) => state.addApplication);

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setGeneratedLetter("");
  };

  const generate = async (formData: FormValues) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const text = await generateCoverLetter(formData, controller.signal);

      setGeneratedLetter(text);
      setIsSuccess(true);

      addApplication({
        company: formData.company.trim(),
        jobTitle: formData.jobTitle.trim(),
        content: text,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      setIsError(true);
    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    generate,
    isLoading,
    isSuccess,
    isError,
    generatedLetter,
    reset,
  };
};
