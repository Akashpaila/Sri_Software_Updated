import { useState, useEffect } from 'react';
import { DollarSign, Plus, Search, Filter, X, Edit } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface FeeRecord {
  id: string;
  student_id: string;
  fee_type: string;
  amount: number;
  due_date: string;
  paid_date: string | null;
  payment_status: string;
  paid_amount: number;
  payment_method: string | null;
  transaction_id: string | null;
  remarks: string | null;
}

export default function FeesManagement() {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    student_id: '',
    fee_type: '',
    amount: '',
    due_date: new Date().toISOString().split('T')[0],
    payment_status: 'pending',
    paid_amount: '0',
    payment_method: '',
    transaction_id: '',
    remarks: ''
  });

  useEffect(() => {
    loadFees();
    loadStudents();
  }, []);

  const loadFees = async () => {
    const { data } = await supabase
      .from('student_fees')
      .select(`
        *,
        student_registrations(full_name, email)
      `)
      .order('due_date', { ascending: false });
    if (data) setFees(data);
  };

  const loadStudents = async () => {
    const { data } = await supabase
      .from('student_registrations')
      .select('student_id, full_name')
      .eq('is_trainee', true)
      .order('full_name');
    if (data) setStudents(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const feeData = {
      student_id: formData.student_id,
      fee_type: formData.fee_type,
      amount: parseFloat(formData.amount),
      due_date: formData.due_date,
      payment_status: formData.payment_status,
      paid_amount: parseFloat(formData.paid_amount),
      payment_method: formData.payment_method || null,
      transaction_id: formData.transaction_id || null,
      remarks: formData.remarks || null,
      paid_date: formData.payment_status === 'paid' ? new Date().toISOString().split('T')[0] : null
    };

    if (editingFee) {
      const { error } = await supabase
        .from('student_fees')
        .update(feeData)
        .eq('id', editingFee.id);

      if (!error) {
        alert('Fee updated successfully!');
        resetForm();
        loadFees();
      } else {
        alert('Error updating fee: ' + error.message);
      }
    } else {
      const { error } = await supabase
        .from('student_fees')
        .insert([feeData]);

      if (!error) {
        alert('Fee added successfully!');
        resetForm();
        loadFees();
      } else {
        alert('Error adding fee: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      student_id: '',
      fee_type: '',
      amount: '',
      due_date: new Date().toISOString().split('T')[0],
      payment_status: 'pending',
      paid_amount: '0',
      payment_method: '',
      transaction_id: '',
      remarks: ''
    });
    setEditingFee(null);
    setShowForm(false);
  };

  const editFee = (fee: any) => {
    setEditingFee(fee);
    setFormData({
      student_id: fee.student_id,
      fee_type: fee.fee_type,
      amount: fee.amount.toString(),
      due_date: fee.due_date,
      payment_status: fee.payment_status,
      paid_amount: fee.paid_amount.toString(),
      payment_method: fee.payment_method || '',
      transaction_id: fee.transaction_id || '',
      remarks: fee.remarks || ''
    });
    setShowForm(true);
  };

  const deleteFee = async (id: string) => {
    if (!confirm('Are you sure you want to delete this fee record?')) return;

    const { error } = await supabase
      .from('student_fees')
      .delete()
      .eq('id', id);

    if (!error) {
      alert('Fee deleted successfully!');
      loadFees();
    } else {
      alert('Error deleting fee: ' + error.message);
    }
  };

  const filteredFees = fees.filter(fee => {
    const matchesSearch = fee.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (fee as any).student_registrations?.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fee.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'overdue': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'partial': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Fees Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg font-semibold shadow-lg shadow-yellow-500/30"
        >
          <Plus className="w-5 h-5" />
          <span>{editingFee ? 'Cancel Edit' : 'Add Fee'}</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 flex-wrap gap-2">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="partial">Partial</option>
          </select>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30 space-y-4">
          <h3 className="text-lg font-bold text-white">{editingFee ? 'Edit Fee Record' : 'Add New Fee'}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Student</label>
              <select
                value={formData.student_id}
                onChange={(e) => setFormData({...formData, student_id: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.full_name} ({student.student_id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fee Type</label>
              <select
                value={formData.fee_type}
                onChange={(e) => setFormData({...formData, fee_type: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              >
                <option value="">Select Type</option>
                <option value="Course Fee">Course Fee</option>
                <option value="Registration Fee">Registration Fee</option>
                <option value="Exam Fee">Exam Fee</option>
                <option value="Material Fee">Material Fee</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Total Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
                placeholder="0.00"
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Payment Status</label>
              <select
                value={formData.payment_status}
                onChange={(e) => setFormData({...formData, payment_status: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="partial">Partial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Paid Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.paid_amount}
                onChange={(e) => setFormData({...formData, paid_amount: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method (Optional)</label>
              <input
                type="text"
                value={formData.payment_method}
                onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                placeholder="UPI, Cash, Card, etc."
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Transaction ID (Optional)</label>
              <input
                type="text"
                value={formData.transaction_id}
                onChange={(e) => setFormData({...formData, transaction_id: e.target.value})}
                placeholder="Transaction reference"
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Remarks (Optional)</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              placeholder="Additional notes..."
              rows={2}
              className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg font-semibold shadow-lg shadow-yellow-500/30"
            >
              {editingFee ? 'Update Fee' : 'Add Fee'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-yellow-500/30 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-yellow-500/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-950/50 border-b border-yellow-500/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-yellow-400">Student</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-yellow-400">Fee Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-yellow-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-yellow-400">Paid</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-yellow-400">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-yellow-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-yellow-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredFees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    No fee records found
                  </td>
                </tr>
              ) : (
                filteredFees.map((fee: any) => (
                  <tr key={fee.id} className="hover:bg-yellow-500/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{fee.student_registrations?.full_name}</p>
                        <p className="text-gray-400 text-sm">{fee.student_id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{fee.fee_type}</td>
                    <td className="px-6 py-4 text-white font-semibold">₹{fee.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-white">₹{fee.paid_amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-white">{new Date(fee.due_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(fee.payment_status)}`}>
                        {fee.payment_status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => editFee(fee)}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFee(fee.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
        <div className="flex items-start space-x-2">
          <DollarSign className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <p className="text-yellow-400 text-sm font-medium">Fees Management</p>
            <p className="text-gray-400 text-sm mt-1">
              Add, edit, and track student fee payments. Students can view their fee records through their dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
