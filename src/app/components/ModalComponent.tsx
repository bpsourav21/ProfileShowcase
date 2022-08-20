import classNames from "classnames";
import React from "react";

interface Props {
  showModal: boolean;
  onCloseModal: () => void;
  title?: string;
  showFooter?: boolean;
  children?: any;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onHandlePrimaryBtn?: () => void;
  onHandleSecondaryBtn?: () => void;
}

const ModalComponent = (props: Props) => {
  const modalClass = classNames({
    modal: true,
    modalBackdrop: true,
    fade: true,
    show: props.showModal,
  });
  let modalFooter = props.showFooter && (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
        onClick={() =>
          props.onHandleSecondaryBtn
            ? props.onHandleSecondaryBtn()
            : props.onCloseModal()
        }
      >
        {props.secondaryBtnText || "Close"}
      </button>
      <button type="button" className="btn btn-primary"
        onClick={() => props.onHandlePrimaryBtn && props.onHandlePrimaryBtn()}
      >
        {props.primaryBtnText || "Understood"}
      </button>
    </div>
  );
  return (
    <div
      className={modalClass}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      style={{ display: props.showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {props.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={props.onCloseModal}
            ></button>
          </div>
          <div className="modal-body">{props.children}</div>
          {modalFooter}
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;

