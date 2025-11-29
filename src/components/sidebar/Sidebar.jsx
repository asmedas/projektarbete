import React from "react";
import "./SideBar.css"


export default function SideBar({onSelectContent}){
    return (
    <div className="sidebar">
      <nav>
        <li>
          <button onClick={()=>onSelectContent("Home")}>
            Home
          </button>
        </li>
        <li>
          <button onClick={()=>onSelectContent("Login")}>
            Logout
          </button>
        </li>
      </nav>
    </div>
  );
}