import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../serveces/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const Navigation = useNavigation();
  const isSubmiting = Navigation.state === "submitting";

  const formError = useActionData();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="my-6 mx-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="  sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="iput grow"
            defaultValue={userName}
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="  sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="iput w-full" />
            {addressStatus === "error" && (
              <p className=" mt-3 bg-red-100 text-red-700 py-2 pl-2 rounded-full text-sm">
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="  sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="iput w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
          </div>
          {!position.latitude && !position.langitude && (
            <span className=" absolute right-1 top-9 sm:top-1">
              <Button
                disabled={isLoadingAddress}
                type={"small"}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Posaiton
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-x-4">
          <input
            className="w-6 h-6 accent-yellow-400 focus:outline-none active:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button type={"primary"} disabled={isSubmiting}>
            {isSubmiting
              ? "loading..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Enter your number correctly, we may call you if needed.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
