import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CategoryAPI from "../../../../api/categoryApi";
import Loading from "../../../../assets/loading.gif";
import "./style.css";
const Category = ({ handleCategory }) => {
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const [isActive, setIsActive] = useState("All");
  const dispatch = useDispatch();

  const fetchCategory = async () => {
    try {
      const res = await CategoryAPI.getCategories();
      setCategories(res.categories);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setLoad(true);
    fetchCategory();
    setLoad(false);

    return () => setCategories([]);
  }, [dispatch]);

  const handleActive = (value) => {
    setIsActive(value);
    handleCategory(value);
  };
  return (
    <>
      <div className="py-2 px-4 bg-dark text-white mb-3 mt-3">
        <strong className="small text-uppercase font-weight-bold">
          Categories
        </strong>
      </div>
      {load ? (
        <img src={Loading} alt="Loading" className="category-loading" />
      ) : (
        <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
          <li className="mb-2">
            <span
              className={
                isActive === "All" ? "reset-anchor active" : "reset-anchor"
              }
              style={{ cursor: "pointer" }}
              onClick={() => handleActive("All")}
            >
              All
            </span>
          </li>
          {categories &&
            categories.map((category) => (
              <li className="mb-2" key={category._id}>
                <span
                  className={
                    isActive === category.content
                      ? "reset-anchor active"
                      : "reset-anchor"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={() => handleActive(category.content)}
                >
                  {category.content}
                </span>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default Category;
