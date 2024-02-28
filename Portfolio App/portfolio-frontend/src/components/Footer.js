import React from "react";
import Div from "../components/Div";
import Spacing from "../components/Spacing";

const Footer = () => {
  return (
    <footer className="footer_top ">
      <Spacing lg="50" md="50" />
      <Div className="footer_main">
        <Div className="footer_container">
          <Div className="footer_center">
            <p>&copy; 2024 Pixel Projects. All rights reserved.</p>
          </Div>
        </Div>
      </Div>
    </footer>
  );
};

export default Footer;
