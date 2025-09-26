import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItenQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ id, taggelQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className=" flex items-center gap-x-2">
      <Button type={"round"} onClick={() => dispatch(decreaseItenQuantity(id))}>
        -
      </Button>
      <span>{taggelQuantity}</span>
      <Button type={"round"} onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
