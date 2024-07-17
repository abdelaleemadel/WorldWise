import { NavLink, Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
function PageNav() {
  return (
    <div className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/product"}> Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}> Pricing</NavLink>
        </li>
        <li>
          <Link to={"/login"} className="cta">
            {" "}
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
