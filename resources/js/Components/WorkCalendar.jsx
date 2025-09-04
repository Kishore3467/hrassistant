import React, { useEffect, useState } from "react";
import "./WorkCalendar.css";

export default function WorkCalendar() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendars, setCalendars] = useState(
    JSON.parse(localStorage.getItem("calendars")) || []
  );

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // edit | delete
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sorted = data
            .map((c) => c.name.common)
            .sort((a, b) => a.localeCompare(b));
          setCountries(sorted);
        }
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Persist in localStorage
  useEffect(() => {
    localStorage.setItem("calendars", JSON.stringify(calendars));
  }, [calendars]);

  // Add Calendar
  const addCalendar = () => {
    if (!selectedCountry) return alert("Please select a country");
    const newEntry = { country: selectedCountry, year };
    setCalendars([...calendars, newEntry]);
    setSelectedCountry("");
    setYear(new Date().getFullYear());
  };

  // Edit Calendar
  const handleEditClick = (index) => {
    setSelectedIndex(index);
    setSelectedCountry(calendars[index].country);
    setYear(calendars[index].year);
    setModalType("edit");
    setShowModal(true);
  };

  const saveEdit = () => {
    const updated = [...calendars];
    updated[selectedIndex] = { country: selectedCountry, year };
    setCalendars(updated);
    setShowModal(false);
  };

  // Delete Calendar
  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    setModalType("delete");
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updated = calendars.filter((_, i) => i !== selectedIndex);
    setCalendars(updated);
    setShowModal(false);
  };

  return (
    <div className="work-calendar">
      <h2>Work Calendar</h2>

      {/* Form */}
      <div className="form-group">
        <label>Select Country:</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">-- Choose a country --</option>
          {countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Year:</label>
        <input
          type="number"
          value={year}
          min="2000"
          max="2100"
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <button className="btn primary" onClick={addCalendar}>
        ➕ Add Calendar
      </button>

      {/* Table */}
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {calendars.map((item, i) => (
            <tr key={i}>
              <td>{item.country}</td>
              <td>{item.year}</td>
              <td>
                <button className="btn edit" onClick={() => handleEditClick(i)}>
                  Edit
                </button>
                <button
                  className="btn delete"
                  onClick={() => handleDeleteClick(i)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit/Delete Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>

            {modalType === "edit" && (
              <>
                <h3>Edit Calendar</h3>
                <div className="form-group">
                  <label>Country:</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map((country, i) => (
                      <option key={i} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Year:</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <button className="btn primary" onClick={saveEdit}>
                  Save Changes
                </button>
              </>
            )}

            {modalType === "delete" && (
              <>
                <h3>Confirm Delete</h3>
                <p>
                  Are you sure you want to delete calendar for{" "}
                  <strong>{calendars[selectedIndex].country}</strong> (
                  {calendars[selectedIndex].year})?
                </p>
                <button className="btn delete" onClick={confirmDelete}>
                  Delete
                </button>
                <button
                  className="btn secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
