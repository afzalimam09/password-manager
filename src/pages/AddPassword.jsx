import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../requestMethods";

const AddPassword = () => {
    const [inputs, setInputs] = useState([{ key: "", value: "" }]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleAddInput = (e) => {
        e.preventDefault();
        setInputs([...inputs, { key: "", value: "" }]);
    };

    const handleDecInput = (e) => {
        e.preventDefault();
        if (inputs.length > 1) {
            const newArr = inputs.slice(0, -1);
            setInputs([...newArr]);
        } else return;
    };

    const handleChange = (e, index) => {
        const newObj = { ...inputs[index] };
        newObj[e.target.name] = e.target.value;
        inputs[index] = newObj;
        setInputs([...inputs]);
    };

    const handleSubmit = async () => {
        if (!title) {
            setErr("Please Enter Title");
            return;
        }
        if (!inputs[0].key || !inputs[0].value) {
            setErr("Please enter at least a field!");
            return;
        }
        setLoading(true);
        try {
            const res = await apiRequest.post("/password", {
                title,
                data: inputs,
            });
            setErr("Password Added!");
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
                style={{ maxWidth: "25rem" }}
            >
                <form>
                    <h1 className="h3 mb-3 fw-normal">Add New Password</h1>
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            name="title"
                            placeholder="Password Title"
                            required
                        />
                        <label htmlFor="floatingInput">Password Title</label>
                    </div>

                    <hr />

                    <h3>Input Fields</h3>

                    {inputs.map((item, index) => (
                        <div
                            className="d-flex column-gap-3 mb-3 mt-3"
                            key={index}
                        >
                            <input
                                onChange={(e) => handleChange(e, index)}
                                type="text"
                                defaultValue={item.key}
                                className="form-control"
                                placeholder="Key"
                                name="key"
                                required
                            />
                            <input
                                onChange={(e) => handleChange(e, index)}
                                type="text"
                                defaultValue={item.value}
                                className="form-control"
                                placeholder="Value"
                                name="value"
                                required
                            />
                        </div>
                    ))}

                    {err && (
                        <div className="mb-3 text-danger ">
                            <span>{err}</span>
                        </div>
                    )}

                    <div className="d-flex justify-content-center column-gap-2">
                        <button
                            type="button"
                            onClick={handleDecInput}
                            className="w-40 btn btn-secondary"
                        >
                            -
                        </button>
                        {!loading ? (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-40 btn btn-primary"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="w-40 btn btn-secondary disabled"
                            >
                                Please Wait...
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleAddInput}
                            className="w-40 btn btn-secondary"
                        >
                            +
                        </button>
                    </div>
                    <p className="mt-5 text-muted">&copy; 2017–2022</p>
                </form>
            </main>
        </>
    );
};

export default AddPassword;
