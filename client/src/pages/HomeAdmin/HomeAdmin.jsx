import React, { useEffect, useState } from "react";
import NavbarPages from "../../components/NavbarPages/NavbarPages";
import CardBook from "../../components/Card/Card";
import { API } from "../../config/api";
import "./Home.module.css";

export const HomeAdmin = () => {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    const response = await API.get("/books");
    setBooks(response.data.books);
    books.map((item) => {
      console.log(item);
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <NavbarPages />
      {/* Card */}
      <div>
        <div className="container">
          <section>
            <div className="ms-4">
              <div className="row mt-1">
                <div className="col">
                  <h3>List Book</h3>
                </div>
              </div>
              <div className="row">
                {books.map((item) => (
                  <div class="col-3 mt-2 mb-5" key={item.id}>
                    <CardBook book={item} iconDelete={false} tekan={false} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
