import React from "react";
import "./passwordModel.css";

const ShowPasswordData = ({ setOpenModal, passwordData }) => {
    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div
            className="modal modal-sheet d-block py-5"
            tabIndex="-1"
            role="dialog"
            id="modalSheet"
        >
            <div className="modal-dialog">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header border-bottom-0">
                        <h1 className="modal-title fs-5">
                            {passwordData.title}
                        </h1>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <hr />
                    <div className="modal-body py-0">
                        {passwordData?.password?.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                    <div className="modal-footer flex-column border-top-0">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="btn btn-secondary w-100 mx-0"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowPasswordData;
