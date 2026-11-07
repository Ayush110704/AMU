import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import ComplaintModal from './ComplaintModal'

beforeEach(() => {
  global.fetch = vi.fn()
  window.localStorage.setItem('amu_admin_token', 'test-token')
})

afterEach(() => {
  vi.clearAllMocks()
  window.localStorage.removeItem('amu_admin_token')
})

test('renders complaints from the backend and handles empty state', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ complaints: [] }),
  })

  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>,
  )

  await waitFor(() => {
    expect(screen.getByText(/loading complaints/i)).toBeInTheDocument()
  })

  await waitFor(() => {
    expect(screen.getByText(/no complaints found/i)).toBeInTheDocument()
  })
})

test('shows complaint details and attachment links in the modal', () => {
  const complaint = {
    id: 'CMP-1001',
    _id: 'abc123',
    complaintNumber: 'CMP-1001',
    name: 'Aisha Noor',
    studentId: 'AMU2026001',
    rollNumber: '22BSC001',
    email: 'aisha@amu.ac.in',
    mobile: '+91 98765 43210',
    department: 'Computer Science',
    course: 'BSc, Year 2',
    residence: 'SRK Hostel',
    title: 'Water cooler issue',
    category: 'Hostel and Campus Facilities',
    location: 'SRK Hostel, Block B',
    incidentDate: '2024-05-18',
    description: 'The cooler stopped working.',
    resolution: 'Repair it soon.',
    status: 'Pending',
    adminRemarks: '',
    date: '2024-05-18',
    attachments: [
      {
        url: 'https://example.com/evidence.jpg',
        originalName: 'evidence.jpg',
      },
    ],
  }

  render(
    <ComplaintModal
      complaint={complaint}
      onClose={() => {}}
      onUpdateStatus={() => {}}
    />,
  )

  expect(screen.getByText(/water cooler issue/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /evidence.jpg/i })).toHaveAttribute('href', 'https://example.com/evidence.jpg')
})

test('uses database id instead of complaint number when saving status updates', async () => {
  const onUpdateStatus = vi.fn()
  const complaint = {
    id: 'CMP-1002',
    _id: 'def456',
    complaintNumber: 'CMP-1002',
    name: 'Rahul',
    status: 'Pending',
    adminRemarks: '',
    date: '2024-05-18',
    title: 'Broken desk',
    category: 'Infrastructure and Maintenance',
    location: 'Library',
    description: 'Desk is broken.',
    resolution: 'Replace desk',
    attachments: [],
  }

  render(
    <ComplaintModal
      complaint={complaint}
      onClose={() => {}}
      onUpdateStatus={onUpdateStatus}
    />,
  )

  fireEvent.change(screen.getByLabelText(/update status/i), {
    target: { value: 'Resolved' },
  })

  fireEvent.change(screen.getByLabelText(/official remarks/i), {
    target: { value: 'Desk replaced.' },
  })

  fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

  expect(onUpdateStatus).toHaveBeenCalledWith('def456', 'Resolved', 'Desk replaced.')
})
