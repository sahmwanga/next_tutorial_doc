import Head from "next/head";
import Link from "next/link";

// import "./Layout.scss";

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light container">
    <a className="navbar-brand">Sahmwanga</a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/profile">
            <a className="nav-link">Profile</a>
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn">Logout</button>
        </li>
        <li className="nav-item">
          <Link href="/login">
            <a className="nav-link">Login</a>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="container">
        <div className="pt-3 pb-3">
          Welcome <span className="text-muted">Guest</span>
        </div>
        <div className="Layout">{children}</div>
      </div>
    </>
  );
};

export default Layout;
