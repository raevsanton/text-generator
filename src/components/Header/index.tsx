import { Link } from "react-router-dom";
import homeIcon from "@/assets/images/home-02.svg";
import logo from "@/assets/images/logo.svg";
import { useStore } from "@/store/useStore";
import { Button } from "@/ui/Button";
import { BUTTON_VARIANT } from "@/ui/Button/types";
import { ProgressIndicator } from "@/ui/ProgressIndicator";
import { MAX_APPLICATIONS_COUNT, ROUTES } from "@/utils/consts";

export const Header = () => {
  const applications = useStore((state) => state.applications);

  return (
    <header className="mb-6 flex flex-col items-start gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
      <Link to={ROUTES.HOME} className="max-md:w-full">
        <img src={logo} alt="logo" className="cursor-pointer max-md:mx-auto" />
      </Link>
      <div className="flex w-full flex-wrap items-center justify-center gap-y-3 md:w-auto md:flex-nowrap md:justify-end md:gap-y-0">
        <p className="w-full text-center text-secondary md:w-auto md:text-left">
          {Math.min(applications.length, MAX_APPLICATIONS_COUNT)}/{MAX_APPLICATIONS_COUNT}{" "}
          applications generated
        </p>
        <ProgressIndicator
          current={applications.length}
          max={MAX_APPLICATIONS_COUNT}
          variant="dots"
          className="md:ml-4"
        />
        <Link to={ROUTES.HOME} className="ml-4 md:ml-6">
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            iconOnly
            leftIcon={<img src={homeIcon} alt="home" />}
          />
        </Link>
      </div>
    </header>
  );
};
