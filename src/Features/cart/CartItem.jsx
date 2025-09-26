import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className=" py-3 flex items-center justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className=" flex items-center justify-end gap-x-4">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity id={pizzaId} taggelQuantity={quantity} />

        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
