interface FormData {
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
}

const SYSTEM_PROMPT = `You are an expert career consultant and professional cover letter writer with 15+ years of experience. 
Write a compelling, personalized cover letter. 
- Sounds natural and human.
- Tailored to the company and role.
- Concise (3-4 paragraphs).
- Directly start with "Dear [Company] Team,".
- Professional sign-off.`;

import { generateTemplate } from "@/components/Form/generateTemplate";

export const generateCoverLetter = async (formData: FormData): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = import.meta.env.VITE_GEMINI_API_URL;

  const fallback = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return generateTemplate(formData);
  };

  const userPrompt = `Write a cover letter for:
    Position: ${formData.jobTitle}
    Company: ${formData.company}
    Skills: ${formData.skills}
    Details: ${formData.details}`;

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_PROMPT}\n\n${userPrompt}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `HTTP Error ${response.status}`);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) return text.trim();
    throw new Error("Empty response from Gemini");
  } catch (error) {
    console.error(
      "Gemini Direct Fetch Failed:",
      error instanceof Error ? error.message : String(error),
    );
    return fallback();
  }
};
