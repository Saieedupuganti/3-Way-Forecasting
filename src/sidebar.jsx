import React, { useContext, useEffect, useRef, useState } from "react";
import { List, ListItem, Card } from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from './App';

export function Sidebar({ menustate, setMenustate }) {
  const sidebarRef = useRef(null);
  const { page } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    const element = sidebarRef.current;
    if (element) {
      element.style.minWidth = menustate ? '200px' : '0px';
      element.style.maxWidth = menustate ? '200px' : '0px';
    }
  }, [menustate]);

  const handleLinkClick = () => {
    if (window.innerWidth < window.innerHeight) {
      setMenustate(true);
    }
  };

  const isSelected = (path) => page === path;

  return (
    <Card className="shadow-lg bg-gray-200 overflow-hidden" style={{ minWidth: "0px", maxWidth: "0px", transition: "width ease 0.5s" }} ref={sidebarRef}>
      <List className="p-0 mx-auto min-w-full block mt-3">
        <Link to={'/home/importdata'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/importdata')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/importdata') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            Import Data
          </ListItem>
        </Link>
        <Link to={'/home/chartofaccounts'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/chartofaccounts')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/chartofaccounts') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            Chart of Accounts
          </ListItem>
        </Link>
        <Link to={'/home/high1'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/high1') || isSelected('/home')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/high1') || isSelected('/home') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            HighCharts 1
          </ListItem>
        </Link>
        <Link to={'/home/high2'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/high2')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/high2') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            HighCharts 2
          </ListItem>
        </Link>
        <Link to={'/home/zoho1'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/zoho1')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/zoho1') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            Sales
          </ListItem>
        </Link>
        <Link to={'/home/zoho2'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/zoho2')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/zoho2') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            Finance Overview
          </ListItem>
        </Link>
        <Link to={'/home/zoho3'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/zoho3')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/zoho3') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            Financial Statement
          </ListItem>
        </Link>
        <Link to={'/home/zoho4'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/zoho4')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/zoho4') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            Invoice Overview
          </ListItem>
        </Link>
        <Link to={'/home/zoho5'} onClick={handleLinkClick}>
          <ListItem selected={isSelected('/home/zoho5')} className="block text-center text-black mx-auto max-w-48 my-2" style={{ background: isSelected('/home/zoho5') ? 'white' : 'rgba(75, 85, 99, 0.4)' }}>
            Vendor Insights
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
