import { Link } from "react-router-dom";
import plusIcon from "@/assets/images/plus.svg";
import { Card } from "@/components/Card";
import { useStore } from "@/store/useStore";
import { Button } from "@/ui/Button";

export const Applications = () => {
  const applications = useStore((state) => state.applications);

  return (
    <main className="mb-30">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="font-fixel-display text-3xl text-primary md:text-5xl">Applications</h1>
        <Link to="/new" className="w-full md:w-auto">
          <Button className="w-full" leadingIcon={<img src={plusIcon} alt="plus" />}>
            Create new
          </Button>
        </Link>
      </div>
      <hr className="mt-4 w-full border-border-base" />
      <div className="mt-6">
        {applications.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-fixel-display text-2xl text-secondary">No applications</p>
            <p className="mt-2 text-tertiary">Your generated cover letters will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-4">
            {applications.map((app) => (
              <Card key={app.id} id={app.id} company={app.company} content={app.content} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
