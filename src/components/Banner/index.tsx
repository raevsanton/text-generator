import { Link } from "react-router-dom";
import plusIcon from "@/assets/images/plus.svg";
import { useStore } from "@/store/useStore";
import { Button } from "@/ui/Button";
import { cn } from "@/utils/cn";
import { MAX_APPLICATIONS_COUNT } from "@/utils/consts";

export const Banner = () => {
  const applications = useStore((state) => state.applications);
  const applicationsCount = applications.length;

  return (
    <div className="mb-30 rounded-xl bg-bg-success-light py-10 text-center md:py-14">
      <h2 className="font-fixel-display text-3xl text-primary md:text-4xl">Hit your goal</h2>
      <p className="mx-auto mt-3 max-w-120 text-secondary text-sm md:mt-4 md:text-base">
        Generate and send out couple more job applications today to get hired faster
      </p>
      <Link to="/new" className="mx-auto block w-fit">
        <Button
          size="lg"
          className="mt-4"
          leadingIconClassName="h-6 w-6"
          leadingIcon={<img src={plusIcon} alt="plus" />}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Create new
        </Button>
      </Link>
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {[...Array(MAX_APPLICATIONS_COUNT)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 w-8 rounded-sm bg-primary",
                i >= applicationsCount && "opacity-25",
              )}
            />
          ))}
        </div>
        <p className="text-secondary">
          {applicationsCount} out of {MAX_APPLICATIONS_COUNT}
        </p>
      </div>
    </div>
  );
};
