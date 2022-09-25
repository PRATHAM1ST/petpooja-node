import { useEffect, useState } from "react";
import "./style.css";

const Cook = () => {
  const [tables, setTables] = useState({});

  const getcookingtables = () => {
    fetch(`http://localhost:3001/getcookingtables`)
      .then((res) => res.json())
      .then((data) => {
        let temp = {};
        for (let i = 0; i < data.length; i++) {
          if (temp[data[i].tablenumber]) {
            temp[data[i].tablenumber].push(data[i]);
          } else {
            temp[data[i].tablenumber] = [data[i]];
          }
        }
        setTables(temp);
      })
      .catch(function (err) {
        throw err;
      });
  };

  useEffect(() => {
    getcookingtables();
    document.title = "Cook";
  }, []);

  const updateFoodStatus = (id) => {
    fetch(`http://localhost:3001/updatefooditemstatus/${id}`, {
      method: "POST",
    })
      .then(() => {
        getcookingtables();
      })
      .catch(function (err) {
        throw err;
      });
  };

  return (
    <>
      <div className="Navbar p-3 ps-4 text-white">
        <h1>Pet Pooja</h1>
      </div>
      <div className="container p-3">
        <div className="row d-flex" id="PendingSection">
          {Object.values(tables).map((table) => (
            <div className="mt-3 col-3" key={table[0].tablenumber}>
              <div className="card p-0">
                <h5 className="card-header">Table {table[0].tablenumber}</h5>
                <div className="card-body">
                  {table.map((food) => (
                    <div
                      className="mb-2 d-flex justify-content-between"
                      key={food.id}
                    >
                      <div>
                        {food.fooditem} ( {food.quantity} )
                      </div>
                      <div>
                        <img
                          src="./assests/tick.svg"
                          alt=""
                          onClick={() => updateFoodStatus(food.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cook;
