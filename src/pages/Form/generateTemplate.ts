import type { FormValues } from "@/store/types";

export const generateTemplate = (data: FormValues) => {
  const company = data.company ? `${data.company} Team` : "Team";
  const jobTitle = data.jobTitle ? `the ${data.jobTitle} position` : "this position";
  const skillsText = data.skills ? `combined with my skills in ${data.skills} ` : "";
  const experienceText = data.skills ? "make" : "makes";

  return `Dear ${company},

I am writing to express my interest in ${jobTitle}.

My experience in the realm ${skillsText}${experienceText} me a strong candidate for this role.

${data.details}

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`;
};
