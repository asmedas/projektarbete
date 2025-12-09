import React, { useEffect } from "react";
import "./Sidebar.css"
import { useAuth } from "../auth/AuthProvider";
import AdminUserMenu  from "./adminmenus/AdminUserMenu";
import AdminCarMenu from "./adminmenus/AdminCarMenu";
import AdminBookingsMenu from "./adminmenus/AdminBookingsMenu";
import BookingsMenu from "./usermenus/BookingsMenu";
import UserMenu from "./usermenus/UserMenu";

export default function SideBar({onSelectContent}){
  const {auth, logout} = useAuth();
  console.log("Sidebar render - user:", auth.user, "isAdmin:", auth.isAdmin);


  if(auth.user === null && auth.authHeader === null && auth.isAdmin === false){
    return (
    <div className="sidebar">
      <nav>
          <button onClick={() => onSelectContent("Home")}>Home</button>
          <button onClick={() => onSelectContent("ViewCars")}>View Cars</button>
          <button onClick={() => onSelectContent("Login")}>Login</button>
      </nav>
    </div>
    );
  }
  if(auth.isAdmin === false){
    return (
    <div className="sidebar">
      <nav>
          <button onClick={() => onSelectContent("Home")}>Home</button>
          <button onClick={() => onSelectContent("ViewCars")}>View Cars</button>
          <UserMenu onSelectContent={onSelectContent} />
          <BookingsMenu onSelectContent={onSelectContent}/>
          <button onClick={() => {logout()
            onSelectContent("Home")}}>Logout</button>
      </nav>
    </div>
    );
  }
  if(auth.isAdmin === true){
    return (
    <div className="sidebar">
      <nav>
          <button onClick={() => onSelectContent("Home")}>Home</button>
          <AdminUserMenu onSelectContent={onSelectContent}/>
          <AdminCarMenu onSelectContent={onSelectContent}/>
          <AdminBookingsMenu onSelectContent={onSelectContent}/>
          <button onClick={() => {logout()
            onSelectContent("Home")}}>Logout</button>
      </nav>
    </div>
    );
  }
}