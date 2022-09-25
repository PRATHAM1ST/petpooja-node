import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./Nav";

const TableDetails = () => {
  const params = useParams();
  const [tableFood, setTableFood] = useState([]);
  const [tableBill, setTableBill] = useState([]);

  useEffect(() => {
    let totalbilltemp = 0;
    tableFood.forEach((element) => {
      totalbilltemp += element.total;
    });
    setTableBill(totalbilltemp);
  }, [tableFood]);

  useEffect(() => {
    Array.from(
      fetch(`http://localhost:3001/gettable/${params.tableId}/`)
        .then((res) => res.json())
        .then((data) => {
          setTableFood([...data]);
        })
        .catch(function (err) {
          throw err;
        })
    );
    document.title = "Table " + params.tableId;
  }, []);

  const resetTable = () => {
    setTableFood([]);
    setTableBill([]);
    fetch(`http://localhost:3001/resttable/${params.tableId}`, {
      method: "POST",
    })
      .then((res) => console.log(res))
      .catch(function (err) {
        throw err;
      });
  };

  return (
    <>
      <Nav navtype="Make Bill"/>
      <div className="main p-5" id="table">
        <h1>Table {params.tableId}</h1>
        {tableFood.length > 0 && (
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">Food Item</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {tableFood.map(function (foodItem) {
                return (
                  <tr key={foodItem.id}>
                    <th scope="row">{foodItem.fooditem}</th>
                    <td>{foodItem.foodprice}</td>
                    <td>{foodItem.quantity}</td>
                    <td>{foodItem.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="px-5 pb-5">
        <div className="d-flex justify-content-end">
          <h4>
            Total: <code id="totalbill">{tableBill}</code>
          </h4>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-danger" onClick={resetTable}>
            Reset Table
          </button>
          <a
            className="btn btn-outline-success ms-4"
            id="makebill"
            href={`/bill/${params.tableId}`}
            target="_blank"
          >
            Make Bill
          </a>
        </div>
      </div>
    </>
  );
};

export default TableDetails;
