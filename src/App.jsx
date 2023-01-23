import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import React, { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPassword from "./pages/AddPassword";
import MasterPassword from "./pages/MasterPassword";
import { AccountContext } from "./context/AccountProvider";

const App = () => {
    const { account } = useContext(AccountContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={!account ? <Navigate to="/login" /> : <Home />}
                    />
                    <Route
                        path="login"
                        element={account ? <Navigate to="/" /> : <Login />}
                    />
                    <Route
                        path="register"
                        element={account ? <Navigate to="/" /> : <Register />}
                    />
                    <Route
                        path="add-new-password"
                        element={
                            !account ? (
                                <Navigate to="/login" />
                            ) : (
                                <AddPassword />
                            )
                        }
                    />
                    <Route
                        path="master-password"
                        element={
                            !account ? (
                                <Navigate to="/login" />
                            ) : (
                                <MasterPassword />
                            )
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
