import React, { useEffect, useState, useContext } from "react";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import incomeCss from "./IncomeTransaction.module.css";
// components
import NavbarPages from "../../components/NavbarPages/NavbarPages";
import { Table, Dropdown } from "react-bootstrap";
import { BsFillFileEarmarkCheckFill, BsFillFileEarmarkExcelFill } from "react-icons/bs";
import iconAction from "../../assets/iconAction.svg";

export default function IncomeTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [action, setAction] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const getData = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data.data);
  };

  const handleApprove = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let approve = {
        paymentStatus: "Approve",
      };

      const res = await API.patch(`/transaction/${id}`, approve, config);
      dispatch({
        type: "SUBSCRIBE",
        payload: true,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setAction(!action);
  };

  const handleCancel = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let cancel = {
        paymentStatus: "Cancel",
      };

      const res = await API.patch(`/transaction/${id}`, cancel, config);

      console.log(res);
      setAction(!action);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [action]);

  return (
    <>
      <NavbarPages />
      <div style={{ margin: "50px 50px", fontSize: "1em" }}>
        <h2 className="mb-4 ">Incoming Transaction</h2>
        <Table striped hover style={{ backgroundColor: "", padding: "20px !important" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid grey" }}>
              <th className="text-danger">No</th>
              <th className="text-danger">Users</th>
              <th className="text-danger">Transfer Proof</th>
              <th className="text-danger">Remaining Active</th>
              <th className="text-danger">Status User</th>
              <th className="text-danger">Status Payment</th>
              <th className="text-center text-danger">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((items, i) => (
              // <div style={{ borderBottom: "3px solid grey" }}>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{items.Users.fullName}</td>
                <td>
                  <a href={`http://localhost:5000/uploads/${items.transferProof}`} target="_blank">
                    <img
                      src={`http://localhost:5000/uploads/${items.transferProof}`}
                      alt="bukti-tf"
                      style={{
                        width: "30px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                </td>
                <td>{items.remainingActive} / Hari</td>
                <td>
                  {items.userStatus === "not Active" ? (
                    <span className="text-danger"> Not Active</span>
                  ) : (
                    <span className="text-success">Active</span>
                  )}
                </td>
                <td>
                  {items.paymentStatus === "Approve" ? (
                    <span className="text-success">Approve</span>
                  ) : items.paymentStatus === "panding" ? (
                    <span className="text-warning">Panding</span>
                  ) : (
                    <span className="text-danger">cancel</span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {items.paymentStatus === "Approve" ? (
                    <BsFillFileEarmarkCheckFill color="green" style={{ marginLeft: "13px" }} />
                  ) : items.paymentStatus === "Cancel" ? (
                    <BsFillFileEarmarkExcelFill color="red" style={{ marginLeft: "13px" }} />
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle className={incomeCss.ddToggle} variant="secondary">
                        <img src={iconAction} alt="" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={incomeCss.dropdownAction} variant="light">
                        <Dropdown.Item
                          className="text-success fw-bold"
                          onClick={() => handleApprove(items?.id)}
                        >
                          Approved
                        </Dropdown.Item>

                        <Dropdown.Item
                          className="text-danger fw-bold"
                          onClick={() => handleCancel(items?.id)}
                        >
                          Cancel
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
