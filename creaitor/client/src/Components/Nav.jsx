import React from "react";
import {Link} from "react-router-dom"

export default function Nav({switchModel, modelState, type}) {




  return (
    <div className="nav">
      <div className="type_container">
        <label htmlFor="" className="just_spiraling">
          Switch to:
        </label>
        <button onClick={switchModel}>
        <span className="material-symbols-outlined">{modelState}</span>
        </button>
      
      </div>
      <span  className="material-symbols-outlined" htmlFor="">{type}</span>
      <ul className="nav_bar">
      <li>
          <Link to="/write">
            <span className="material-symbols-outlined">edit</span>
          </Link>
        </li>
        <li>
          <Link to="/artist">
            <span className="material-symbols-outlined">image</span>
          </Link>
        </li>
      <li>
        <Link to="/">
        <span className="material-symbols-outlined">person</span>
        </Link>
      </li>
      </ul>
    </div>
  );
}
