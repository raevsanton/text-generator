import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Applications } from "./components/Applications";
import { Banner } from "./components/Banner";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { useStore } from "./store/useStore";
import { MAX_APPLICATIONS_COUNT } from "./utils/consts";

export const App = () => {
  const applications = useStore((state) => state.applications);
  const notFiveApplications = applications.length < MAX_APPLICATIONS_COUNT;
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-[1216px] px-4 md:px-4">
        <Header />
        <Routes>
          <Route path="/" element={<Applications />} />
          <Route path="/new" element={<Form />} />
        </Routes>
        {notFiveApplications && <Banner />}
      </div>
    </BrowserRouter>
  );
};
