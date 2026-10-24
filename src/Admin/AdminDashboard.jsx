import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

// Dummy Data for Complaints
const initialComplaints = [
  { id: 'CMP-1042', student: 'Rahul Sharma', category: 'Hostel Facilities', date: '2024-05-18', status: 'Pending', desc: 'Water cooler in Block B is not working.' },
  { id: 'CMP-1043', student: 'Aisha Khan', category: 'Academic Issues', date: '2024-05-18', status: 'In Progress', desc: 'Missing marks for Semester 4 Internal Assessment.' },
  { id: 'CMP-1044', student: 'Vikram Singh', category: 'Infrastructure', date: '2024-05-17', status: 'Resolved', desc: 'Broken bench near the Arts Faculty library.' },
  { id: 'CMP-1045', student: 'Fatima Ali', category: 'Safety & Security', date: '2024-05-17', status: 'Pending', desc: 'Street light near Gate 3 is broken and it is very dark.' },
  { id: 'CMP-1046', student: 'John Doe', category: 'IT & Digital Services', date: '2024-05-16', status: 'In Progress', desc: 'Unable to access the student portal using college Wi-Fi.' },
];

export default function AdminDashboard() {
  const navigate = useNavigate(); // <-- INITIALIZED

  const [complaints, setComplaints] = useState(initialComplaints);
  const [activeTab, setActiveTab] = useState('All');

  // Filter complaints based on tab
  const filteredComplaints = activeTab === 'All' 
    ? complaints 
    : complaints.filter(c => c.status === activeTab);

  // Handle status change
  const updateStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  // Status Badge Helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans flex flex-col">
      
      {/* Top Navigation */}
      <header className="bg-[#004D2D] text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
             <span className="text-[#004D2D] font-extrabold text-xl">AMU</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-white/80 hidden sm:block">Welcome, Admin</span>
          
          {/* LOGOUT BUTTON */}
          <button 
            onClick={() => navigate('/admin')}
            className="bg-[#D4AF37] hover:bg-[#c49f2c] text-[#292929] px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Complaints', value: complaints.length, color: 'bg-white', icon: '📋' },
            { label: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, color: 'bg-yellow-50', icon: '⏳' },
            { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, color: 'bg-blue-50', icon: '⚙️' },
            { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: 'bg-green-50', icon: '✅' },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={stat.label} 
              className={`p-6 rounded-2xl border border-gray-200 shadow-sm ${stat.color} flex items-center justify-between`}
            >
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-extrabold text-[#292929]">{stat.value}</h3>
              </div>
              <div className="text-3xl opacity-80">{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Complaints Table Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Table Header & Filters */}
          <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-[#292929]">Recent Complaints</h2>
            
            <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto">
              {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md whitespace-nowrap transition-all ${
                    activeTab === tab ? 'bg-white text-[#004D2D] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Student</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-bold text-[#004D2D] whitespace-nowrap">{complaint.id}</td>
                    <td className="p-4 text-sm text-gray-700 font-medium whitespace-nowrap">{complaint.student}</td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-semibold">{complaint.category}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-500 min-w-[200px] max-w-xs truncate">{complaint.desc}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <select 
                        value={complaint.status}
                        onChange={(e) => updateStatus(complaint.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded-lg p-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3F]/40 cursor-pointer"
                      >
                        <option value="Pending">Mark Pending</option>
                        <option value="In Progress">Mark In Progress</option>
                        <option value="Resolved">Mark Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
                
                {filteredComplaints.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No complaints found for this status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Placeholder */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {filteredComplaints.length} entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}