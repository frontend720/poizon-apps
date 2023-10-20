import { Link } from "react-router-dom";
import { Nav, NavLink } from "./StyleSheet";

export default function Navbar() {
  return (
    <Nav>
      <NavLink>
        <Link to="/home">
          <label htmlFor="" style={{ fontWeight: "600" }}>
            00
          </label>{" "}
          Home
        </Link>
      </NavLink>
      <NavLink>
        <Link to="/destinations">
          <label htmlFor="" style={{ fontWeight: "600" }}>
            01
          </label>{" "}
          Destinations
        </Link>
      </NavLink>
      <NavLink>
        <Link to="/crew">
          <label htmlFor="" style={{ fontWeight: "600" }}>
            02
          </label>{" "}
          Crew
        </Link>
      </NavLink>
      <NavLink>
        <Link to="/technology">
          <label htmlFor="" style={{ fontWeight: "600" }}>
            03
          </label>{" "}
          Technology
        </Link>
      </NavLink>
    </Nav>
  );
}
