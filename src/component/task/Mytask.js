import React, { useState } from "react";
import InternalNavbar from "../navbar/InternalNavbar";

const Mytask = () => {
  const listLinks = ["Today", "Tomorrow", "This Week"];
  const [showToday, setToday] = useState(true);
  const [showTomorrow, setTomorrow] = useState(false);
  const [showThisWeek, setThisWeek] = useState(false);

  return (
    <div>
      <InternalNavbar
        elements={listLinks}
        action={internalActive}
      ></InternalNavbar>
      {showToday && <div>Component Today</div>}
      {showTomorrow && <div>Component Tomorrow</div>}
      {showThisWeek && <div>Component This Link</div>}
    </div>
  );

  function internalActive(text) {
    switch (text) {
      case listLinks[0]:
        setToday(true);
        setTomorrow(false);
        setThisWeek(false);
        break;
      case listLinks[1]:
        setToday(false);
        setTomorrow(true);
        setThisWeek(false);
        break;
      case listLinks[2]:
        setToday(false);
        setTomorrow(false);
        setThisWeek(true);
        break;
      default:
        break;
    }
  }
};

export default Mytask;
