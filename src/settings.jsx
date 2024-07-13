import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase'; // Make sure this path is correct
import AddBusinessUnitModal from './AddBusinessUnitModal'; // Import the modal component
import './settings.css'; // Your CSS file

const Settings = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrganisationOpen, setIsOrganisationOpen] = useState(false);
  const [isBusinessUnitOpen, setIsBusinessUnitOpen] = useState(false); // Corrected variable name
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail('');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleOrganisation = () => {
    setIsOrganisationOpen(!isOrganisationOpen);
  };

  const toggleBusinessUnit = () => {
    setIsBusinessUnitOpen(!isBusinessUnitOpen); // Corrected function name
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return ( 
    <div className='totalcontainer'>
      <div className="container">
        <div className="header" onClick={toggleProfile}>
          <span className="icon"><b>Profile</b></span>
          <FontAwesomeIcon icon={isProfileOpen ? faCaretUp : faCaretDown} size="3x" className="more-options-icon" />
        </div>
        {isProfileOpen && (
          <div className="content">
            <p><b>Email :</b> {email}</p>
          </div>
        )}
      </div>
      <div className="container">
        <div className="header" onClick={toggleOrganisation}>
          <span className="icon"><b>Organisation</b></span>
          <FontAwesomeIcon icon={isOrganisationOpen ? faCaretUp : faCaretDown} size="3x" className="more-options-icon" />
        </div>
        {isOrganisationOpen && (
          <div className="content">
            <div className="organisation-details">
              <span className="header">
                <p>This is the Organisation content.</p>
                <button className="add-organisation-button" onClick={openModal}>Add Organisation</button>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="header" onClick={toggleBusinessUnit}>
          <span className="icon"><b>Business Unit</b></span>
          <FontAwesomeIcon icon={isBusinessUnitOpen ? faCaretUp : faCaretDown} size="3x" className="more-options-icon" />
        </div>
        {isBusinessUnitOpen && (
          <div className="content">
            <div className="business-unit-details">
              <span className="header">
                <p>This is the Business Unit content.</p>
                <button className="add-business-unit-button" onClick={openModal}>Add Business Unit</button>
              </span>
            </div>
          </div>
        )}
      </div>
      <AddBusinessUnitModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Settings;
