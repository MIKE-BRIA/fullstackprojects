import styles from "./Navbar.module.css";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <h1 className="title">
          <Link href="/">BlogSite</Link>
        </h1>
      </div>
      <div>
        <ul className={styles.list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/newblog">Add New Blog</Link>
          </li>
          <li>
            <Link href="/editblog">Edit Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
