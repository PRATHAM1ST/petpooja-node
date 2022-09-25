const Container = () =>{
    return (
        <>
        <div className="container">
            <div className="row ">
            <div className="col-auto">
                <h1>Pet Pooja</h1>
                <h6>Semester 7 Project</h6>
                <p>Please click any of the button to visit following section</p>
            </div>
            </div>
            <div className="row">
            <div className="col-auto mt-2">
                <a target="_blank" href="./admin">
                    <button className="btn btn-outline-primary me-1">Admin</button>
                </a>
                <a target="_blank" href="./cook">
                    <button className="btn btn-outline-primary mx-1">Cook</button>
                </a>
                <a target="_blank" href="./manager">
                    <button className="btn btn-outline-primary ms-1">Manager</button>
                </a>
            </div>
            </div>
        </div>
        </>
    );
}

export default Container;