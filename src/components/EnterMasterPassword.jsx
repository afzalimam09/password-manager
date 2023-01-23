import React from "react";
import { useState } from "react";
import { apiRequest } from "../requestMethods";
import "./passwordModel.css";
import { Link } from "react-router-dom";
import ShowPasswordData from "./ShowPasswordData";

const EnterMasterPassword = ({ setOpenModal, type, id, setDeleteFlag }) => {
    const [masterPassword, setMasterPassword] = useState(null);
    const [openView, setOpenView] = useState(false);
    const [passwordData, setPasswordData] = useState({});
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpenModal(false);
    };
    const handleSubmit = async () => {
        if (!masterPassword) {
            return;
        }
        // Do the request and data into the usestate
        setLoading(true);
        if (type === "Delete") {
            alert("Are you sure?");
            try {
                const res = await apiRequest.delete(
                    `/password/${id}?master=${masterPassword}`
                );
                setDeleteFlag((prev) => !prev);
                setOpenModal(false);
            } catch (error) {
                console.log(error);
                setErr(error.message);
            }
        } else if (type === "View") {
            try {
                const res = await apiRequest.get(
                    `/password/${id}?master=${masterPassword}`
                );
                setPasswordData(res.data.data);
                setOpenView(true);
            } catch (error) {
                console.log(error);
                setErr(error?.response?.data?.message);
            }
        }
        setLoading(false);
    };
    return (
        <>
            {!openView && (
                <div
                    className="modal modal-sheet d-block py-5"
                    tabIndex="-1"
                    role="dialog"
                    id="modalSheet"
                >
                    <div className="modal-dialog">
                        <div className="modal-content rounded-4 shadow">
                            <div className="modal-header border-bottom-0">
                                <h1 className="modal-title fs-6">
                                    Enter Master Password Before {type}!
                                </h1>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="px-3">
                                <span>
                                    Forget or create new master password:{" "}
                                </span>
                                <span>
                                    <Link to="/master-password">Here</Link>
                                </span>
                            </div>
                            <div className="modal-body py-3">
                                <input
                                    onChange={(e) =>
                                        setMasterPassword(e.target.value)
                                    }
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Master Password"
                                />
                            </div>
                            {err && (
                                <div className="px-3">
                                    <span className="fs-6 text-danger">
                                        {err}
                                    </span>
                                </div>
                            )}

                            <div className="modal-footer flex-column border-top-0">
                                {!loading ? (
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        className={`btn w-100 mx-0 ${
                                            type === "View"
                                                ? "btn-primary"
                                                : "btn-danger"
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-secondary disabled"
                                    >
                                        Please Wait...
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {openView && (
                <ShowPasswordData
                    setOpenModal={setOpenModal}
                    passwordData={passwordData}
                />
            )}
        </>
    );
};

export default EnterMasterPassword;
