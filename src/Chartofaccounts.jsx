import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase'; // Assuming Firebase configuration is imported correctly
import './ChartOfAccounts.css';

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which index is being edited
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsCollection = collection(db, 'csvData');
        const accountsQuery = query(accountsCollection, orderBy('timestamp', 'desc'), limit(1));
        const accountsSnapshot = await getDocs(accountsQuery);

        if (accountsSnapshot.empty) {
          console.log('No documents found.');
          return;
        }

        // Fetch the latest document
        const latestDoc = accountsSnapshot.docs[0];
        const data = latestDoc.data().data;
        console.log('Latest document data:', data);

        const accountsList = data.map(account => {
          const monthlyValues = months.map(month => account[month] || 0);
          const total = monthlyValues.reduce((sum, value) => sum + Number(value), 0);
          return {
            number: account['Account Number'],
            name: account['Account Name'],
            total: total,
            ...months.reduce((acc, month) => {
              acc[month.toLowerCase()] = account[month];
              return acc;
            }, {})
          };
        });

        setAccounts(accountsList);
        console.log('Fetched metadata from Firestore:', accountsList);

      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index); // Set the index of the item being edited
  };

  const handleSave = async (index) => {
    try {
      const accountToUpdate = accounts[index];
      const accountDocRef = doc(db, 'csvData', 'your_document_id_here'); // Replace with your actual document ID
      await updateDoc(accountDocRef, {
        'data': {
          ...accountToUpdate,
          // Update specific fields here if needed
        }
      });
      setEditIndex(null); // Reset edit state after saving
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const downloadCSV = () => {
    // Same as your existing downloadCSV function
  };

  return (
    <div className="chart-of-accounts">
      <h1>Chart of Accounts</h1>
      <button onClick={downloadCSV}>Download CSV</button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Name</th>
              <th>Total</th>
              {months.map(month => (
                <th key={month}>{month}</th>
              ))}
              <th>Edit</th> {/* Add edit column header */}
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <React.Fragment key={account.number}>
                <tr className="group">
                  <td>{account.number}</td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={account.name}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setAccounts(prevAccounts => {
                            const updatedAccounts = [...prevAccounts];
                            updatedAccounts[index] = { ...updatedAccounts[index], name: newName };
                            return updatedAccounts;
                          });
                        }}
                      />
                    ) : (
                      account.name
                    )}
                  </td>
                  <td>{account.total}</td>
                  {months.map((month, monthIndex) => (
                    <td key={monthIndex}>
                      {account[month.toLowerCase()]}
                    </td>
                  ))}
                  <td>
                    {editIndex === index ? (
                      <button onClick={() => handleSave(index)}>Save</button>
                    ) : (
                      <button onClick={() => handleEdit(index)}>Edit</button>
                    )}
                  </td>
                </tr>
                {account.children && account.children.map(child => (
                  <tr key={child.number} className="account">
                    {/* Render child rows similarly if needed */}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChartOfAccounts;
