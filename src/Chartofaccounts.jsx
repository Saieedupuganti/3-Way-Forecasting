import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase'; // Assuming Firebase configuration is imported correctly
import './ChartOfAccounts.css';

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState([]);
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
            id: latestDoc.id, // Assuming you have a unique identifier for each document
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

  const handleFieldEdit = (index, field, value) => {
    const updatedAccounts = [...accounts];
    const oldValue = updatedAccounts[index][field];
    const difference = parseFloat(value) - parseFloat(oldValue);
  
    // Update total for the account, formatting to two decimal places
    updatedAccounts[index][field] = parseFloat(value).toFixed(2);
  
    // Distribute the difference evenly across all months
    if (difference !== 0 && months.length > 0) {
      const differencePerMonth = difference / months.length;
      months.forEach(month => {
        updatedAccounts[index][month.toLowerCase()] =
          (parseFloat(updatedAccounts[index][month.toLowerCase()]) + differencePerMonth).toFixed(2);
      });
    }
  
    setAccounts(updatedAccounts);
    console.log(`Updating field '${field}' to '${value}' for document ID: ${updatedAccounts[index].id}`);
    updateFirestoreDocument(updatedAccounts[index].id, { [field]: parseFloat(value).toFixed(2) });
  };  
  

  const handleMonthEdit = async (index, month, value) => {
    try {
      const updatedAccounts = [...accounts];
      updatedAccounts[index][month.toLowerCase()] = parseFloat(value).toFixed(2);
  
      // Recalculate total after updating monthly value
      const monthlyValues = months.map(m => updatedAccounts[index][m.toLowerCase()] || 0);
      const total = monthlyValues.reduce((sum, val) => sum + Number(val), 0);
      updatedAccounts[index]['total'] = total.toFixed(2);
  
      setAccounts(updatedAccounts);
  
      // Prepare updated fields for Firestore update
      const updatedFields = {
        [month.toLowerCase()]: parseFloat(value).toFixed(2),
        total: total.toFixed(2)
      };
  
      await updateFirestoreDocument(updatedAccounts[index].id, updatedFields);
    } catch (error) {
      console.error('Error handling month edit:', error);
    }
  };
  
  
  

  const updateFirestoreDocument = async (documentId, updatedFields) => {
    try {
      const accountDocRef = doc(db, 'csvData', documentId);
      console.log(accounts);
      await updateDoc(accountDocRef, {
        data: accounts.map(account => ({
          'Account Name': account.name,
          'Account Number': account.number,
          'total': account.total,
          ...months.reduce((acc, month) => {
            acc[month] = account[month.toLowerCase()];
            return acc;
          }, {})
        }))
      });
      console.log('Document updated successfully.');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  
  

  const downloadCSV = () => {
    const headers = ['Account Number', 'Account Name', 'Total', ...months];
    const rows = accounts.map(account => [
      account.number,
      account.name,
      account.total,
      ...months.map(month => account[month.toLowerCase()])
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'chart_of_accounts.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <React.Fragment key={account.number}>
                <tr className="group">
                  <td>{account.number}</td>
                  <td>
                    <EditableField
                      value={account.name}
                      onChange={(value) => handleFieldEdit(index, 'name', value)}
                    />
                  </td>
                  <td>
                    <EditableField
                      value={account.total}
                      onChange={(value) => handleFieldEdit(index, 'total', parseFloat(value))}
                    />
                  </td>
                  {months.map((month, monthIndex) => (
                    <td key={monthIndex}>
                      <EditableField
                        value={account[month.toLowerCase()]}
                        onChange={(value) => handleMonthEdit(index, month, parseFloat(value))}
                      />
                    </td>
                  ))}
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

// Component for inline editable fields
const EditableField = ({ value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleDoubleClick = () => {
    setEditing(true);
    setInputValue(value);
  };

  const handleBlur = () => {
    setEditing(false);
    onChange(inputValue);
  };

  return (
    <div onClick={handleDoubleClick}>
      {editing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
};

export default ChartOfAccounts;
