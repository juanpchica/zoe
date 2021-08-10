import React, { useEffect } from "react";

const Alert = ({ action: { msg, type }, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={"alert alert-" + type}>{msg}</div>;
};

export default Alert;
