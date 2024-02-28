import React, { useEffect, useState } from "react";
import SocialWidget from "../Widget/SocialWidget";
import Newsletter from "../Widget/Newsletter";
import ContactInfoWidget from "../Widget/ContactInfoWidget";
import Div from "../Div";
import DropDown from "./DropDown";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

export default function Header({ variant }) {
  const { user, logout } = useAuth();

  const [isSticky, setIsSticky] = useState(false);
  const [sideHeaderToggle, setSideHeaderToggle] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  return (
    <>
      <header
        className={`cs-site_header cs-style1 text-uppercase ${
          variant ? variant : ""
        } cs-sticky_header ${isSticky ? "cs-sticky_header_active" : ""}`}
      >
        <Div className="cs-main_header">
          <Div className="container">
            <Div className="cs-main_header_in">
              <Div className="cs-main_header_left">
                <Link className="cs-site_branding" href="/">
                  <img src="/images/portfolify-logo.png" alt="Logo" />
                </Link>
              </Div>
              <Div className="cs-main_header_center">
                <Div className="cs-nav cs-primary_font cs-medium">
                  <ul
                    className="cs-nav_list"
                    style={{ display: `${mobileToggle ? "block" : "none"}` }}
                  >
                    <li>
                      <Link href="/" onClick={() => setMobileToggle(false)}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portfolio"
                        onClick={() => setMobileToggle(false)}
                      >
                        Portfolio
                      </Link>
                    </li>
                    {user ? (
                      // Displayed when user is logged in
                      <>
                        <li>
                          <Link
                            href="/dashboard"
                            onClick={() => setMobileToggle(false)}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => {
                              logout();
                              setMobileToggle(false);
                            }}
                          >
                            Logout
                          </a>
                        </li>
                      </>
                    ) : (
                      // Displayed when no user is logged in
                      <li>
                        <Link
                          href="/auth/login"
                          onClick={() => setMobileToggle(false)}
                        >
                          Sign Up | Login
                        </Link>
                      </li>
                    )}
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? "cs-munu_toggle cs-toggle_active"
                        : "cs-munu_toggle"
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </header>
    </>
  );
}
