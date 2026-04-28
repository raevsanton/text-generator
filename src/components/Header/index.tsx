import { Link } from "react-router-dom";
import checkIcon from "@/assets/images/check-icon.svg";
import homeIcon from "@/assets/images/home-02.svg";
import logo from "@/assets/images/logo.svg";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { MAX_APPLICATIONS_COUNT } from "@/utils/consts";

export const Header = () => {
  const applications = useStore((state) => state.applications);

  return (
    <header className="mb-6 flex flex-col items-start gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
      <Link to="/" className="max-md:w-full">
        <img src={logo} alt="logo" className="cursor-pointer max-md:mx-auto" />
      </Link>
      <div className="flex w-full flex-wrap items-center justify-center gap-y-3 md:w-auto md:flex-nowrap md:justify-end md:gap-y-0">
        <p className="w-full text-center text-secondary md:w-auto md:text-left">
          {applications.length}/{MAX_APPLICATIONS_COUNT} applications generated
        </p>
        <div className="flex items-center gap-1 md:ml-4">
          {applications.length >= MAX_APPLICATIONS_COUNT ? (
            <img src={checkIcon} alt="checked" />
          ) : (
            [...Array(MAX_APPLICATIONS_COUNT)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 w-2 rounded bg-primary",
                  i >= applications.length && "opacity-25",
                )}
              />
            ))
          )}
        </div>
        <Link to="/" className="ml-4 md:ml-6">
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-border-dark shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-gray-50">
            <img src={homeIcon} alt="home" />
          </button>
        </Link>
      </div>
    </header>
  );
};
