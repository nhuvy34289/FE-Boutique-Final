import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartAPI from "../../../../api/cartApi";
import { queryFormat, toastSuccess } from "../../../../utils/common";
import { deleteCartItem, updateQualityCart } from "../../cartSlice";
import CartItems from "../CartItems/CartItems";

const CartList = ({ cartItems }) => {
  const { auth } = useSelector((state) => state);

  const { currentSocket } = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const handelIncreaseProduct = async (product) => {
    const newProduct = {
      ...product,
      count: product.count + 1,
    };
    try {
      const res = await CartAPI.increaseCartItem(newProduct);
      dispatch(updateQualityCart(res.newCart));

      currentSocket.emit("increaseCartItem", res.currentProduct);

      toastSuccess(`${res.msg}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handelDecreaseProduct = async (product) => {
    if (product.count === 1) return;

    const newProduct = {
      ...product,
      count: product.count - 1,
    };
    try {
      const res = await CartAPI.decreaseCartItem(newProduct);

      currentSocket.emit("decreaseCartItem", res.currentProduct);

      dispatch(updateQualityCart(res.newCart));
      toastSuccess(`${res.msg}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteCartItem = async (product) => {
    const newProduct = cartItems.filter((item) => item._id !== product._id);
    dispatch(deleteCartItem(newProduct));
    const countCartItem = cartItems.find((item) => item._id === product._id);
    try {
      const params = {
        idUser: auth.user._id,
        idProduct: product.idProduct,
        count: countCartItem.count,
      };

      const query = queryFormat(params);
      const res = await CartAPI.deleteToCart(query);

      currentSocket.emit("deleteCartItem", res.currentProduct);

      toastSuccess(`${res.msg}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="table-responsive mb-4">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center">
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Image</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Product</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Price</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Size</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Quantity</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Total</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Remove</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <CartItems
                  item={item}
                  key={item._id}
                  handelIncreaseProduct={handelIncreaseProduct}
                  handelDecreaseProduct={handelDecreaseProduct}
                  handleDeleteCartItem={handleDeleteCartItem}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartList;
