import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ComplaintModal from './ComplaintModal'; 
import AmuLogo from '../assets/AmuLogo.png'; 
import { clearAdminToken, getAdminToken, getAuthHeaders } from './authSession';

function normalizeComplaint(complaint) {
  return {
    ...complaint,
    id: complaint.complaintNumber || complaint._id,
    date: complaint.createdAt ? new Date(complaint.createdAt).toISOString().slice(0, 10) : '',
    status: complaint.status || 'Pending',
    adminRemarks: complaint.adminRemarks || '',
    title: complaint.title || complaint.description || 'Untitled complaint',
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadComplaints() {
      try {
        const token = getAdminToken()
        if (!token) {
          navigate('/admin')
          return
        }

        setLoading(true)
        setError('')

        const response = await fetch('/api/admin/complaints', {
          headers: {
            ...getAuthHeaders(),
          },
        })

        if (response.status === 401) {
          clearAdminToken()
          navigate('/admin')
          return
        }

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => ({}))
          throw new Error(errorPayload.error || 'Failed to load complaints')
        }

        const data = await response.json()
        const normalized = (data.complaints || []).map(normalizeComplaint)
        setComplaints(normalized)
      } catch (loadError) {
        console.error(loadError)
        setError('Could not load complaints from the backend.')
      } finally {
        setLoading(false)
      }
    }

    loadComplaints()
  }, [navigate])

  // Filter complaints
  const filteredComplaints = activeTab === 'All' 
    ? complaints 
    : complaints.filter(c => c.status === activeTab);

  // Handle status & remarks update from Modal
  const handleUpdateStatus = async (id, newStatus, remarks) => {
    try {
      const recordId = id || ''
      const response = await fetch(`/api/admin/complaints/${encodeURIComponent(recordId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ status: newStatus, adminRemarks: remarks }),
      })

      if (response.status === 401) {
        clearAdminToken()
        navigate('/admin')
        return
      }

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}))
        throw new Error(errorPayload.error || 'Status update failed')
      }

      const data = await response.json()
      const updatedComplaint = normalizeComplaint(data.complaint)

      setComplaints((currentComplaints) => currentComplaints.map((complaint) =>
        (complaint.id === id || complaint._id === id) ? updatedComplaint : complaint,
      ))
      setSelectedComplaint((currentComplaint) =>
        currentComplaint && (getComplaintRecordId(currentComplaint) === id)
          ? updatedComplaint
          : currentComplaint,
      )
    } catch (updateError) {
      console.error(updateError)
      setError(updateError.message || 'Could not update the complaint status.')
    }
  };

  const getComplaintRecordId = (complaint) => complaint?._id || complaint?.id || complaint?.complaintNumber || ''

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
            onClick={() => {
              clearAdminToken()
              navigate('/admin')
            }}
            className="bg-[#D4AF37] hover:bg-[#c49f2c] text-[#292929] px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Analytics Cards */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

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
            {loading ? (
              <div className="p-8 text-center text-sm text-gray-500">Loading complaints...</div>
            ) : filteredComplaints.length === 0 ? (
              <div className="p-10 text-center text-sm text-gray-500">No complaints found.</div>
            ) : (
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
                      key={complaint.id || complaint._id} 
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
            )}
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