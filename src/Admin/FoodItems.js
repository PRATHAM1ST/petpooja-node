import { useEffect, useState } from "react";
import Nav from "./Nav";

const FoodItems = () => {
  const [menu, setMenu] = useState([]);
  const [menuSearch, setMenuSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  const refresh = () => {
    fetch(`http://localhost:3001/getmenu`)
      .then((res) => res.json())
      .then((data) => {
        setMenu([...data]);
      })
      .catch(function (err) {
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

  useEffect(() => {
    refresh();
    document.title = "Food Items";
  }, []);

  const addFoodItem = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/addmenufood`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: foodName,
        price: parseInt(foodPrice),
      }),
    })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
    setFoodName("");
    setFoodPrice("");
    refresh();
  };

  const deleteFoodItem = (id) => {
    fetch(`http://localhost:3001/deletemenufood/${id}`, {
      method: "POST",
    }).then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
    refresh();
  };

  return (
    <>
      <Nav navtype="Food Items"/>
      <div className="main p-5">
        <div className="row">
          <form
            action="http://localhost:3001/addfooditem"
            method="post"
            className="input-group"
            onSubmit={(e) => addFoodItem(e)}
          >
            <input
              name="foodName"
              type="text"
              className="h-100 form-control"
              placeholder="Food Item"
              id="foodName"
              autoComplete="off"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
            <input
              name="foodPrice"
              type="number"
              className="h-100 form-control"
              placeholder="Price"
              id="foodPrice"
              autoComplete="off"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              required
            />
            <input type="submit" className="btn btn-outline-primary" />
          </form>
        </div>
        <input
          type="text"
          className="form-control mt-5"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          style={{ background: "#daffe7" }}
        />
        <table id="table" className="table mt-5">
          <thead>
            <tr>
              <th scope="col">Food Item</th>
              <th scope="col">Price</th>
              <th scope="col">Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {menuSearch.length > 0 &&
              menuSearch.map(function (item) {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.name}</th>
                    <td>{item.price}</td>
                    <td>
                      <a href={`/editfood/${item.id}`}>
                        <img src="./assests/edit.svg" alt="" />
                      </a>
                      <a>
                        <img
                          src="./assests/delete.svg"
                          className="ms-3"
                          alt=""
                          onClick={() => deleteFoodItem(item.id)}
                        />
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FoodItems;
