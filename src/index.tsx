import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Banner } from "./components/Banner";
import { Header } from "./components/Header";
import { Applications } from "./pages/Applications";
import { Form } from "./pages/Form";
import { useStore } from "./store/useStore";
import { MAX_APPLICATIONS_COUNT, ROUTES } from "./utils/consts";

export const App = () => {
  const applications = useStore((state) => state.applications);
  const notFiveApplications = applications.length < MAX_APPLICATIONS_COUNT;
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-[1216px] px-4 md:px-4">
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={<Applications />} />
          <Route path={ROUTES.NEW_APPLICATION} element={<Form />} />
        </Routes>
        {notFiveApplications && <Banner />}
      </div>
    </BrowserRouter>
  );
};
