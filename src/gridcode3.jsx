import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const Td = ({ value, editable, record, column, handleSave,dataSource }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = () => {
    handleSave(record.key, column, parseFloat(val));
    toggleEdit();
  };
  useEffect(()=>{
    console.log(dataSource,record,column);
    if(record!==undefined)setVal(dataSource[record.key-1][column])
    // else setVal(dataSource[record.parentId][column])
    
    // setVal(dataSource[record.key][column]);
  },[dataSource]);

  return (
    <td>
      {editing ? (
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={save}
          onKeyPress={(e) => {
            if (e.key === "Enter") save();
          }}
          autoFocus
        />
      ) : (
        <div onClick={editable ? toggleEdit : undefined}>
          {record!=undefined?
          dataSource[record!=undefined?record.key-1:''][column]:
          val}
        </div>
      )}
    </td>
  );
};

const Table3 = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      name: 'John Doe',
      age: 30,
      city: 'New York',
      parent: true
    },
    {
      key: 2,
      name: 'Jane Doe',
      age: 28,
      city: 'Los Angeles',
      parent: false,
      parentId: 1
    },
    {
      key: 3,
      name: 'Jack Doe',
      age: 20,
      city: 'Los Angeles',
      parent: false,
      parentId: 1
    },
    {
      key: 4,
      name: 'Jim Beam',
      age: 32,
      city: 'Chicago',
      parent: true
    },
    {
      key: 5,
      name: 'Jake Beam',
      age: 27,
      city: 'Miami',
      parent: false,
      parentId: 4
    }
  ]);

  const handleExpandClick = (parentId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(parentId)
        ? prevExpandedRows.filter((id) => id !== parentId)
        : [...prevExpandedRows, parentId]
    );
  };

  const handleSave = (key, column, value) => {
    console.log(key, column, value);
    const newData = [...dataSource];
    const index = newData.findIndex((item) => item.key === key);
    if (index > -1) {
      const item = newData[index];
      const oldValue = item[column];
      item[column] = value;
      newData.splice(index, 1, {
        ...item,
      });

      if (item.parent) {
        console.log('parent')
        // Parent row edited
        const children = newData.filter((row) => row.parentId === item.key);
        const totalOldValue = children.reduce((sum, child) => sum + child[column], 0);
        const ratio = value / totalOldValue;
        children.forEach((child) => {
          child[column] = Math.round(child[column] * ratio);
        });
      } else {
        console.log('child')
        // Child row edited
        const parent = newData.find((row) => row.key === item.parentId);
        const siblings = newData.filter((row) => row.parentId === item.parentId);
        console.log(siblings)
        const totalValue = siblings.reduce((sum, sibling) => sum + sibling[column], 0);
        console.log(newData)
        parent[column] = totalValue;
      }

      setDataSource(newData);
    }
  };
  
  // useEffect(() => {
  //   console.log('DataSource changed:', dataSource);
  // }, [dataSource]);

  return (
    <div className="tablediv w-full h-full">
      <table>
        <thead>
          <tr>
            <th>Expand</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {dataSource && dataSource.map((row) => {
            if (!row.parent && !expandedRows.includes(row.parentId)) {
              return null; // Don't render child rows if their parent is not expanded
            }
            return (
              <tr key={row.key}>
                <Td
                  dataSource={dataSource}

                  value={row.parent ? <Button onClick={() => handleExpandClick(row.key)}>{expandedRows.includes(row.key) ? '-' : '+'}</Button> : null}
                  editable={false}
                />
                <Td
                  dataSource={dataSource}
                  value={row.name}
                  editable={true}
                  record={row}
                  column="name"
                  handleSave={handleSave}
                />
                <Td
                  dataSource={dataSource}
                  value={row.age}
                  editable={true}
                  record={row}
                  column="age"
                  handleSave={handleSave}
                  />
                <Td
                  dataSource={dataSource}
                  value={row.city}
                  editable={true}
                  record={row}
                  column="city"
                  handleSave={handleSave}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table3;
