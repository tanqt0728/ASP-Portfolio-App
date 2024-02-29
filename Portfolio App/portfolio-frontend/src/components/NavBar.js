import React, { useEffect, useState } from "react";
import Div from "../components/Div";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

export default function Header({ variant }) {
  const { user, logout } = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);

  const userLoggedIn = !!user;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  const handleLogout = () => {
    logout();
    setMobileToggle(false);
  };

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
                  <img src="/Pixel-Projects-Logo.png" alt="Logo" />
                </Link>
              </Div>
              <Div className="cs-main_header_center">
                <Div className="cs-nav cs-primary_font cs-medium">
                  <ul
                    className={`cs-nav_list ${userLoggedIn ? "loggedIn" : ""}`}
                    style={{ display: `${mobileToggle ? "block" : "none"}` }}
                  >
                    <li>
                      <Link href="/" onClick={() => setMobileToggle(false)}>
                        Home
                      </Link>
                    </li>
                    {user ? (
                      <>
                        <li>
                          <Link
                            href="/profile"
                            onClick={() => setMobileToggle(false)}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/portfolio/edit"
                            onClick={() => setMobileToggle(false)}
                          >
                            Portfolio
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/search"
                            onClick={() => setMobileToggle(false)}
                          >
                            Search
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={handleLogout}>
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            href="/search"
                            onClick={() => setMobileToggle(false)}
                          >
                            Search
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/auth/signup"
                            onClick={() => setMobileToggle(false)}
                          >
                            Sign Up
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/auth/login"
                            onClick={() => setMobileToggle(false)}
                          >
                            Login
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>{" "}
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
