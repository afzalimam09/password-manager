import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AccountContext } from "../context/AccountProvider";
import { apiRequest } from "../requestMethods";

const Navbar = () => {
    const { account, setAccount } = useContext(AccountContext);
    const path = useLocation().pathname;
    const handleLogout = async () => {
        try {
            const res = await apiRequest.get("/auth/logout");
            setAccount(null);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Password Manager
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        {account ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/"
                                        className={`nav-link ${
                                            path === "/" ? "active" : ""
                                        }`}
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        to="/add-new-password"
                                        className={`nav-link ${
                                            path === "/add-new-password"
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        Add Password
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        to="/master-password"
                                        className={`nav-link ${
                                            path === "/master-password"
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        Master Password
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <span
                                        style={{ cursor: "pointer" }}
                                        onClick={handleLogout}
                                        className="nav-link pe-auto text-danger"
                                    >
                                        Logout
                                    </span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/login"
                                        className={`nav-link ${
                                            path === "/login" ? "active" : ""
                                        }`}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/register"
                                        className={`nav-link ${
                                            path === "/register" ? "active" : ""
                                        }`}
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
