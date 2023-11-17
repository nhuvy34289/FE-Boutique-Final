import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/common";

const CartItems = ({
  item,
  handelIncreaseProduct,
  handelDecreaseProduct,
  handleDeleteCartItem,
}) => {
  return (
    <>
      <tr className="text-center">
        <td className="pl-0 border-0">
          <div className="media align-items-center justify-content-center">
            <Link
              className="reset-anchor d-block animsition-link"
              to={`/detail/${item.idProduct}`}
            >
              <img src={item.img.url} alt="..." width="70" />
            </Link>
          </div>
        </td>

        <td className="align-middle border-0">
          <div className="media align-items-center justify-content-center">
            <Link
              className="reset-anchor h6 animsition-link"
              to={`/detail/${item.idProduct}`}
            >
              {item.nameProduct}
            </Link>
          </div>
        </td>

        <td className="align-middle border-0">
          <p className="mb-0 small">{item.priceProduct}</p>
        </td>
        <td className="align-middle border-0">
          <p className="mb-0 text-bold small ">{item.sizeProduct}</p>
        </td>

        <td className="align-middle border-0">
          <div className="quantity justify-content-center">
            <button
              className="dec-btn p-0"
              style={{ cursor: "pointer" }}
              onClick={() => handelDecreaseProduct(item)}
            >
              <i className="fas fa-caret-left"></i>
            </button>
            <p>{item.count}</p>
            <button
              className="inc-btn p-0"
              style={{ cursor: "pointer" }}
              onClick={() => handelIncreaseProduct(item)}
            >
              <i className="fas fa-caret-right"></i>
            </button>
          </div>
        </td>
        <td className="align-middle border-0">
          <p className="mb-0 small">
            {formatCurrency(item.priceProduct * item.count)}
          </p>
        </td>
        <td className="align-middle border-0">
          <button
            className="reset-anchor remove_cart"
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteCartItem(item)}
          >
            <i className="fas fa-trash-alt small text-muted"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItems;
