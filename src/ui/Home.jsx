import { useSelector } from "react-redux";
import CreateUser from "../Features/user/CreateUser";
import Button from "./Button";
function Home() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="text-center my-10 flex items-center flex-col gap-y-3">
      <h1 className="text-stone-700  text-xl font-semibold mb-8">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!userName ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type={"primary"}>
          Contineu Ordring, {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
