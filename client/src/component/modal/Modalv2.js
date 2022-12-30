import React, { Fragment } from "react";

import classes from "./Modalv2.module.scss";
import ReactDOM from "react-dom";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ children, onClose, classModal }) => {
  return (
    <div className={`${classes.modal} ${classModal}`}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

function Modalv2({
  children,
  onClose,

  classModal,
}) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={onClose} classModal={classModal}>
          {children}
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
}

export default Modalv2;
