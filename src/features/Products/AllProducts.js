import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductAPI from "../../api/productApi";
import Footer from "../../components/Footer/Footer";
import { queryFormat } from "../../utils/common";
import Category from "./Components/Category/Category";
import Search from "./Components/Search/Search";
import SortProduct from "./Components/SortProduct/Sort";
import Pagination from "./Components/Pagination/Pagination";
import queryString from "query-string";
import { filterProducts, getProductPagination } from "./productSlice";
import Products from "./Components/Products/Products";
import ModalProduct from "./Components/ModalProduct/ModalProduct";
import RangSlider from "./Components/RangeSlider/RangSlider";
import SortSize from "./Components/SortSize/SortSize";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { productLists, productFilter } = useSelector((state) => state.product);
  const [totalPage, setTotalPage] = useState(0);
  const [pagination, setPagination] = useState({
    page: "1",
    count: "9",
    search: "",
    category: "All",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      let res;
      let totalPage;
      try {
        if (pagination.category === "All") {
          res = await ProductAPI.getProducts();
        } else {
          const params = {
            page: pagination.page,
            count: pagination.count,
            search: pagination.search,
            category: pagination.category,
          };
          const query = queryFormat(params);
          res = await ProductAPI.getProductPagination(query);
        }

        if (res.products) {
          totalPage = Math.ceil(
            parseInt(res.products.length) / parseInt(pagination.count)
          );
        } else if (res.paginationProducts) {
          totalPage = Math.ceil(
            parseInt(res.paginationProducts.length) / parseInt(pagination.count)
          );
        }
        setTotalPage(totalPage);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchAllData();
  }, [pagination]);

  useEffect(() => {
    const params = {
      page: pagination.page,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    };
    const query = queryString.stringify(params);
    const newQuery = "?" + query;
    dispatch(getProductPagination(newQuery));
  }, [pagination, dispatch]);

  const handleCategory = (value) => {
    setPagination({
      ...pagination,
      category: value,
    });
  };

  const handleSearch = (value) => {
    setPagination({
      ...pagination,
      search: value,
    });
  };

  const handleChangePage = (value) => {
    setPagination({
      ...pagination,
      page: value,
    });
  };

  const handleSort = (value) => {
    dispatch(filterProducts(value));
  };

  let data = productFilter.length > 0 ? productFilter : productLists;

  return (
    <>
      {data &&
        data.map((item, index) => <ModalProduct item={item} key={item._id} />)}

      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Shop</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item active" aria-current="page">
                      Shop
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container p-0">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                <RangSlider />
                <Category handleCategory={handleCategory} />
                <SortSize />
              </div>
              <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                <div className="row mb-3 align-items-center">
                  <Search handleSearch={handleSearch} />
                  <div className="col-lg-8">
                    <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                      <li className="list-inline-item">
                        <SortProduct handleSort={handleSort} />
                      </li>
                    </ul>
                  </div>
                </div>

                {data.length === 0 ? (
                  <>
                    {" "}
                    <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
                      <h3 className="text-center">There is no product here</h3>
                    </div>{" "}
                  </>
                ) : (
                  <>
                    <Products products={data} dispatch={dispatch} />
                    <Pagination
                      pagination={pagination}
                      handleChangePage={handleChangePage}
                      totalPage={totalPage}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
