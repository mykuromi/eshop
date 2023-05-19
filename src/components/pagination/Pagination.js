import { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;

  const [pageNumberLimit, setPageNumberlimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberlimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberlimit] = useState(5);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMinPageNumberlimit(minPageNumberLimit - pageNumberLimit);
      setMaxPageNumberlimit(maxPageNumberLimit - pageNumberLimit);
    }
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMinPageNumberlimit(minPageNumberLimit + pageNumberLimit);
      setMaxPageNumberlimit(maxPageNumberLimit + pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}
      >
        Prev
      </li>

      {pageNumbers.map((number) => {
        if (minPageNumberLimit < number && number < maxPageNumberLimit + 1) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : null
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </div>
  );
};

export default Pagination;
