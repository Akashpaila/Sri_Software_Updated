import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardAttendanceProps {
  studentId: string;
}

export default function DashboardAttendance({ studentId }: DashboardAttendanceProps) {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0, percentage: 0 });

  useEffect(() => {
    loadAttendance();
  }, [studentId]);

  const loadAttendance = async () => {
    const { data } = await supabase
      .from('student_attendance')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false });

    if (data) {
      setAttendance(data);
      const present = data.filter(a => a.status === 'present').length;
      const total = data.length;
      setStats({
        total,
        present,
        absent: total - present,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Record</h2>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <Calendar className="w-10 h-10 text-blue-600 mb-3" />
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <CheckCircle className="w-10 h-10 text-green-600 mb-3" />
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.present}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <XCircle className="w-10 h-10 text-red-600 mb-3" />
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.absent}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
          <Calendar className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-3xl font-bold">{stats.percentage}%</p>
          <p className="text-sm opacity-90">Attendance Rate</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      record.status === 'present' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      record.status === 'late' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {record.status === 'present' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                       record.status === 'late' ? <Clock className="w-3 h-3 mr-1" /> :
                       <XCircle className="w-3 h-3 mr-1" />}
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {record.remarks || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
