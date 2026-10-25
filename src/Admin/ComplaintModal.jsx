import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComplaintModal({ complaint, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState(complaint.status);
  const [remarks, setRemarks] = useState(complaint.adminRemarks || '');

  if (!complaint) return null;

  const handleSave = () => {
    onUpdateStatus(complaint.id, status, remarks);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#F5F5F0] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
        >
          
          {/* Header */}
          <div className="bg-[#004D2D] px-6 py-5 flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                {complaint.id}
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${
                  complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                  complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                  'bg-green-100 text-green-800 border-green-200'
                }`}>
                  {complaint.status}
                </span>
              </h3>
              <p className="text-white/70 text-sm mt-1">Submitted on: {complaint.date}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
 
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* SECTION 1: Student Information */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="text-sm font-bold text-[#004D2D] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Student Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                <div><span className="block text-gray-500 text-xs mb-1">Full Name</span><span className="font-medium text-gray-900">{complaint.name}</span></div>
                <div><span className="block text-gray-500 text-xs mb-1">Student ID</span><span className="font-medium text-gray-900">{complaint.studentId}</span></div>
                <div><span className="block text-gray-500 text-xs mb-1">Roll Number</span><span className="font-medium text-gray-900">{complaint.rollNumber || 'N/A'}</span></div>
                <div><span className="block text-gray-500 text-xs mb-1">Email</span><span className="font-medium text-gray-900">{complaint.email}</span></div>
                <div><span className="block text-gray-500 text-xs mb-1">Mobile</span><span className="font-medium text-gray-900">{complaint.mobile}</span></div>
                <div><span className="block text-gray-500 text-xs mb-1">Department</span><span className="font-medium text-gray-900">{complaint.department}</span></div>
                <div><span className="block text-gray-500 text-xs mb-1">Course & Year</span><span className="font-medium text-gray-900">{complaint.course || 'N/A'}</span></div>
                <div><span className="block text-gray-500 text-xs mb-1">Hostel / Residence</span><span className="font-medium text-gray-900">{complaint.residence || 'N/A'}</span></div>
              </div>
            </div>

            {/* SECTION 2: Complaint Details */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="text-sm font-bold text-[#004D2D] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Complaint Details
              </h4>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-gray-500 text-xs mb-1">Title</span>
                  <span className="font-bold text-gray-900 text-base">{complaint.title}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="block text-gray-500 text-xs mb-1">Category</span>
                    <span className="inline-block bg-[#E6F2EC] text-[#006B3F] px-2.5 py-1 rounded-md text-xs font-semibold">{complaint.category}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs mb-1">Location</span>
                    <span className="font-medium text-gray-900">{complaint.location}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs mb-1">Incident Date</span>
                    <span className="font-medium text-gray-900">{complaint.incidentDate || 'N/A'}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-gray-500 text-xs mb-1">Description</span>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-700 leading-relaxed">
                    {complaint.description}
                  </div>
                </div>

                <div>
                  <span className="block text-gray-500 text-xs mb-1">Expected Resolution</span>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-700 leading-relaxed">
                    {complaint.resolution || 'No specific resolution requested.'}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Attachments */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h4 className="text-sm font-bold text-[#004D2D] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                Supporting Evidence
              </h4>
              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm w-full sm:w-auto">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">evidence_photo.jpg</p>
                    <p className="text-xs text-gray-500">2.4 MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: Admin Action */}
            <div className="bg-[#FBF7E8] border border-[#E4D79F] rounded-xl p-5">
              <h4 className="text-sm font-bold text-[#9C7912] mb-4 flex items-center gap-2 border-b border-[#E4D79F]/50 pb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Admin Action
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-[#9C7912] mb-1.5">Update Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D4C696] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#9C7912] mb-1.5">Official Remarks</label>
                  <textarea 
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Add notes about the action taken..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D4C696] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 min-h-[80px]"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#006B3F] hover:bg-[#004D2D] rounded-xl shadow-md transition-colors"
            >
              Save Changes
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}