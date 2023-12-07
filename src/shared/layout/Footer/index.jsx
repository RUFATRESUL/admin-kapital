import React from "react";
import Crocusoft from "src/assets/imgs/Crocusoft.png";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles?.Footer}>
      <h1>
        Developed by General Department of Technological Innovations and
        Statistics in The State Customs Committee of The Republic of Azerbaijan
      </h1>
      <a target="_blanc" href="https://crocusoft.com/">
        <img src={Crocusoft} alt="" />
        <span>Crocusoft</span>
      </a>
    </div>
  );
};

export default Footer;
