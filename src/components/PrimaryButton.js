import React from "react";
import styles from "./PrimaryButton.module.css";

const PrimaryButton = (props) => {
  return (
    <button className={styles.Button} {...props}>
      {props.children}
    </button>
  );
};

export default PrimaryButton;
