import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";




export default function Home() {
  const [openNav, setOpenNav] = React.useState(false);
  const [openBar, setOpenBar] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        if(window.innerWidth <= 960){
            setOpenBar(true);
        }else{
            setOpenBar(false);
        }
      }
    );
  }, []);

  const navigate = useNavigate();
  function unsigned(){
    navigate('/');
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log(user);
      if (user) {
        // setToken(user.accessToken);
        console.log('User signed in:', user);
        // Verified();
      } else {
        // setToken(null);
        unsigned();
        console.log('No user signed in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

 
  
  return (
    <div className="min-h-screen flex flex-col w-[100%] overflow-scroll">
      <Navbar className="sticky top-0 h-max max-w-full rounded-none shadow-lg px-4 py-2 lg:px-8 lg:py-2 bg-gray-900">
        <div className="flex items-center justify-between text-blue-gray-900">
            <Bars3CenterLeftIcon class="h-6 w-6 text-white mr-4 inline-block lg:hidden" />
            <img src="logo1.png" alt="C Suite Navigator Image" className="mr-auto w-14 py-0 inline-block" />
            <h2 className='w-full mx-auto text-center text-2xl'>C Suite Navigator</h2>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-x-1">
                <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block min-w-24 py-3"
                    onClick={handleSignOut}
                >
                    <span>Sign Out</span>
                </Button>
                </div>
            </div>
        </div>
        <MobileNav open={openNav}>
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      <div id="mainbody" className="flex-grow mainbody min-w-screen flex flex-row">
        
      </div>
    </div>
  );
}

const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
 