import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp, onInputChange}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem 
                key={id} 
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp= {(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                onInputChange={(e) => onInputChange(e.currentTarget.value.slice(0, -1), id)}/>
        )
    });

    return(
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;