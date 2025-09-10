import React, { useState, useEffect } from "react";
import "./TaskDashboard.css";

const TaskDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { email: "demo@example.com" };
  const [employees, setEmployees] = useState([
    { employeeId: "EMP001", name: "John Doe" },
    { employeeId: "EMP002", name: "Jane Smith" },
    { employeeId: "EMP003", name: "Robert Johnson" }
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Project Proposal", employeeId: "EMP001", employeeName: "John Doe", startDate: "2023-10-15", dueDate: "2023-10-25", documentDate: "2023-10-20", status: "inProgress", priority: "high" },
    { id: 2, title: "Update Documentation", employeeId: "EMP002", employeeName: "Jane Smith", startDate: "2023-10-10", dueDate: "2023-10-30", documentDate: "2023-10-28", status: "pending", priority: "medium" },
    { id: 3, title: "Fix UI Issues", employeeId: "EMP003", employeeName: "Robert Johnson", startDate: "2023-10-05", dueDate: "2023-10-15", documentDate: "2023-10-12", status: "completed", priority: "low" }
  ]);
  const [formData, setFormData] = useState({
    title: "",
    employeeId: "",
    employeeName: "",
    startDate: "",
    dueDate: "",
    documentDate: "",
    status: "pending",
    priority: "medium"
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load employees & tasks for current user
  useEffect(() => {
    if (currentUser) {
      const storedEmployees = JSON.parse(localStorage.getItem(`employees_${currentUser.email}`)) || employees;
      setEmployees(storedEmployees);

      const storedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || tasks;
      setTasks(storedTasks);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "employeeId") {
      const selectedEmp = employees.find((emp) => emp.employeeId === value);
      setFormData({
        ...formData,
        employeeId: value,
        employeeName: selectedEmp ? selectedEmp.name : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employeeId) return alert("Please assign to an employee");

    let updatedTasks;
    if (editingId) {
      updatedTasks = tasks.map((task) =>
        task.id === editingId ? { ...formData, id: editingId } : task
      );
      setEditingId(null);
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
      };
      updatedTasks = [...tasks, newTask];
    }

    setTasks(updatedTasks);
    localStorage.setItem(
      `tasks_${currentUser.email}`,
      JSON.stringify(updatedTasks)
    );

    setFormData({
      title: "",
      employeeId: "",
      employeeName: "",
      startDate: "",
      dueDate: "",
      documentDate: "",
      status: "pending",
      priority: "medium"
    });
    setIsModalOpen(false);
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      employeeId: task.employeeId,
      employeeName: task.employeeName,
      startDate: task.startDate,
      dueDate: task.dueDate,
      documentDate: task.documentDate,
      status: task.status || "pending",
      priority: task.priority || "medium"
    });
    setEditingId(task.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((t) => t.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem(
        `tasks_${currentUser.email}`,
        JSON.stringify(updatedTasks)
      );
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(
      `tasks_${currentUser.email}`,
      JSON.stringify(updatedTasks)
    );
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Calculate statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === "completed").length,
    pending: tasks.filter(task => task.status === "pending").length,
    inProgress: tasks.filter(task => task.status === "inProgress").length,
  };

  return (
    <div className="task-dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Task Dashboard</h1>
            <p>Manage and track your team's tasks efficiently</p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="icon-plus">+</span>
            Assign New Task
          </button>
        </header>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total-tasks">
              <span className="icon">📋</span>
            </div>
            <div className="stat-info">
              <h3>{taskStats.total}</h3>
              <p>Total Tasks</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon completed">
              <span className="icon">✓</span>
            </div>
            <div className="stat-info">
              <h3>{taskStats.completed}</h3>
              <p>Completed</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon pending">
              <span className="icon">⏱</span>
            </div>
            <div className="stat-info">
              <h3>{taskStats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon in-progress">
              <span className="icon">🔄</span>
            </div>
            <div className="stat-info">
              <h3>{taskStats.inProgress}</h3>
              <p>In Progress</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="controls-row">
          <div className="search-box">
            <span className="icon-search">🔍</span>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Assigned To</th>
                <th>Employee ID</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Document Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="fade-in">
                    <td>
                      <div className="task-title">
                        <span className={`priority-indicator ${task.priority || 'medium'}`}></span>
                        {task.title}
                      </div>
                    </td>
                    <td>{task.employeeName || "Unknown"}</td>
                    <td>{task.employeeId}</td>
                    <td>{task.startDate}</td>
                    <td>
                      <div className="due-date">
                        {task.dueDate}
                        {new Date(task.dueDate) < new Date() && task.status !== 'completed' && (
                          <span className="overdue-badge">Overdue</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`priority-badge ${task.priority || 'medium'}`}>
                        {task.priority || 'medium'}
                      </span>
                    </td>
                    <td>
                      <select 
                        className={`status-select ${task.status || 'pending'}`}
                        value={task.status || 'pending'}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td>{task.documentDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-icon edit"
                          onClick={() => handleEdit(task)}
                          title="Edit task"
                        >
                          <span className="icon-edit">✏️</span>
                        </button>
                        <button 
                          className="btn-icon delete"
                          onClick={() => handleDelete(task.id)}
                          title="Delete task"
                        >
                          <span className="icon-trash">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    <div className="no-data-content">
                      <span className="icon-folder">📁</span>
                      <p>No tasks found. Create your first task!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content slide-in">
            <div className="modal-header">
              <h3>{editingId ? "Edit Task" : "Assign New Task"}</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                  setFormData({
                    title: "",
                    employeeId: "",
                    employeeName: "",
                    startDate: "",
                    dueDate: "",
                    documentDate: "",
                    status: "pending",
                    priority: "medium"
                  });
                }}
              >
                <span className="icon-x">✕</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="task-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Task Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter task title"
                  />
                </div>
                
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Assign to Employee *</label>
                <select
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.employeeId} value={emp.employeeId}>
                      {emp.name} ({emp.employeeId})
                    </option>
                  ))}
                </select>
              </div>
              
              {formData.employeeId && (
                <div className="selected-employee">
                  <strong>Selected Employee:</strong> {formData.employeeName} (ID: {formData.employeeId})
                </div>
              )}
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Due Date *</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Document Submission Date *</label>
                <input
                  type="date"
                  name="documentDate"
                  value={formData.documentDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Initial Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    setFormData({
                      title: "",
                      employeeId: "",
                      employeeName: "",
                      startDate: "",
                      dueDate: "",
                      documentDate: "",
                      status: "pending",
                      priority: "medium"
                    });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;