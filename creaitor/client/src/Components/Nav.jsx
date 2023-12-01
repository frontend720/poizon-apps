import React from "react";

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
      <label htmlFor="">{type}</label>
      <ul className="nav_bar">
      <li>
          <button>
            <span className="material-symbols-outlined">edit</span>
          </button>
        </li>
        <li>
          <button>
            <span className="material-symbols-outlined">image</span>
          </button>
        </li>
      <li>
        <button>
        <span className="material-symbols-outlined">person</span>
        </button>
      </li>
      </ul>
    </div>
  );
}
