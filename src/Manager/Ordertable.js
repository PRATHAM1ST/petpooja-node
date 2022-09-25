import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Ordertable = () => {
  const params = useParams();
  const [tableFood, setTableFood] = useState([]);
  const [menu, setMenu] = useState([]);
  const [menuSearch, setMenuSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [tableBill, setTableBill] = useState([]);

  const decrement = (id) => {
    tableFood.forEach((food) => {
      if (food.id == id) {
        if (food.quantity == 1) {
          deleteFromList(id);
        }
        fetch(
          `http://localhost:3001/updatefooditemquantity/${food.id}/${(food.quantity - 1)}/${(food.quantity - 1) * food.foodprice}`,
          {
            method: "POST",
          }
        )
          .then(() => refresh())
          .catch((error) => error);
      }
    });
  };

  const increment = (id) => {
    tableFood.forEach((food) => {
      if (food.id == id) {
        fetch(
          `http://localhost:3001/updatefooditemquantity/${food.id}/${
            food.quantity + 1
          }/${(food.quantity + 1) * food.foodprice}`,
          {
            method: "POST",
          }
        )
          .then(() => refresh())
          .catch((error) => error);
      }
    });
  };

  const deleteFromList = (id) => {
    fetch(`http://localhost:3001/deletefooditem/${id}`, {
      method: "DELETE",
    })
      .then(() => refresh())
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].name.toLowerCase().includes(search)) {
        temp.push(menu[i]);
      }
    }
    setMenuSearch(temp);
  }, [search, menu]);

  const refresh = () => {
    fetch(`http://localhost:3001/gettable/${params.tableId}/`)
      .then((res) => res.json())
      .then((data) => {
        setTableFood([...data]);
      })
      .catch(function (err) {
        throw err;
      });
  };

  const addFoodItem = (foodItem) => {
    fetch(`http://localhost:3001/addfooditem`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodid: parseInt(foodItem.id),
        fooditem: foodItem.name,
        foodprice: parseInt(foodItem.price),
        quantity: 1,
        total: parseInt(foodItem.price),
        tablenumber: parseInt(params.tableId),
        status: 0,
      }),
    })
      .then(() => refresh())
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    let totalbilltemp = 0;
    tableFood.forEach((element) => {
      totalbilltemp += element.total;
    });
    setTableBill(totalbilltemp);
  }, [tableFood]);

  const addTableMenu = ()=>{
    fetch(`http://localhost:3001/getmenuattable/${params.tableId}`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      })
      .catch((err) => {throw err});
  }

  useEffect(() => {
    refresh();
    addTableMenu();
    document.title = "Table " + params.tableId;
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div
            className="col-auto mx-auto display-5"
            id={`tablenumber${params.tableId}`}
          >
            Table {params.tableId}
          </div>
        </div>
        <div className="row" onClick={addTableMenu}>
          {/* Button trigger modal */}
          <div className="col-auto ms-auto">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#AddFoodItem"
            >
              Add Food Item
            </button>
          </div>

          {/* Modal */}
          <div
            className="modal fade"
            id="AddFoodItem"
            tabIndex="-1"
            aria-labelledby="AddFoodItemLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="AddFoodItemLabel">
                    Add Food
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Food Item"
                    id="search"
                    onChange={(e)=>setSearch(e.target.value)}
                    value={search}
                    autoComplete="off"
                  />
                  <hr />
                  <div className="fooditem" id="fooditems">
                    {menuSearch.map((foodItem) => (
                      <div
                        className="col-auto btn rounded-pill bg-primary bg-gradient text-white m-1"
                        key={foodItem.id}
                        onClick={() => addFoodItem(foodItem)}
                      >
                        {foodItem.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12" id="table">
            <table className="table table-hover w-100 mt-5">
              <thead>
                <tr>
                  <th scope="col">Sr. No</th>
                  <th scope="col">Food Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {tableFood.map(function (foodItem) {
                  return (
                    <tr key={foodItem.id}>
                      <td>
                        {tableFood.map((value, index) =>
                          foodItem === value ? index + 1 : ""
                        )}
                      </td>
                      <td scope="row">{foodItem.fooditem}</td>
                      <td>{foodItem.foodprice}</td>
                      <td className="h-100 d-flex justify-content-around">
                        <button
                          className="btn btn-danger py-0"
                          onClick={() => decrement(foodItem.id)}
                        >
                          -
                        </button>
                        {foodItem.quantity}
                        <button
                          className="btn btn-success py-0"
                          onClick={() => increment(foodItem.id)}
                        >
                          +
                        </button>
                      </td>
                      <td>{foodItem.total}</td>
                      <td>
                        <div
                          className="m-0 p-0"
                          onClick={() => deleteFromList(foodItem.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="23"
                            height="23"
                            viewBox="0 0 172 172"
                            style={{ fill: "#000000" }}
                          >
                            <g
                              fill="none"
                              fillRule="nonzero"
                              stroke="none"
                              strokeWidth="1"
                              strokeLinecap="butt"
                              strokeLinejoin="miter"
                              strokeMiterlimit="10"
                              strokeDasharray=""
                              strokeDashoffset="0"
                              fontFamily="none"
                              fontWeight="none"
                              fontSize="none"
                              textAnchor="none"
                              style={{ mixBlendMode: "normal" }}
                            >
                              <path d="M0,172v-172h172v172z" fill="none"></path>
                              <g fill="#e74c3c">
                                <path d="M130.40408,56.16327h-88.80816c-0.96084,-0.08151 -1.91289,0.23584 -2.63265,0.87755c-0.70765,0.67985 -1.03576,1.66419 -0.87755,2.63265l9.12653,79.50612c1.07015,8.76566 8.54501,15.33447 17.37551,15.26939h44.22857c9.0789,0.12923 16.7265,-6.75362 17.55102,-15.79592l7.54694,-79.33061c0.04677,-0.85097 -0.2726,-1.68132 -0.87755,-2.28163c-0.71976,-0.64171 -1.67182,-0.95906 -2.63265,-0.87755zM119.34694,138.30204c-0.55157,5.34456 -5.16192,9.34019 -10.53061,9.12653h-44.22857c-5.2721,0.21399 -9.80403,-3.70343 -10.3551,-8.95102l-8.77551,-75.29388h81.08571zM143.21633,33.34694h-36.1551v-5.61633c0.09687,-2.69772 -0.92009,-5.31653 -2.81222,-7.24186c-1.89213,-1.92533 -4.49286,-2.98768 -7.19186,-2.93773h-22.11429c-2.69899,-0.04994 -5.29972,1.0124 -7.19186,2.93773c-1.89213,1.92533 -2.90909,4.54414 -2.81222,7.24186v5.61633h-36.1551c-1.93863,0 -3.5102,1.57157 -3.5102,3.5102c0,1.93863 1.57157,3.5102 3.5102,3.5102h114.43265c1.93863,0 3.5102,-1.57157 3.5102,-3.5102c0,-1.93863 -1.57157,-3.5102 -3.5102,-3.5102zM71.95918,33.34694v-5.61633c-0.10734,-0.83501 0.16562,-1.67413 0.74367,-2.28619c0.57806,-0.61206 1.40022,-0.93248 2.24,-0.87299h22.11429c0.83978,-0.05949 1.66194,0.26093 2.24,0.87299c0.57806,0.61206 0.85101,1.45118 0.74367,2.28619v5.61633z"></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="text-end h5">Total : {tableBill}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ordertable;
