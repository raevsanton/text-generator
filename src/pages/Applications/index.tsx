import { Link } from "react-router-dom";
import plusIcon from "@/assets/images/plus.svg";
import { Card } from "@/components/Card";
import { useStore } from "@/store/useStore";
import { Button } from "@/ui/Button";
import { ROUTES } from "@/utils/consts";

export const Applications = () => {
  const applications = useStore((state) => state.applications);

  return (
    <main>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="font-fixel-display text-3xl text-primary md:text-5xl">Applications</h1>
        <Link to={ROUTES.NEW_APPLICATION} className="w-full md:w-auto">
          <Button className="w-full" leftIcon={<img src={plusIcon} alt="plus" />}>
            Create new
          </Button>
        </Link>
      </div>
      <hr className="mt-4 w-full border-border-base" />
      <div className="mt-6 mb-12">
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-4">
          {applications.map((app) => (
            <Card key={app.id} id={app.id} content={app.content} />
          ))}
        </div>
      </div>
    </main>
  );
};
