import React, { useEffect, useState } from "react";
import { ReactReader } from "react-reader";
import { API } from "../../config/api";
import { useParams } from "react-router-dom";
// components
import NavbarPages from "../../components/NavbarPages/NavbarPages";

export default function ReadBook() {
  const [location, setLocation] = useState(null);
  const [book, setBook] = useState("");
  const { id } = useParams();

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  const getBook = async () => {
    try {
      const response = await API.get("/book/" + id);
      setBook(response.data.data.book);
    } catch (error) {
      console.log(error);
    }
  };

  // if call component
  useEffect(() => {
    getBook();
  }, []);

  return (
    <div>
      <div>
        <NavbarPages />
      </div>
      <div
        className="shadow"
        style={{ height: "100vh", boxSizing: "border-box", position: "relative", margin: "50px" }}
      >
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={`http://localhost:5000/uploads/${book.bookFile}`}
        />
      </div>
    </div>
  );
}
