import Head from "next/head";

// import "./Layout.scss";

const Header = () => (
  <nav className="navbar navbar-light bg-light">
    <a className="navbar-brand">Sahmwanga</a>
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
        <div className="Layout">{children}</div>
      </div>
    </>
  );
};

export default Layout;
