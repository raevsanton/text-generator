import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Application {
  id: string;
  company: string;
  jobTitle: string;
  content: string;
  createdAt: string;
}

interface AppState {
  applications: Application[];

  addApplication: (app: Omit<Application, "id" | "createdAt">) => void;
  deleteApplication: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      applications: [],

      addApplication: (app) =>
        set((state) => ({
          applications: [
            {
              ...app,
              id: nanoid(),
              createdAt: new Date().toISOString(),
            },
            ...state.applications,
          ],
        })),

      deleteApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        })),
    }),
    {
      name: "text-generator-storage",
      partialize: (state) => ({ applications: state.applications }),
    },
  ),
);
