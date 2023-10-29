import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, NavLink, NavIcons } from "./StyleSheet";
import closeIcon from "./assets/shared/icon-close.svg";
import hamburger from "./assets/shared/icon-hamburger.svg";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  const navToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
        <NavIcons
          display={toggle ? "block" : "none"}
          onClick={navToggle}
          src={hamburger}
          top="30px"
          
        />
       
      <Nav view={toggle ? "none" : "block"}>
        <NavIcons
          display={toggle ? "none" : "block"}
          onClick={navToggle}
          src={closeIcon}
          // style={{marginTop: -100}}
          top="-120px"
        />
        <NavLink>
          <Link onClick={navToggle}  to="/">
            <label htmlFor="" style={{ fontWeight: "600" }}>
              00
            </label>{" "}
            Home
          </Link>
        </NavLink>
        <NavLink>
          <Link onClick={navToggle} to="/destinations">
            <label htmlFor="" style={{ fontWeight: "600" }}>
              01
            </label>{" "}
            Destinations
          </Link>
        </NavLink>
        <NavLink>
          <Link onClick={navToggle} to="/crew">
            <label htmlFor="" style={{ fontWeight: "600" }}>
              02
            </label>{" "}
            Crew
          </Link>
        </NavLink>
        <NavLink>
          <Link onClick={navToggle} to="/technology">
            <label htmlFor="" style={{ fontWeight: "600" }}>
              03
            </label>{" "}
            Technology
          </Link>
        </NavLink>
      </Nav>
    </>
  );
}
