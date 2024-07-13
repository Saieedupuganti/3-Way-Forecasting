import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddBusinessUnitModal.css'; // Make sure to adjust the CSS path as per your project structure

Modal.setAppElement('#root'); 

const AddBusinessUnitModal = ({ isOpen, onRequestClose }) => {
  const [businessUnits, setBusinessUnits] = useState([{ number: '', name: '' }]);

  const handleAddBusinessUnit = () => {
    setBusinessUnits([...businessUnits, { number: '', name: '' }]);
  };

  const handleRemoveBusinessUnit = (index) => {
    const newBusinessUnits = businessUnits.filter((_, i) => i !== index);
    setBusinessUnits(newBusinessUnits);
  };

  const handleInputChange = (index, field, value) => {
    const newBusinessUnits = businessUnits.map((unit, i) => 
      i === index ? { ...unit, [field]: value } : unit
    );
    setBusinessUnits(newBusinessUnits);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Business Unit" >
      <h2 className='mainheader'><b>Add Business Units</b></h2>
      <div className="modal-content">
        {businessUnits.map((unit, index) => (
          <div className="input-group" key={index}>
            <input 
              type="text" 
              placeholder="Number" 
              value={unit.number}
              onChange={(e) => handleInputChange(index, 'number', e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Name" 
              value={unit.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            />
            <button 
              className="remove-unit-button" 
              onClick={() => handleRemoveBusinessUnit(index)}
            >
              &times;
            </button>
          </div>
        ))}
        <button className="add-another-unit-button" onClick={handleAddBusinessUnit}>
          ADD ANOTHER BUSINESS UNIT
        </button>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onRequestClose}>Cancel</button>
          <button className="add-button">ADD BUSINESS UNITS</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddBusinessUnitModal;
