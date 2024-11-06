/* eslint-disable react/prop-types */
import { useState } from "react";


const DataCard = (props) => {

    const {
        val,
        setNewWage,
        updateEmployeeWage,
        deleteEmployee
    } = props

    const [isEdit, setIsEdit] = useState(false);


    return (
        <div className="employee">
            <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
                <button className={isEdit && 'hidden'} onClick={() => setIsEdit(true)}> Edit wage</button>
            </div>
            <div>
                <input
                    className={!isEdit && 'hidden'}
                    type="text"
                    placeholder="update wage"
                    onChange={(event) => {
                        setNewWage(event.target.value);
                    }}
                />
            </div>
            <div>
                <button
                    className={!isEdit && 'hidden'}
                    onClick={() => {
                        updateEmployeeWage(val.id);
                        setIsEdit(false)
                    }}
                >
                    {" "}
                    Update
                </button>
                <button
                    className={!isEdit && 'hidden'}
                    onClick={() => setIsEdit(false)}
                >
                    Cancel Edit Wage
                </button>
                <button
                    className={isEdit && 'hidden'}
                    onClick={() => {
                        deleteEmployee(val.id);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DataCard