import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EnterMasterPassword from "../components/EnterMasterPassword";
import { useEffect } from "react";
import { apiRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState("");
    const [id, setId] = useState("");
    const [data, setData] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();

    const handleAction = (type, id) => {
        setId(id);
        setType(type);
        setOpenModal(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await apiRequest.get("/password");
                setData(res.data.data);
            } catch (error) {
                setErr("Something went wrong!");
            }
            setLoading(false);
        };
        fetchData();
    }, [deleteFlag]);
    return (
        <>
            <Navbar />
            {!loading ? (
                <>
                    {!err ? (
                        <div className="container">
                            {data.length === 0 && (
                                <>
                                    <div className="text-center my-3">
                                        <p className="font-bold fs-2">
                                            No Password Found
                                        </p>
                                        <Link
                                            to="/add-new-password"
                                            className="btn btn-primary btn-sm"
                                        >
                                            Create Password
                                        </Link>
                                    </div>
                                </>
                            )}
                            <div
                                className="card mt-3 mx-auto"
                                style={{ maxWidth: "28rem" }}
                            >
                                {data.map((item) => (
                                    <div
                                        key={item._id}
                                        className="card-body d-flex justify-content-between"
                                    >
                                        <h5 className="card-title">
                                            {item.title}
                                        </h5>
                                        <div>
                                            <button
                                                onClick={() =>
                                                    handleAction(
                                                        "View",
                                                        item._id
                                                    )
                                                }
                                                className="btn btn-primary btn-sm me-2 mb-2"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleAction(
                                                        "Delete",
                                                        item._id
                                                    )
                                                }
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>{err} Refresh the page!</p>
                    )}
                </>
            ) : (
                <div className="text-center mt-3">
                    <span className="fs-3">Loading...</span>
                </div>
            )}

            {openModal && (
                <>
                    <EnterMasterPassword
                        setOpenModal={setOpenModal}
                        type={type}
                        id={id}
                        setDeleteFlag={setDeleteFlag}
                    />
                </>
            )}
        </>
    );
};

export default Home;
