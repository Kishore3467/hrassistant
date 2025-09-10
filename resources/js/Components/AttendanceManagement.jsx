import React, { useState, useEffect } from "react";
import "./AttendanceManagement.css";

const AttendanceManagement = ({ currentHR }) => {
  const [attendance, setAttendance] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Sample data for demonstration
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        name: "John Doe",
        punchIn: "2023-05-15T08:30:00",
        punchInLocation: { lat: 40.7128, lng: -74.0060 },
        punchOut: "2023-05-15T17:15:00",
        punchOutLocation: { lat: 40.7128, lng: -74.0060 },
        companyId: 1
      },
      {
        id: 2,
        name: "Jane Smith",
        punchIn: "2023-05-15T09:15:00",
        punchInLocation: { lat: 40.7128, lng: -74.0060 },
        punchOut: null,
        punchOutLocation: null,
        companyId: 1
      },
      {
        id: 3,
        name: "Robert Johnson",
        punchIn: "2023-05-15T08:45:00",
        punchInLocation: { lat: 40.7128, lng: -74.0060 },
        punchOut: "2023-05-15T16:30:00",
        punchOutLocation: { lat: 40.7128, lng: -74.0060 },
        companyId: 1
      },
      {
        id: 4,
        name: "Emily Davis",
        punchIn: "2023-05-15T08:00:00",
        punchInLocation: { lat: 40.7128, lng: -74.0060 },
        punchOut: "2023-05-15T16:45:00",
        punchOutLocation: { lat: 40.7128, lng: -74.0060 },
        companyId: 1
      },
      {
        id: 5,
        name: "Michael Wilson",
        punchIn: "2023-05-15T09:30:00",
        punchInLocation: { lat: 40.7128, lng: -74.0060 },
        punchOut: null,
        punchOutLocation: null,
        companyId: 1
      }
    ];
    
    setAttendance(sampleData);
  }, []);

  // Function to generate Google Maps link
  const getMapsLink = (loc) =>
    loc ? `https://www.google.com/maps?q=${loc.lat},${loc.lng}` : null;

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort records
  const sortedRecords = React.useMemo(() => {
    let sortableItems = [...attendance];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [attendance, sortConfig]);

  // Filter and search functionality
  const filteredRecords = sortedRecords
    .filter(record => {
      if (filter === "punchedIn") return !record.punchOut;
      if (filter === "punchedOut") return record.punchOut;
      return true;
    })
    .filter(record => 
      record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // View record details
  const viewRecordDetails = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  // Format date and time
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "—";
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  // Calculate stats
  const totalRecords = attendance.length;
  const clockedInCount = attendance.filter(r => !r.punchOut).length;
  const clockedOutCount = attendance.filter(r => r.punchOut).length;

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <div className="header-content">
          <h2 className="title">
            Attendance Records - {currentHR?.companyName || "Company"}
          </h2>
          <p className="subtitle">MONITOR AND MANAGE EMPLOYEE ATTENDANCE</p>
        </div>
        
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-buttons">
            <button 
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button 
              className={filter === "punchedIn" ? "active" : ""}
              onClick={() => setFilter("punchedIn")}
            >
              Clocked In
            </button>
            <button 
              className={filter === "punchedOut" ? "active" : ""}
              onClick={() => setFilter("punchedOut")}
            >
              Clocked Out
            </button>
          </div>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-info">
            <h3>{totalRecords}</h3>
            <p>Total Records</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon in">✅</div>
          <div className="stat-info">
            <h3>{clockedInCount}</h3>
            <p>Currently Clocked In</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon out">📋</div>
          <div className="stat-info">
            <h3>{clockedOutCount}</h3>
            <p>Clocked Out Today</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Name {sortConfig.key === 'name' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => handleSort('punchIn')}>
                Punch In {sortConfig.key === 'punchIn' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>Punch In Location</th>
              <th onClick={() => handleSort('punchOut')}>
                Punch Out {sortConfig.key === 'punchOut' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>Punch Out Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length ? (
              filteredRecords.map((record, index) => (
                <tr key={record.id} className="fade-in-row">
                  <td className="employee-name">
                    <div className="avatar">
                      {record.name.charAt(0).toUpperCase()}
                    </div>
                    {record.name}
                  </td>
                  <td>{formatDateTime(record.punchIn)}</td>
                  <td>
                    {record.punchInLocation ? (
                      <a
                        href={getMapsLink(record.punchInLocation)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                      >
                        <span className="map-pin">📍</span> View Map
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{formatDateTime(record.punchOut) || "—"}</td>
                  <td>
                    {record.punchOutLocation ? (
                      <a
                        href={getMapsLink(record.punchOutLocation)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                      >
                        <span className="map-pin">📍</span> View Map
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <span className={`status ${record.punchOut ? 'clocked-out' : 'clocked-in'}`}>
                      {record.punchOut ? "Clocked Out" : "Clocked In"}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-details-btn"
                      onClick={() => viewRecordDetails(record)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-records">
                <td colSpan="7">
                  <div className="no-data">
                    <div className="no-data-icon">📊</div>
                    <p>No attendance records found</p>
                    {searchTerm && <p>Try adjusting your search</p>}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showModal && selectedRecord && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Attendance Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Employee:</span>
                <span className="detail-value">{selectedRecord.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Punch In:</span>
                <span className="detail-value">{formatDateTime(selectedRecord.punchIn)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Punch In Location:</span>
                <span className="detail-value">
                  {selectedRecord.punchInLocation ? (
                    <a
                      href={getMapsLink(selectedRecord.punchInLocation)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                    >
                      View Location
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Punch Out:</span>
                <span className="detail-value">{formatDateTime(selectedRecord.punchOut) || "—"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Punch Out Location:</span>
                <span className="detail-value">
                  {selectedRecord.punchOutLocation ? (
                    <a
                      href={getMapsLink(selectedRecord.punchOutLocation)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                    >
                      View Location
                    </a>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status ${selectedRecord.punchOut ? 'clocked-out' : 'clocked-in'}`}>
                  {selectedRecord.punchOut ? "Clocked Out" : "Clocked In"}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;