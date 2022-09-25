import { useEffect } from "react";
import Nav from "./Nav";
import "./style.css";

const Admin = () => {
  const tables = Array.from({ length: 7 }, (_, index) => {
    return (
      <div className="foodtable p-5 m-3 text-center" key={index + 1}>
        <a className="w-100 h-100" href={"/tabledetails/" + (index + 1)}>
          Table {index + 1}
        </a>
      </div>
    );
  });

  useEffect(()=>{
    document.title = "Admin";
  },[])

  
  return (
    <>
      <Nav navtype="Dashboard"/>
      <div className="main p-5">
        <div className="row">{tables.length !== 0 && tables}</div>
      </div>
    </>
  );
};

export default Admin;
