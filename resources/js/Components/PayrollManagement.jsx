import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import './PayrollManagement.css';

const PayrollManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/payrolls');
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Calculate net pay
  const calculateNetPay = (salary, bonus, deductions) => salary + bonus - deductions;

  // Format date
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  // Sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter(emp =>
    Object.values(emp).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: ['salary','bonus','deductions'].includes(name) ? parseFloat(value)||0 : value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEmployee.id) {
        await axios.put(`http://127.0.0.1:8000/api/payrolls/${currentEmployee.id}`, currentEmployee);
      } else {
        await axios.post('http://127.0.0.1:8000/api/payrolls', currentEmployee);
      }
      setIsFormOpen(false);
      setCurrentEmployee(null);
      fetchEmployees();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        alert('Validation error:\n' + JSON.stringify(error.response.data.errors, null, 2));
      } else {
        console.error('Error saving employee:', error);
      }
    }
  };

  // Edit
  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setIsFormOpen(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee record?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/payrolls/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="payroll-container">
      <header className="payroll-header">
        <h1>Payroll Management System</h1>
      </header>

      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          className="add-employee-btn"
          onClick={() => {
            setCurrentEmployee({ name:'', employee_id:'', position:'', department:'Engineering', join_date:new Date().toISOString().split('T')[0], salary:0, bonus:0, deductions:0, status:'Active' });
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add Employee
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="form-modal">
          <div className="form-content">
            <h2>{currentEmployee.id ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" value={currentEmployee.name} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                  <label>Employee ID</label>
                  <input name="employee_id" value={currentEmployee.employee_id} onChange={handleInputChange} required/>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Position</label>
                  <input name="position" value={currentEmployee.position} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select name="department" value={currentEmployee.department} onChange={handleInputChange}>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Human Resources</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Join Date</label>
                  <input type="date" name="join_date" value={currentEmployee.join_date} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={currentEmployee.status} onChange={handleInputChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Salary</label>
                  <input type="number" name="salary" value={currentEmployee.salary} onChange={handleInputChange} min="0"/>
                </div>
                <div className="form-group">
                  <label>Bonus</label>
                  <input type="number" name="bonus" value={currentEmployee.bonus} onChange={handleInputChange} min="0"/>
                </div>
                <div className="form-group">
                  <label>Deductions</label>
                  <input type="number" name="deductions" value={currentEmployee.deductions} onChange={handleInputChange} min="0"/>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setIsFormOpen(false)}>Cancel</button>
                <button type="submit" className="primary">{currentEmployee.id ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="payroll-table-container">
        <table className="payroll-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('name')}>Name</th>
              <th onClick={() => requestSort('employee_id')}>Employee ID</th>
              <th>Position</th>
              <th>Department</th>
              <th>Join Date</th>
              <th>Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? filteredEmployees.map(emp => (
              <tr key={emp.id} className={emp.status === 'Inactive' ? 'inactive' : ''}>
                <td>
                  <div className="employee-cell">
                    <span className="employee-name">{emp.name}</span>
                    <span className="employee-id">{emp.employee_id}</span>
                  </div>
                </td>
                <td>{emp.employee_id}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{formatDate(emp.join_date)}</td>
                <td className="amount">{emp.salary}</td>
                <td className="amount">{emp.bonus}</td>
                <td className="amount deductions">{emp.deductions}</td>
                <td className="amount net-pay">{calculateNetPay(emp.salary, emp.bonus, emp.deductions)}</td>
                <td>
                  <span className={`status-badge ${emp.status.toLowerCase()}`}>{emp.status}</span>
                </td>
                <td>
                  <div className="actions">
                    <button onClick={() => handleEdit(emp)}><FiEdit2 /></button>
                    <button onClick={() => handleDelete(emp.id)}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="11" className="no-results">No employees found</td></tr>
            )}
          </tbody>
        </table>
        
      </div>
    </div>

  );
};

export default PayrollManagement;
