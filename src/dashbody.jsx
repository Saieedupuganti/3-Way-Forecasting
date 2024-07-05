import { Zoho } from "./zoho";
import React,{ useContext, useEffect, useState } from "react";
import { List, ListItem, Card } from "@material-tailwind/react";
import { useNavigate,useLocation, Link  } from "react-router-dom";
import {AuthContext} from './App'
import Dash1 from "./Dash1";


export function Dashbody() {
    
    const { page, setPage, val1, pagename,setPageName } = useContext(AuthContext);
    console.log(page);
    const [selected, setSelected] = useState(1);
    const setSelectedItem = (value) => setSelected(value);
    const navigate = useNavigate();

    const renderView = () => {
        console.log(page);
        switch (page) {
          case '/home/zoho':
            return <Zoho />;
          case '/home/high':
            return <Dashbody1/>;
          case 'contact':
            return <Contact />;
          default:
            return <h1>Hello</h1>;
        }
      };

    return(
        <div className="flex w-full">
            {renderView()}
        </div>
    )

}

const Dashbody1 = ()=>{
    return(
        <div className="w-full">
            <div className="w-full h-80 flex flex-row">
                <span className="h-80 flex highcontainer bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash1/>
                </span>
                <span className="h-80 flex highcontainer">
                    <Dash1/>
                </span>
            </div>
        </div>
    )
}
