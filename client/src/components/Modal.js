import React from "react";
import { createPortal } from "react-dom";

import { stopEventPropagationTry } from "../utils";

const Modal = ({ header, content, cancelButtonText, confirmButtonText, history, handleConfirm, customCancelPath }) => {
    const handleCancel = (event) => {
        stopEventPropagationTry(event);

        history.push(customCancelPath);
    }

    const handleConfirmButton = (event) => {
        stopEventPropagationTry(event);

        handleConfirm();
    }

    return createPortal(
        <div onClick={handleCancel} className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                <div className="header">{header}</div>
                <div className="content">{content}</div>
                <div className="actions">
                    <button onClick={handleCancel} className="ui button">{cancelButtonText}</button>
                    <button onClick={handleConfirmButton} className="ui red button">{confirmButtonText}</button>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default Modal;