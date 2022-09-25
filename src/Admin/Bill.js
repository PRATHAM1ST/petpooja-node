import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Bill = () => {
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
    document.title = "Bill";
  }, []);

  return (
    <div
      className="container px-5"
      style={{ backgroundColor: "rgb(240, 240, 240)" }}
    >
      <div className="row">
        <div className="col-auto mt-4">
          <h1>Pet Pooja</h1>
          <p className="m-0">Visat, Ahmedabad, Gujarat - 382721</p>
          <p className="m-0">Tel : +91 98765 65432</p>
          <p className="m-0">Email : info@petpooja.com</p>
        </div>
      </div>
      <div className="row my-4 border border-info p-2">
        <div className="col-3">
          Bill No. : {new Date().getTime().toString().slice(8)}
        </div>
        <div className="col-3">Date : {new Date().toLocaleDateString()}</div>
        <div className="col-3">
          Time : {new Date().getHours() + ":" + new Date().getMinutes()}
        </div>
        <div className="col-3">
          Table : <span id="tableid">{params.tableId}</span>
        </div>
      </div>
      <div className="row" id="table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
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
                  <th scope="row">{foodItem.id}</th>
                  <th>{foodItem.fooditem}</th>
                  <td>{foodItem.foodprice}</td>
                  <td>{foodItem.quantity}</td>
                  <td>{foodItem.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="row">
          <h5 className="text-end">
            Sub Total : <span id="subtotal">{tableBill}</span>
          </h5>
          <p className="text-end">
            Tax ( 8% ) : <span id="tax">{tableBill * 0.08}</span>
          </p>
          <h5 className="text-end">
            Gross Total : <span id="total">{tableBill + tableBill * 0.08}</span>
          </h5>

          <h4 className="text-center my-3">Thank You! Visit Again</h4>
        </div>
      </div>
    </div>
  );
};

export default Bill;
