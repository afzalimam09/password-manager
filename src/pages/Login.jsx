import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AccountContext } from "../context/AccountProvider";
import { apiRequest } from "../requestMethods";

const Login = () => {
    const { setAccount } = useContext(AccountContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErr("All Fields are required!");
            return;
        }
        setLoading(true);
        try {
            const res = await apiRequest.post("/auth/signin", {
                email,
                password,
            });
            setAccount(res?.data?.data);
            navigate("/");
        } catch (error) {
            setErr(error?.response?.data?.message);
        }
        setLoading(false);
    };
    return (
        <>
            <Navbar />
            <main
                className="mt-5 mx-auto text-center"
                style={{ maxWidth: "22rem" }}
            >
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            required
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            required
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {err && (
                        <div className="mb-3 text-danger ">
                            <span>{err}</span>
                        </div>
                    )}

                    {!loading ? (
                        <button
                            className="w-100 btn btn-lg btn-primary"
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                    ) : (
                        <button
                            className="w-100 btn btn-lg btn-secondary disabled"
                            type="button"
                        >
                            Please Wait...
                        </button>
                    )}
                    <div className="py-3">
                        <span>Don't have an account: </span>
                        <span>
                            <Link to="/register">Register Here</Link>
                        </span>
                    </div>
                    <p className="mt-3 text-muted">&copy; 2017–2022</p>
                </form>
            </main>
        </>
    );
};

export default Login;
