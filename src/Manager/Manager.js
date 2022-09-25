import { useEffect } from "react";

const Manager = () => {
  
  useEffect(() => {
    document.title = "Manager";
  });

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="display-6 my-5 col-auto mx-auto">Pet Pooja</div>
        </div>
        <div class="row col-10 mx-auto">
          {}
          <div class="text-white m-5 col-auto px-5 py-3 btn rounded-pill bg-primary bg-gradient">
            <a href="ordertable/1">Table 1</a>
          </div>
          <div class="text-white m-5 col-auto px-5 py-3 btn rounded-pill bg-secondary bg-gradient">
            <a href="ordertable/2">Table 2</a>
          </div>
          <div class="text-white m-5 col-auto px-5 py-3 btn rounded-pill bg-success bg-gradient">
            <a href="ordertable/3">Table 3</a>
          </div>
          <div class="text-white m-5 col-auto px-5 py-3 btn rounded-pill bg-danger bg-gradient">
            <a href="ordertable/4">Table 4</a>
          </div>
          <div class="text-white m-5 col-auto px-5 py-3 btn rounded-pill bg-warning bg-gradient">
            <a href="ordertable/5">Table 5</a>
          </div>
          <div class="text-white m-5 col-auto px-5 py-3 btn rounded-pill bg-info bg-gradient">
            <a href="ordertable/6">Table 6</a>
          </div>
          <div class="text-white m-5 col-auto px-5 py-3 btn rounded-pill bg-dark bg-gradient">
            <a href="ordertable/7">Table 7</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
