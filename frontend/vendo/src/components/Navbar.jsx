import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/">
                    Vendo
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/">
                        Products
                    </Link>

                    <Link className="nav-link" to="/login">
                        Login
                    </Link>

                    <Link className="nav-link" to="/register">
                        Register
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;