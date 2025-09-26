import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../Features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayote() {
  const Navigation = useNavigation();
  const isLoading = Navigation.state === "loading";
  return (
    <div className=" h-screen grid grid-rows-[auto_1fr_auto] relative">
      {/* {isLoading && <Loader />} */}
      {isLoading && (
        <div className="h-screen w-full flex items-center justify-center absolute bg-white/20 backdrop-blur-sm">
          <Loader />
        </div>
      )}
      <Header />
      <div className="overflow-scroll">
        <main className=" max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayote;
