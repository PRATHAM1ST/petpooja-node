const Nav = ({navtype}) =>{
  console.log(navtype);
    return(
        <div className="navi height100 blackbg text-center p-0">
        <h1 className="p-4">Pet Pooja</h1>
        <div className="">
          <a href="/admin">
            <div className={`navitems p-3 w-100 ${navtype == "Dashboard" ? 'active' : '' }`}>Dashboard</div>
          </a>
          <a href="/fooditems">
            <div className={`navitems p-3 w-100 ${navtype == "Food Items" ? 'active' : '' }`}>Food Items</div>
          </a>
          {navtype == "Make Bill" && <div className={`navitems p-3 w-100 active`}>Make Bill</div>}
        </div>
      </div>
    );
}

export default Nav;