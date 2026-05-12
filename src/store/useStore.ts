import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormValues } from "./types";

export interface Application extends Omit<FormValues, "skills" | "details"> {
  id: string;
  content: string;
}

interface AppState {
  applications: Application[];

  addApplication: (app: Omit<Application, "id">) => void;
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
