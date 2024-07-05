import React,{ useContext, useEffect, useState } from "react";
import { List, ListItem, Card } from "@material-tailwind/react";
import { useNavigate,useLocation, Link  } from "react-router-dom";
import {AuthContext} from './App'



export function Sidebar() {
    
    const { page, setPage, val1, pagename,setPageName } = useContext(AuthContext);
    console.log(page);
    const [selected, setSelected] = useState(1);
    const setSelectedItem = (value) => setSelected(value);
    const navigate = useNavigate();
  
    const color1 = page == '/home/high'?'white':'rgb(75, 85, 99,0.4)';
    const color2 = page == '/home/zoho'?'white':'rgb(75, 85, 99,0.4)';
    const color3 = page == '/home/settings'?'white':'rgb(75, 85, 99,0.4)';
    const color4 = page == '/home/high'?'white':'rgb(75, 85, 99,0.4)';
    const color5 = page == '/home/zoho'?'white':'rgb(75, 85, 99,0.4)';
    const color6 = page == '/home/settings'?'white':'rgb(75, 85, 99,0.4)';
  console.log(page=== '/home/high')
  return (
    <Card className="min-w-52 shadow-lg bg-gray-200 ">
      <List className="p-0 mx-auto min-w-full block mt-3">
        <Link to={'/home/high'}>
            <ListItem selected={page == '/home/high' || page == '/home'} style={{background:color1}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
                HighCharts
            </ListItem>
        </Link>
        <Link to={'/home/zoho'}>
            <ListItem selected={page == '/home/zoho'} style={{background:color2}} className="block text-center text-black mx-auto max-w-48 my-2" onClick={() => {setSelectedItem(1)}}>
                Zoho
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