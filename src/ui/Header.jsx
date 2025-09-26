import { Link } from "react-router-dom";
import SearcheOrder from "../Features/order/SearcheOrder";
import UserName from "./UserName";

function Header() {
  return (
    <header className="bg-yellow-500 uppercase p-3 border border-stone-200 border-b flex items-center justify-between">
      <Link to={"/"} className=" tracking-widest">
        fast react pizza Co.
      </Link>
      <SearcheOrder />
      <UserName />
    </header>
  );
}

export default Header;
