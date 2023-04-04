import React, { useState } from "react";
import styles from "./style.module.scss";

const Pagination = ({ pokemonsPerPage, totalPokemons, currentPage, paginate, prevPage, nextPage }) => { // передаємо пропси
  const pageNumbers = [];
  const [selectedPage, setSelectedPage] = useState(currentPage);

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) { // рахуємо к-ть сторінок на основі к-ть покемонів
    pageNumbers.push(i);
  }

  const handlePageClick = (number) => { // перехід на сторінку по кліку на цифру сторінки
    setSelectedPage(number);
    paginate(number);
  };

  const handlePrevClick = () => { // передаємо поточну сторінку (назад), перевіряємо, якщо 1 сторінка, то назад неможна перейти
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
      prevPage();
    }
  };

  const handleNextClick = () => { // передаємо поточну сторінку (вперед)
    if (selectedPage < Math.ceil(totalPokemons / pokemonsPerPage)) {
      setSelectedPage(selectedPage + 1);
      nextPage();
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={`${styles.btn_prev} ${styles.btn}`} onClick={handlePrevClick}>&#8249;</div> {/* кнопка зі стрілкою вперед */}
      {pageNumbers.map((number) => ( // робимо кнопки від 1 до 10 (в залежності від к-ть покемонів)
        <div
          className={`${styles.page_item} ${selectedPage === number ? styles.selected_page : ""}`}
          key={number}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </div>
      ))}
      <div className={`${styles.btn_next} ${styles.btn}`} onClick={handleNextClick}>&#8250;</div> {/* кнопка зі стрілкою назад */}
    </div>
  );
};

export default Pagination;