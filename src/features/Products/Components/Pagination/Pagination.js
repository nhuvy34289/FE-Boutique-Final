import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ pagination, handleChangePage, totalPage }) => {
  const { page } = pagination;
  const onDownPage = (value) => {
    if (!handleChangePage) {
      return;
    }

    const newPage = parseInt(value) - 1;
    handleChangePage(newPage);
  };

  const onUpPage = (value) => {
    if (!handleChangePage) {
      return;
    }

    const newPage = parseInt(value) + 1;
    handleChangePage(newPage);
  };

  return (
    <>
      <nav aria-label="Page navigation example" className="pt-5">
        <ul className="pagination justify-content-center justify-content-lg-end">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onDownPage(page)}
              disabled={page <= 1}
            >
              <span>«</span>
            </button>
          </li>

          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onUpPage(page)}
              disabled={page >= totalPage}
            >
              <span>»</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object,
  handleChangePage: PropTypes.func,
  totalPage: PropTypes.number,
};

Pagination.defaultProps = {
  pagination: {},
  handleChangePage: null,
  totalPage: null,
};

export default Pagination;
