import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { apiRequest } from "../requestMethods";

const Register = () => {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (JSON.stringify(inputs) === "{}") {
            setErr("All Fields are required!");
            return;
        }
        setLoading(true);
        try {
            const res = await apiRequest.post("/auth/signup", inputs);
            navigate("/login");
            console.log(res);
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
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleChange}
                            name="name"
                            type="text"
                            className="form-control"
                            id="floatingInputName"
                            placeholder="John Doe"
                            required
                        />
                        <label htmlFor="floatingInputName">Full Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleChange}
                            name="email"
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            required
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            required
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleChange}
                            name="passwordConfirm"
                            type="password"
                            required
                            className="form-control"
                            id="floatingPasswordC"
                            placeholder="Confirm Password"
                        />
                        <label htmlFor="floatingPasswordC">
                            Confirm Password
                        </label>
                    </div>
                    {err && (
                        <div className="mb-3 text-danger ">
                            <span>{err}</span>
                        </div>
                    )}

                    {!loading ? (
                        <button
                            className="w-100 btn btn-lg btn-primary"
                            onClick={handleRegister}
                            type="submit"
                        >
                            Register Now
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
                        <span>Already have an account: </span>
                        <span>
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                    <p className="mt-3 text-muted">&copy; 2017–2022</p>
                </form>
            </main>
        </>
    );
};

export default Register;
