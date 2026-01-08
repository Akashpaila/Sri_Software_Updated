import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Save, Calendar, Edit2, Trash2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Student {
  student_id: string;
  full_name: string;
}

interface AttendanceRecord {
  id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks: string;
  student_registrations?: {
    full_name: string;
  };
}

export default function AttendanceManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ status: string; remarks: string }>({ status: '', remarks: '' });
  const [showMarkForm, setShowMarkForm] = useState(false);
  const [newAttendance, setNewAttendance] = useState<{ [key: string]: { status: string; remarks: string } }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [selectedDate]);

  const loadStudents = async () => {
    const { data } = await supabase
      .from('student_registrations')
      .select('student_id, full_name')
      .eq('is_trainee', true)
      .order('full_name');
    if (data) {
      setStudents(data);
    }
  };

  const loadAttendance = async () => {
    const { data } = await supabase
      .from('student_attendance')
      .select(`
        id,
        student_id,
        date,
        status,
        remarks,
        student_registrations (full_name)
      `)
      .eq('date', selectedDate);

    if (data) {
      setAttendanceRecords(data as AttendanceRecord[]);
    } else {
      setAttendanceRecords([]);
    }
  };

  const startEdit = (record: AttendanceRecord) => {
    setEditingId(record.id);
    setEditForm({
      status: record.status,
      remarks: record.remarks || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ status: '', remarks: '' });
  };

  const saveEdit = async (id: string) => {
    setErrorMessage('');
    setSuccessMessage('');

    const { error } = await supabase
      .from('student_attendance')
      .update({
        status: editForm.status,
        remarks: editForm.remarks
      })
      .eq('id', id);

    if (!error) {
      setSuccessMessage('Attendance updated successfully!');
      setEditingId(null);
      await loadAttendance();
      setTimeout(() => setSuccessMessage(''), 2000);
    } else {
      setErrorMessage('Error updating attendance: ' + error.message);
    }
  };

  const deleteRecord = async (id: string) => {
    if (!confirm('Are you sure you want to delete this attendance record?')) return;

    const { error } = await supabase
      .from('student_attendance')
      .delete()
      .eq('id', id);

    if (!error) {
      setSuccessMessage('Attendance record deleted!');
      await loadAttendance();
      setTimeout(() => setSuccessMessage(''), 2000);
    } else {
      setErrorMessage('Error deleting record: ' + error.message);
    }
  };

  const markAllPresent = async () => {
    if (!confirm(`Mark all students as present for ${selectedDate}?`)) return;

    const records = students.map(student => ({
      student_id: student.student_id,
      date: selectedDate,
      status: 'present',
      remarks: ''
    }));

    const { error } = await supabase
      .from('student_attendance')
      .insert(records);

    if (!error) {
      setSuccessMessage('All students marked present!');
      await loadAttendance();
      setTimeout(() => setSuccessMessage(''), 2000);
    } else {
      setErrorMessage('Error: ' + error.message);
    }
  };

  const handleNewAttendanceChange = (studentId: string, field: 'status' | 'remarks', value: string) => {
    setNewAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const saveNewAttendance = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    const recordsToInsert = Object.entries(newAttendance)
      .filter(([_, data]) => data.status)
      .map(([studentId, data]) => ({
        student_id: studentId,
        date: selectedDate,
        status: data.status,
        remarks: data.remarks || ''
      }));

    if (recordsToInsert.length === 0) {
      setErrorMessage('Please mark attendance for at least one student');
      return;
    }

    const { error } = await supabase
      .from('student_attendance')
      .insert(recordsToInsert);

    if (!error) {
      setSuccessMessage(`Attendance marked for ${recordsToInsert.length} student(s)!`);
      setNewAttendance({});
      setShowMarkForm(false);
      await loadAttendance();
      setTimeout(() => setSuccessMessage(''), 2000);
    } else {
      setErrorMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Attendance Management</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowMarkForm(!showMarkForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg font-semibold shadow-lg shadow-yellow-500/30"
          >
            <Calendar className="w-5 h-5" />
            <span>Mark New Attendance</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <label className="text-gray-400 text-sm font-medium">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
        </div>
        <button
          onClick={markAllPresent}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Mark All Present</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-green-400 text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {showMarkForm && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-yellow-500/30">
          <div className="p-6 border-b border-yellow-500/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-yellow-400" />
                Mark Attendance for {selectedDate}
              </h3>
              <button onClick={() => setShowMarkForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[500px] overflow-y-auto">
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.student_id} className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{student.full_name}</p>
                    <p className="text-gray-400 text-sm">{student.student_id}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleNewAttendanceChange(student.student_id, 'status', 'present')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        newAttendance[student.student_id]?.status === 'present'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-green-600/20'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleNewAttendanceChange(student.student_id, 'status', 'absent')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        newAttendance[student.student_id]?.status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-red-600/20'
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleNewAttendanceChange(student.student_id, 'status', 'late')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        newAttendance[student.student_id]?.status === 'late'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-yellow-600/20'
                      }`}
                    >
                      Late
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Remarks (optional)"
                    value={newAttendance[student.student_id]?.remarks || ''}
                    onChange={(e) => handleNewAttendanceChange(student.student_id, 'remarks', e.target.value)}
                    className="w-48 px-3 py-1.5 bg-gray-900 border border-yellow-500/30 rounded-lg text-white text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-yellow-500/30 bg-gray-950/50 flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              Selected: <span className="text-yellow-400 font-bold">
                {Object.values(newAttendance).filter(a => a.status).length}
              </span> / {students.length} students
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowMarkForm(false)}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={saveNewAttendance}
                className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg font-bold flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Attendance</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-yellow-500/30">
        <div className="p-6 border-b border-yellow-500/30">
          <h3 className="text-xl font-bold text-white">
            Attendance Records for {selectedDate}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {attendanceRecords.length} record(s) found
          </p>
        </div>

        <div className="p-6">
          {attendanceRecords.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No attendance records for this date</p>
              <p className="text-gray-500 text-sm mt-2">Click "Mark New Attendance" to add records</p>
            </div>
          ) : (
            <div className="space-y-3">
              {attendanceRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {record.student_registrations?.full_name || 'Unknown Student'}
                    </p>
                    <p className="text-gray-400 text-sm">{record.student_id}</p>
                  </div>

                  {editingId === record.id ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setEditForm({ ...editForm, status: 'present' })}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            editForm.status === 'present'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => setEditForm({ ...editForm, status: 'absent' })}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            editForm.status === 'absent'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => setEditForm({ ...editForm, status: 'late' })}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            editForm.status === 'late'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Remarks"
                        value={editForm.remarks}
                        onChange={(e) => setEditForm({ ...editForm, remarks: e.target.value })}
                        className="w-48 px-3 py-1.5 bg-gray-900 border border-yellow-500/30 rounded-lg text-white text-sm"
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => saveEdit(record.id)}
                          className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                          title="Save"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                          record.status === 'present'
                            ? 'bg-green-600 text-white'
                            : record.status === 'absent'
                            ? 'bg-red-600 text-white'
                            : 'bg-yellow-600 text-white'
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                      <div className="w-48">
                        <p className="text-gray-400 text-sm">{record.remarks || 'No remarks'}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => startEdit(record)}
                          className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
