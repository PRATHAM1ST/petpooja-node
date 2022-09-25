import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Nav from "./Nav";

const EditFood = () => {
  const params = useParams();
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  useEffect(() => {
    fetch(`http://localhost:3001/getfood/${params.foodId}`)
      .then((res) => res.json())
      .then((data) => {
        setFoodName(data[0].name);
        setFoodPrice(data[0].price);
      })
      .catch(function (err) {
        throw err;
      });
  }, []);

  const submitForm = () => {
    fetch(`http://localhost:3001/updatemenufood/${params.foodId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: foodName,
        price: foodPrice
      }),
    })
  };


  return (
    <>
      <Nav navtype="Food Items"/>
      <div className="main p-5">
        <div className="row">
          <h1 className="my-3 mb-5">Edit Food Item</h1>
          <form action="" className="" onSubmit={submitForm}>
            <input
              type="text"
              className="mb-3 form-control"
              placeholder="Food Item"
              id="foodName"
              autoComplete="off"
              onChange={(e) => setFoodName(e.target.value)}
              value={foodName}
              required
            />
            <input
              type="number"
              className="mb-3 form-control"
              placeholder="Price"
              id="foodPrice"
              autoComplete="off"
              onChange={(e) => setFoodPrice(e.target.value)}
              value={foodPrice}
              required
            />
            <input type="submit" className="btn btn-outline-success" />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFood;
