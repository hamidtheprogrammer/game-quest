import {
  Button,
  cartAndFavouritesContext,
  EditProductQuantity,
  useDeleteFromCartMutation,
  useUpdateCart,
} from "../constants/Imports";
import { Link } from "react-router-dom";
import { cartItemProps } from "../Context/CartFavouritesContext";
import { createCheckoutSession } from "../apiClient/orderApi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const Cart: React.FC = () => {
  const { cart } = cartAndFavouritesContext();

  const { mutate, isLoading: loadingQuantity } = useUpdateCart();
  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    game: cartItemProps
  ) => {
    game.quantity = parseInt(e.target.value) - game.quantity!;
    mutate(game);
  };

  const { mutate: deleteMutation, isLoading: isLoadingDeletion } =
    useDeleteFromCartMutation();

  const { mutate: checkout, isLoading: ischeckOutLoading } = useMutation({
    mutationFn: createCheckoutSession,
    onError: (error) => {
      toast.error("Checkout failed");
      console.log(error);
    },
  });

  const onCheckOut = async () => {
    checkout();
  };

  const total = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.productId.price * currentValue.quantity!;
  }, 0);

  return (
    <div className="header-margin">
      <h1 className="ml-5 mb-5">Your Cart</h1>
      <div className="lg:flxBtw px-5 max-lg:flxColStart gap-10">
        <section className="lg:w-[70%]">
          {!cart ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <ul className="flxColStart  gap-10">
                {cart.map((itm) => (
                  <li
                    className="bg-white rounded-xl p-5 md:flxRowStart max-w-[900px]"
                    key={itm.productId._id}
                  >
                    <Link
                      className="pb-5 hover:underline md:hidden"
                      to={`/product-details/${itm.productId._id}`}
                    >
                      <h1 className="pb-4">{itm.productId.name}</h1>
                    </Link>
                    <div className="max-md:hidden min-w-[20%] h-[10rem]">
                      <img
                        className=" h-full  object-cover"
                        src={
                          itm.productId.images ? itm.productId.images[0] : ""
                        }
                        alt="product image"
                      />
                    </div>
                    <section className="flxRowStart flex-wrap md:px-5">
                      <Link
                        className="mb-4 hover:underline max-md:hidden w-full"
                        to={`/product-details/${itm.productId._id}`}
                      >
                        <h1>{itm.productId.name}</h1>
                      </Link>
                      <div className="md:hidden w-[33%] h-[10rem]">
                        <img
                          className=" h-full  object-cover"
                          src={
                            itm.productId.images ? itm.productId.images[0] : ""
                          }
                          alt="product image"
                        />
                      </div>
                      <div className="max-md:px-5 w-[60%] flex flex-col justify-center gap-5">
                        <div className="flxBtw items-center ">
                          <span className="text-sm flxRowStart items-center gap-1">
                            <h1 className="max-md:hidden">Quantity</h1>
                            <EditProductQuantity
                              quantity={
                                loadingQuantity
                                  ? "..."
                                  : itm.quantity
                                  ? itm.quantity.toString()
                                  : "1"
                              }
                              onchange={(e) => {
                                handleQuantityChange(e, itm);
                              }}
                            />
                          </span>
                          <span className="font-[500]">
                            ${itm.productId.price}.00
                          </span>
                        </div>
                        <span className="highlightTextCol underline text-xs flxBtw">
                          <button
                            onClick={() => {
                              deleteMutation(itm.productId._id as string);
                            }}
                            className="underline"
                          >
                            {isLoadingDeletion ? "removing..." : "Remove item"}
                          </button>
                          <button className="underline">Save for later</button>
                        </span>
                      </div>
                      <div className="text-xs rounded-xl border-[1px] py-1 px-3 mt-3">
                        <h1 className="text-sm font-[500]">Description</h1>
                        <p className="mt-2 leading-5">
                          {itm.productId.description
                            .split(" ")
                            .slice(0, 30)
                            .join(" ") + "..."}
                        </p>
                      </div>
                    </section>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <section className="rounded-xl p-5 bg-white text-lg lg:w-[30%] w-full flxColStart gap-5 h-fit border-[2px] highlightBorderCol">
          <h1 className="font-[500]">Cart summary</h1>
          <p>{cart.length} item(s)</p>
          <p>Total: ${total.toFixed(2)}</p>
          <Button
            disabled={ischeckOutLoading}
            click={onCheckOut}
            name={ischeckOutLoading ? "Loading..." : "Checkout"}
            styles="text-white capitalize max-lg:w-full"
          />
        </section>
      </div>
    </div>
  );
};

export default Cart;
