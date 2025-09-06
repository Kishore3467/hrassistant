import React, { useState, useEffect } from "react";
import "./TaskDashboard.css";
import Topbar from "./Topbar";
// import Sidebar from "./Sidebar";

const TaskDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    employeeId: "",
    employeeName: "",
    startDate: "",
    dueDate: "",
    documentDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load employees & tasks for current user
  useEffect(() => {
    if (currentUser) {
      const storedEmployees =
        JSON.parse(localStorage.getItem(`employees_${currentUser.email}`)) || [];
      setEmployees(storedEmployees);

      const storedTasks =
        JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || [];
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

  return (
    <div className="task-dashboard-page">
      <Topbar />
      {/* <Sidebar /> */}

      <header className="task-header">
        <h2>Task Dashboard</h2>
        <button onClick={() => setIsModalOpen(true)}>Assign Task</button>
      </header>

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Document Submission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.employeeName || "Unknown"}</td>
                <td>{task.employeeId}</td>
                <td>{task.startDate}</td>
                <td>{task.dueDate}</td>
                <td>{task.documentDate}</td>
                <td>
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No tasks assigned yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? "Edit Task" : "Assign Task"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Task Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Assign to Employee:
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
              </label>
              {formData.employeeId && (
                <p>
                  <strong>Selected Employee ID:</strong> {formData.employeeId}
                </p>
              )}
              <label>
                Start Date:
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Document Submission Date:
                <input
                  type="date"
                  name="documentDate"
                  value={formData.documentDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">
                  {editingId ? "Update" : "Assign"}
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
