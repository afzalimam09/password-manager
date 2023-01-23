import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../requestMethods";

const MasterPassword = () => {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (JSON.stringify(inputs) === "{}") {
            setErr("All Fields are Required!");
            return;
        }
        setLoading(true);
        try {
            const res = await apiRequest.patch(
                "/users/create-master-password",
                inputs
            );
            setErr("Master password created!");
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
                    <h1 className="h3 mb-5 fw-bold">
                        Create or Change Your Master Password
                    </h1>

                    <div className="form-floating mb-3">
                        <input
                            onChange={handleChange}
                            type="password"
                            className="form-control"
                            id="floatingPasswordL"
                            name="loginPassword"
                            placeholder="Login Password"
                        />
                        <label htmlFor="floatingPasswordL">
                            Login Password
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleChange}
                            type="password"
                            className="form-control"
                            id="floatingPasswordM"
                            name="masterPassword"
                            placeholder="Set Master Password"
                        />
                        <label htmlFor="floatingPasswordM">
                            Set Master Password
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleChange}
                            type="password"
                            className="form-control"
                            id="floatingPasswordCM"
                            name="confirmMasterPassword"
                            placeholder="Confirm Master Password"
                        />
                        <label htmlFor="floatingPasswordCM">
                            Confirm Master Password
                        </label>
                    </div>
                    {err && (
                        <div className="mb-3 text-danger ">
                            <span>{err}</span>
                        </div>
                    )}

                    {!loading ? (
                        <button
                            onClick={handleSubmit}
                            className="w-100 btn btn-primary"
                            type="button"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            className="w-100 btn btn-secondary disabled"
                            type="button"
                        >
                            Please Wait...
                        </button>
                    )}
                    <p className="mt-3 text-muted">&copy; 2017-2022</p>
                </form>
            </main>
        </>
    );
};

export default MasterPassword;
