import React,{ useContext, useEffect, useRef, useState } from "react";
import { List, ListItem, Card } from "@material-tailwind/react";
import { useNavigate,useLocation, Link  } from "react-router-dom";
import {AuthContext} from './App'



export function Sidebar({menustate,setMenustate}) {
    const sidebar = useRef(null);
    const { page, setPage, val1, pagename,setPageName } = useContext(AuthContext);
    console.log(page);
    const [selected, setSelected] = useState(1);
    const setSelectedItem = (value) => setSelected(value);
    const navigate = useNavigate();
    // if(menustate==true){
    //   sidebar.style.width="100vw";
    //   console.log("Width");
    // }
    useEffect(() => {
      // Accessing the current property of the ref to get the DOM element
      const element = sidebar.current;
      if (menustate==false && element) {
        // console.log("Hello");
        // Setting the width to 100px
        element.style.minWidth = '200px';
        element.style.maxWidth = '200px';
      }else if (menustate==true && element) {
        // console.log("Hello");
        // Setting the width to 100px
        element.style.minWidth = '0px';
        element.style.maxWidth = '0px';
      }
  
      // Example: Cleaning up the style when component unmounts
      // return () => {
      //   if (element) {
      //     element.style.width = ''; // Resetting to default (optional)
      //   }
      // };
    }, [menustate]);
  
    const color1 = page == '/home/high1' || page=='/home'?'white':'rgb(75, 85, 99,0.4)';
    const color2 = page == '/home/high2'?'white':'rgb(75, 85, 99,0.4)';
    const color3 = page == '/home/zoho1'?'white':'rgb(75, 85, 99,0.4)';
    const color4 = page == '/home/zoho2'?'white':'rgb(75, 85, 99,0.4)';
    const color5 = page == '/home/zoho3'?'white':'rgb(75, 85, 99,0.4)';
    const color6 = page == '/home/zoho4'?'white':'rgb(75, 85, 99,0.4)';
    const color7 = page == '/home/zoho5'?'white':'rgb(75, 85, 99,0.4)';
    // const color4 = page == '/home/high1'?'white':'rgb(75, 85, 99,0.4)';
    // const color5 = page == '/home/zoho'?'white':'rgb(75, 85, 99,0.4)';
    // const color6 = page == '/home/high2'?'white':'rgb(75, 85, 99,0.4)';
  console.log(page)
  return (
    <Card className=" shadow-lg bg-gray-200 overflow-hidden" style={{minWidth:"0px",maxWidth:"0px", transition:"width ease 0.5s"}} ref={sidebar}>
      <List className="p-0 mx-auto min-w-full block mt-3">
        <Link to={'/home/high1'} onClick={()=>{if(window.innerWidth<window.innerHeight)setMenustate(true)}}>
            <ListItem selected={page == '/home/high1' || page == '/home'} style={{background:color1}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
                HighCharts 1
            </ListItem>
        </Link>
        <Link to={'/home/high2'} onClick={()=>{if(window.innerWidth<window.innerHeight)setMenustate(true)}}>
            <ListItem selected={page == '/home/high2'} style={{background:color2}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
                HighCharts 2
            </ListItem>
        </Link>
        <Link to={'/home/zoho1'} onClick={()=>{if(window.innerWidth<window.innerHeight)setMenustate(true)}}>
            <ListItem selected={page == '/home/zoho1'} style={{background:color3}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
                Sales
            </ListItem>
        </Link>
        <Link to={'/home/zoho2'} onClick={()=>{if(window.innerWidth<window.innerHeight)setMenustate(true)}}>
            <ListItem selected={page == '/home/zoho2'} style={{background:color4}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
                Finance Overview
            </ListItem>
        </Link>
        <Link to={'/home/zoho3'} onClick={()=>{if(window.innerWidth<window.innerHeight)setMenustate(true)}}>
            <ListItem selected={page == '/home/zoho3'} style={{background:color5}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
            Financial Statement
            </ListItem>
        </Link>
        <Link to={'/home/zoho4'} onClick={()=>{if(window.innerWidth<window.innerHeight)setMenustate(true)}}>
            <ListItem selected={page == '/home/zoho4'} style={{background:color6}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
            Invoice Overview
            </ListItem>
        </Link>
        <Link to={'/home/zoho5'} onClick={()=>{if(window.innerWidth<window.innerHeight)setMenustate(true)}}>
            <ListItem selected={page == '/home/zoho5'} style={{background:color7}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
            Vendor Insights
            </ListItem>
        </Link>
        {/* <Link to={'/home/settings'}>
            <ListItem selected={page == '/home/settings'} style={{background:color3}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
                Settings
            </ListItem>
        </Link> */}
      </List>
    </Card>
  );
}