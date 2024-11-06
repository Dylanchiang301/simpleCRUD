import "./App.css";
import { useState } from "react";
import Axios from "axios";
import DataCard from "./DataCard";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:4001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:4001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        getEmployees()
      }
    });
  };

  const updateEmployeeWage = (id) => {
    if (!id) return
    Axios.put("http://localhost:4001/update", { wage: newWage, id: id }).then(
      // eslint-disable-next-line no-unused-vars
      (response) => {
        if (response.status === 200 || response.status === 201) getEmployees()
      }
    );
  };

  const deleteEmployee = (id) => {
    const isConfirmed = window.confirm('確定要刪除嗎？');
    if (isConfirmed) {
      if (!id) return
      Axios.delete(`http://localhost:4001/delete/${id}`).then((response) => {
        if (response.status === 200 || response.status === 201) getEmployees()

      });
    }
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={getEmployees}>Show Employees</button>
      </div>
      <div className="employees">

        {employeeList.map(val => (
          <DataCard
            key={val.id}
            val={val}
            setNewWage={setNewWage}
            updateEmployeeWage={updateEmployeeWage}
            deleteEmployee={deleteEmployee}
          />))}
      </div>
    </div>
  );
}

export default App;
