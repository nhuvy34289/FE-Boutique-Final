import { toast } from "react-toastify";
import queryString from "query-string";

export const replaceString = (string, old, news) => {
  return string.replace(old, news);
};

export const toastError = (msg) => {
  return toast.error(`${msg}`, {
    position: "top-right",
  });
};

export const toastSuccess = (msg) => {
  return toast.success(`${msg}`, {
    position: "top-right",
  });
};

export const removeCharacters = (string) => {
  return string.replace(/['"]+/g, "");
};

export const queryFormat = (object) => {
  const query = "?" + queryString.stringify(object);
  return query;
};

export const convertStringToNumber = (string) => {
  return parseInt(string);
};

export const addNewData = (oldData, curData) => {
  const newData = oldData.push(curData);
  return newData;
};

export const deleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};

export const editData = (data, id, currentData) => {
  const newData = data.map((item) => (item._id === id ? currentData : data));
  return newData;
};

export const formatCurrency = (number) => {
  return "$" + Number(number.toFixed(1)).toLocaleString() + " ";
};

export const totalCaculating = (item) => {
  const itemPrice = item?.reduce(
    (a, c) => a + parseInt(c?.priceProduct) * parseInt(c?.count),
    0
  );
  const taxPrice = itemPrice * 0.1;
  const shippingPrice = itemPrice < 2000 ? 0 : 50;
  const totalPrice = itemPrice + shippingPrice + taxPrice;
  return totalPrice;
};

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const cloneItem = (item) => {
  let newItem = JSON.parse(JSON.stringify(item));
  newItem = newItem.slice();
  return newItem;
};

export const percentageCaculating = (a, b) => {
  let totalValue = ((Number(b) - Number(a)) / a) * 100;
  console.log(totalValue);
  totalValue = totalValue.toFixed(2);
  return totalValue;
};


// const allProduct = [
//   {
//     id: "123",
//     name: "abc",
//     count: 45,
//   },
//   {
//     id: "1234",
//     name: "abcc",
//     count: 15,
//   },
//   {
//     id: "1235",
//     name: "abcd",
//     count: 50,
//   },
// ];

// const cart = [
//   {
//     productId: "123",
//     count: 105,
//   },
//   {
//     productId: "1235",
//     count: 305,
//   },
// ];

// const decreaseCount = () => {
//   allProduct.map((product) => {
//     cart.map((item) => {
//       if (item.productId === product.id) {
//         if (item.count > product.count) {
//           console.log("So luong ban dat vuot qua so luong san pham hien co");
//         } else {
//           product.count = product.count - item.count;
//           console.log(product);
//         }
//       }
//     });
//   });
// };

// decreaseCount();
