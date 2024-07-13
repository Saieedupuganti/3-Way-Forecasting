
import { Zoho1,Zoho2,Zoho3,Zoho4,Zoho5 } from "./zoho1";
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
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FileUploadButton }  from "./importdata";
import ChartOfAccounts from "./Chartofaccounts";
import  Importandexport   from "./importandexport";
import  Settings  from "./settings";

export function Dashbody() {
    
    const { page, setPage, val1, pagename,setPageName } = useContext(AuthContext);
    // console.log(page);
    const [selected, setSelected] = useState(1);
    const setSelectedItem = (value) => setSelected(value);
    const navigate = useNavigate();

    const renderView = () => {
        // console.log(page);
            switch (page) {
                case '/home/zoho1':
                    return <Zoho1 />;
                case '/home/zoho2':
                    return <Zoho2 />;
                case '/home/zoho3':
                    return <Zoho3 />;
                case '/home/zoho4':
                    return <Zoho4 />;
                case '/home/zoho5':
                    return <Zoho5 />;
                case '/home/importdata':
                    return <FileUploadButton />;
                case '/home/importandexport':
                    return <Importandexport />;
                case '/home/chartofaccounts':
                    return <ChartOfAccounts />;
                case '/home/settings':
                    return <Settings />;
                case '/home/high1':
                    return <Dashbody1/>;
                case '/home/high2':
                    return <Dashbody2/>;
                case 'contact':
                    return <Contact />;
                default:
                    return <Dashbody1/>;
        }
      };

    return(
        <div className="flex flex-grow bg-gray-100 max-w-screen overflow-visible" style={{maxWidth:"100vw"}}>
            {renderView()}
        </div>
    )

}

const Dashbody1 = ()=>{
    return(
        <div className="w-full mt-2 h-full min-h-max flex flex-col" style={{transform:"scale(0.96)"}}>
            <div className="w-[100%] mx-0 min-h-80 flex flex-row flex-wrap justify-center align-center max-w-[100vw] gap-10 mb-10">
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash1/>
                </span>
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200">
                    <Dash2/>
                </span>
            </div>
            <div className="w-[100%] mx-0 min-h-80 flex flex-row flex-wrap justify-center align-center max-w-[100vw] gap-10 mb-10">
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200" min-w-88 style={{border:"0px solid black"}}>
                    <Dash3/>
                </span>
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200">
                    <Dash4/>
                </span>
            </div>
            <div className="w-[100%] mx-0 min-h-80 flex flex-row flex-wrap justify-center align-center max-w-[100vw] gap-10 mb-10">
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash5/>
                </span>
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200">
                    <Dash6/>
                </span>
            </div>
        </div>
    )
}


const Dashbody2 = ()=>{
    return(
        <div className="w-full mt-2 h-full min-h-max flex flex-col" style={{transform:"scale(0.93)"}}>
            <div className="w-[100%] mx-0 min-h-80 flex flex-row flex-wrap justify-center align-center max-w-[100vw] gap-10 mb-10">
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200" style={{border:"0px solid black"}}>
                    <Dash7/>
                </span>
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200">
                    <Dash8/>
                </span>
            </div>
            <div className="w-[100%] mx-0 min-h-80 flex flex-row flex-wrap justify-center align-center max-w-[100vw] gap-10 mb-10">
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200" min-w-88 style={{border:"0px solid black"}}>
                    <Dash9/>
                </span>
                <span className="min-h-80 flex highcontainer max-w-[90vw] min-w-88 flex-wrap bg-gray-200">
                    <Dash10/>
                </span>
            </div>
        </div>
    )
}
