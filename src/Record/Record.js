import React from "react";
import Example from "./Chart";

const Record = ({ match, history, location }) => {
  return (
    <div style={{ backgroundColor: "black", height: "90vh" }}>
      <Example />
    </div>
  );
};

export default Record;