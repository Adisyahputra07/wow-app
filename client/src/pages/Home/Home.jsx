import { API } from "../../config/api.js";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext.js";
import HomeCss from "./Home.module.css";
import jumbotron1 from "../../assets/jumbotron1.png";
// Component
import SideBar from "../../components/SideBar/SideBar";
import CardBook from "../../components/Card/Card";

export default function Home() {
  const [state, dispatch] = useContext(UserContext);
  const [books, setBooks] = useState([]);
  // const id = state.users.id;

  // Get Data Books
  const getBooks = async () => {
    const response = await API.get("/books");
    setBooks(response.data.books);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <div className={HomeCss.homeContainer}>
        <SideBar />
        {/* Jombotron */}
        <div className={HomeCss.sideJombotron}>
          <img src={jumbotron1} alt="jumbotron1" width="100%" />
          {/* Card */}
          <div className={HomeCss.listCard}>
            <section>
              <div className="ms-4">
                <div className="row mt-1">
                  <div className="col">
                    <h3 className={HomeCss.titleCard}>List Book</h3>
                  </div>
                </div>
                <div className="row" style={{ margin: "none !important" }}>
                  {books.map((item) => (
                    <div class="col-3 mt-2 mb-5" key={item.id}>
                      <CardBook book={item} iconDelete={false} click={true} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
