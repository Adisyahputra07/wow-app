import React, { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../context/userContext";
// components
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import NavbarCss from "./NavbarPages.module.css";
import imgDefault from "../../assets/imgDefault.png";
import ModalValidasi from "../ModalValidasi/ModalValidasi";
import icon from "../../assets/icon.png";
import iconAddbook from "../../assets/group1.svg";
import iconLogout from "../../assets/logout1.svg";
import transaction from "../../assets/transaction.png";

export default function NavbarPages() {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const path = `http://localhost:5000/uploads/`;

  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <>
        <Navbar style={{ height: "150px" }}>
          <Container fluid style={{ padding: "30px" }}>
            <Navbar.Brand
              onClick={() => history.push(state.user.roleId === 1 ? "/home" : "/home-admin")}
            >
              <img src={icon} alt="icon" />
            </Navbar.Brand>
            <Nav className="ms-auto">
              {state.user.roleId === 2 ? (
                <>
                  <Dropdown as={Nav.Item} className="ml-3 d">
                    <Dropdown.Toggle as={Nav.Link} className={NavbarCss.ddToggle}>
                      <img
                        className=""
                        src={state.user.image ? path + state.user.image : imgDefault}
                        alt="user pic"
                        width="50px"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      align="right"
                      style={{
                        left: "-8em",
                        marginTop: "10px",
                        width: "200px",
                      }}
                      className={NavbarCss.dropdownMenu}
                    >
                      <Dropdown.Item
                        onClick={() => history.push("/add-book")}
                        className="d-flex fs-6 fw-bold"
                      >
                        <img
                          src={iconAddbook}
                          alt=""
                          className="me-2 mb-2"
                          style={{
                            width: "25px",
                          }}
                        />
                        <p>Add Book</p>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          history.push("/income-transaction");
                        }}
                        className="d-flex fs-6 fw-bold"
                      >
                        <img
                          src={transaction}
                          alt=""
                          className="me-2 mb-2"
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "grey !important",
                            objectFit: "cover",
                          }}
                        />
                        <p style={{ paddingLeft: "3px" }}>Transaction</p>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setModalShow(true)}
                        className="d-flex fs-6 fw-bold"
                      >
                        <img
                          src={iconLogout}
                          alt=""
                          className="me-2 mb-2"
                          style={{
                            width: "25px",
                          }}
                        />
                        <p>Logout</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : null}
            </Nav>
          </Container>
        </Navbar>
      </>
      <ModalValidasi show={modalShow} hide={() => setModalShow(false)} />
    </div>
  );
}
