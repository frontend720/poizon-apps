import React, {useState} from "react";
import {Link} from "react-router-dom"

export default function Nav({switchModel, modelState, type}) {

const [model, setModel] = useState(true)


function onNavToggle(){
  setModel(prev => !prev)
}

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
      <li >
          <Link onClick={onNavToggle} to={model ? "/write" : "/artist"}>
            <span className="material-symbols-outlined">{model ? "edit" : "image"}</span>
          </Link>
        </li>
        <li>
          <Link  to="/saved">
          <span className="material-symbols-outlined">favorite</span>
          </Link>
        </li>
        {/* <li>
          <Link to="/artist">
            <span className="material-symbols-outlined">image</span>
          </Link>
        </li> */}
      <li>
        <Link to="/">
        <span className="material-symbols-outlined">person</span>
        </Link>
      </li>
      </ul>
    </div>
  );
}
