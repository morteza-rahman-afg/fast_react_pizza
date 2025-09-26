import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;

    dispatch(updateName(username));
    Navigate("/menu");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col gap-y-3"
    >
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="iput w-72 mb-8"
      />

      {username !== "" && (
        <div>
          <Button type={"primary"}>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
