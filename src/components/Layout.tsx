import React from "react";
import NavBar from "./NavBar";

interface IProps {
  children?: React.ReactNode | any;
}
const Layout = (props: IProps) => {
  return (
    <div className="w-100">
      <NavBar />
      {props.children}
    </div>
  );
};

export default Layout;
