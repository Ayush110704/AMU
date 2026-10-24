import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ComplaintModal from './ComplaintModal'; 
// Import the Logo from assets
import AmuLogo from '../assets/AmuLogo.png'; 

// Expanded Dummy Data matching the Form fields
const initialComplaints = [
  { 
    id: 'CMP-1042', 
    name: 'Rahul Sharma', 
    studentId: 'AMU2026001',
    rollNumber: '22BSC001',
    email: 'rahul@amu.ac.in',
    mobile: '+91 98765 43210',
    department: 'Computer Science',
    course: 'BSc, Year 2',
    residence: 'SRK Hostel',
    title: 'Water cooler not working',
    category: 'Hostel and Campus Facilities', 
    location: 'SRK Hostel, Block B',
    incidentDate: '2024-05-18',
    description: 'The water cooler in Block B has been out of order for 3 days. Students are facing difficulty, especially during the afternoon heat.', 
    resolution: 'Repair the cooler or provide an alternative water dispenser immediately.',
    date: '2024-05-18', 
    status: 'Pending', 
    adminRemarks: '' 
  },
  { 
    id: 'CMP-1043', 
    name: 'Aisha Khan', 
    studentId: 'AMU2026045',
    rollNumber: '21BA002',
    email: 'aisha@amu.ac.in',
    mobile: '+91 87654 32109',
    department: 'Arts',
    course: 'BA, Year 3',
    residence: ' Abdullah Hall',
    title: 'Missing marks for internal assessment',
    category: 'Academic Facilities', 
    location: 'Arts Faculty, Room 4',
    incidentDate: '2024-05-15',
    description: 'My marks for Semester 4 Internal Assessment are showing as absent on the portal, even though I attended all classes and submitted all assignments.', 
    resolution: 'Update the portal with correct marks.',
    date: '2024-05-18', 
    status: 'In Progress', 
    adminRemarks: 'Checking with the department.' 
  },
  { 
    id: 'CMP-1044', 
    name: 'Vikram Singh', 
    studentId: 'AMU2026012',
    rollNumber: '23BCOM010',
    email: 'vikram@amu.ac.in',
    mobile: '+91 76543 21098',
    department: 'Commerce',
    course: 'BCom, Year 1',
    residence: 'Day Scholar',
    title: 'Broken bench near library',
    category: 'Infrastructure and Maintenance', 
    location: 'Arts Faculty Library Lawn',
    incidentDate: '2024-05-16',
    description: 'The wooden bench near the library entrance is broken and has exposed nails. It is a safety hazard.', 
    resolution: 'Repair or replace the bench.',
    date: '2024-05-17', 
    status: 'Resolved', 
    adminRemarks: 'Maintenance team fixed it.' 
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [complaints, setComplaints] = useState(initialComplaints);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Filter complaints
  const filteredComplaints = activeTab === 'All' 
    ? complaints 
    : complaints.filter(c => c.status === activeTab);

  // Handle status & remarks update from Modal
  const handleUpdateStatus = (id, newStatus, remarks) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: newStatus, adminRemarks: remarks } : c
    ));
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
          {/* Logo Container */}
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-sm">
             <img 
               src={AmuLogo} 
               alt="AMU Logo" 
               className="w-full h-full object-contain" 
             />
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-white/80 hidden sm:block">Welcome, Admin</span>
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
            { label: 'Total Complaints', value: complaints.length, color: 'bg-white', iconColor: 'text-gray-400 bg-gray-50', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> },
            { label: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, color: 'bg-yellow-50', iconColor: 'text-yellow-600 bg-yellow-100', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
            { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, color: 'bg-blue-50', iconColor: 'text-blue-600 bg-blue-100', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> },
            { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: 'bg-green-50', iconColor: 'text-green-600 bg-green-100', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
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
              <div className={`p-3 rounded-xl ${stat.iconColor}`}>{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Complaints Table Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          
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
                  <tr 
                    key={complaint.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedComplaint(complaint)}
                  >
                    <td className="p-4 text-sm font-bold text-[#004D2D] whitespace-nowrap group-hover:text-[#006B3F] transition-colors">{complaint.id}</td>
                    <td className="p-4 text-sm text-gray-700 font-medium whitespace-nowrap">{complaint.name}</td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-semibold">{complaint.category}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-500 min-w-[200px] max-w-xs truncate">{complaint.title}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button className="text-xs font-bold text-[#006B3F] border border-[#006B3F]/20 bg-[#E6F2EC] px-3 py-1.5 rounded-lg hover:bg-[#d1e8db] transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-200 flex items-center justify-end text-sm text-gray-500">
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>

      </main>

      {/* Render Modal */}
      {selectedComplaint && (
        <ComplaintModal 
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

    </div>
  );
}