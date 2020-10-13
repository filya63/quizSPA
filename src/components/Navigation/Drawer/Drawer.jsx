import React, { Fragment } from "react";
import Backdrop from "../../ui/Backdrop";
import classes from "./Drawer.module.css";
import { NavLink } from 'react-router-dom';

const Drawer = (props) => {
  const cls = [classes.Drawer];
  if (!props.isOpen) {
    cls.push(classes.close);
  }
  const links = [
    { to: "/", label: "Список тестов", exact: true },
    { to: "/quiz-create", label: "Новый тест", exact: false },
    { to: "/auth", label: "Авторизация", exact: false }
  ];
  return (
    <Fragment>
      <nav className={cls.join(" ")}>
        <ul>
          {links.map((link, index) => {
            return (
            <li key={index}>
              <NavLink to={link.to} exact={link.exact} activeClassName={classes.active} onClick={props.onCloseBackdrop}>{link.label}</NavLink>
            </li>)
          })}
        </ul>
      </nav>
      {props.isOpen ? (
        <Backdrop onCloseBackdrop={props.onCloseBackdrop} />
      ) : null}
    </Fragment>
  );
};

export default Drawer;
