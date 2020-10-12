import React, { Fragment } from "react";
import Backdrop from '../../ui/Backdrop';
import classes from "./Drawer.module.css";

const Drawer = (props) => {
  const cls = [classes.Drawer];
  if (!props.isOpen) {
    cls.push(classes.close);
  }
  const links = [1, 2, 3];
  return (
    <Fragment>
      <nav className={cls.join(" ")}>
        <ul>
          {links.map((link, index) => {
            return <li key={index}>Link: {link}</li>;
          })}
        </ul>
      </nav>
      { props.isOpen ? <Backdrop onCloseBackdrop={props.onCloseBackdrop} /> : null }
    </Fragment>
  );
};

export default Drawer;
