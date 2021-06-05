import "./layout.css";
import AppToolbar from "../AppToolbar/appToolbar"

const Layout = (props) => {
  return (
    <>
      <AppToolbar/>
      <main className="Layout-Content">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
