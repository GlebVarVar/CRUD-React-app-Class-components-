import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Gleb', salary: 3333, increase: false,rise: true, id: 1 },
        {name: 'Fedor', salary: 3333, increase: true,rise: false, id: 2 },
        {name: 'Matvei', salary: 33383, increase: true,rise: false, id: 3 }
      ], 
      term: '',
      filter: 'all'
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name, 
      salary, 
      increase: false, 
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
      
      
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    } 

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }

  onFilterselect = (filter) => {
    this.setState({filter});
  }

  onInputChange = (value, id) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, salary: value}
        }
        return item;
      })
    }))
    console.log(this.state.data);
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;

    const filtredData = this.filterPost(data, filter);
    const visibleData = this.searchEmp(filtredData, term);

    return (
      <div className="app">
        <AppInfo
          employees={employees} 
          increased={increased} />
  
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter filter={filter} onFilterSelect={this.onFilterselect}/>
        </div>
  
        <EmployeesList 
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          onInputChange={this.onInputChange}/>
        <EmployeesAddForm
          onAdd={this.addItem}/>
      </div>
    );
  }
  
}

export default App;
