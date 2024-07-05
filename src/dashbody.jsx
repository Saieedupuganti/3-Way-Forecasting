import { Zoho } from "./zoho";
import React,{ useContext, useEffect, useState } from "react";
import { List, ListItem, Card } from "@material-tailwind/react";
import { useNavigate,useLocation, Link  } from "react-router-dom";
import {AuthContext} from './App'
import Dash1 from "./Dash1";
import Dash2 from "./Dash2";
import Dash3 from "./Dash3";
import Dash4 from "./Dash4";
import Dash5 from "./Dash5";
import Dash6 from "./Dash6";
import Dash7 from "./Dash7";
import Dash8 from "./Dash8";
import Dash9 from "./Dash9";
import Dash10 from "./Dash10";


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
            return <Dashbody1/>;
        }
      };

    return(
        <div className="flex w-full bg-gray-100">
            {renderView()}
        </div>
    )

}

const Dashbody1 = ()=>{
    return(
        <div className="w-full mt-6" style={{transform:"scale(0.93)"}}>
            <div className="w-[100%] mx-2 h-80 flex flex-row gap-10 mb-10">
                <span className="h-80 flex highcontainer bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash1/>
                </span>
                <span className="h-80 flex highcontainer">
                    <Dash2/>
                </span>
            </div>
            <div className="w-[100%] h-80 flex flex-row  gap-10 mb-10">
                <span className="h-80 flex highcontainer bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash3/>
                </span>
                <span className="h-80 flex highcontainer">
                    <Dash4/>
                </span>
            </div>
            <div className="w-[100%] h-80 flex flex-row  gap-10 mb-10">
                <span className="h-80 flex highcontainer bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash5/>
                </span>
                <span className="h-80 flex highcontainer">
                    <Dash6/>
                </span>
            </div>
            <div className="w-[100%] h-80 flex flex-row  gap-10 mb-10">
                <span className="h-80 flex highcontainer bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash7/>
                </span>
                <span className="h-80 flex highcontainer">
                    <Dash8/>
                </span>
            </div>
            <div className="w-[100%] h-80 flex flex-row  gap-10 mb-10">
                <span className="h-80 flex highcontainer bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash9/>
                </span>
                <span className="h-80 flex highcontainer">
                    <Dash10/>
                </span>
            </div>
        </div>
    )
}


