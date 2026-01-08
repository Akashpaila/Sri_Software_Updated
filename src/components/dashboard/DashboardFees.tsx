import { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface FeeRecord {
  id: string;
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

export default function DashboardFees() {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    if (studentId) {
      loadFees();
    }
  }, [studentId]);

  const loadFees = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('student_fees')
      .select('*')
      .eq('student_id', studentId)
      .order('due_date', { ascending: false });

    if (data) setFees(data);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'overdue': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'partial': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = fees.reduce((sum, fee) => sum + fee.paid_amount, 0);
  const totalPending = totalAmount - totalPaid;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading fees...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Fees</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Fees</p>
              <p className="text-white text-2xl font-bold mt-1">₹{totalAmount.toFixed(2)}</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Total Paid</p>
              <p className="text-white text-2xl font-bold mt-1">₹{totalPaid.toFixed(2)}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Balance Due</p>
              <p className="text-white text-2xl font-bold mt-1">₹{totalPending.toFixed(2)}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-yellow-500/30 overflow-hidden">
        <div className="p-6 border-b border-yellow-500/30">
          <h3 className="text-lg font-bold text-white">Fee Records</h3>
        </div>

        <div className="divide-y divide-gray-800">
          {fees.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No fee records found
            </div>
          ) : (
            fees.map((fee) => (
              <div key={fee.id} className="p-6 hover:bg-yellow-500/5 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-semibold text-lg">{fee.fee_type}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(fee.payment_status)}`}>
                        {fee.payment_status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-gray-400 text-sm">Total Amount</p>
                        <p className="text-white font-semibold">₹{fee.amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Paid Amount</p>
                        <p className="text-white font-semibold">₹{fee.paid_amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Balance</p>
                        <p className="text-white font-semibold">₹{(fee.amount - fee.paid_amount).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Due Date</p>
                        <p className="text-white font-semibold">{new Date(fee.due_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {fee.payment_method && (
                      <div className="mt-3 flex items-center space-x-4">
                        <div>
                          <p className="text-gray-400 text-sm">Payment Method</p>
                          <p className="text-white text-sm">{fee.payment_method}</p>
                        </div>
                        {fee.transaction_id && (
                          <div>
                            <p className="text-gray-400 text-sm">Transaction ID</p>
                            <p className="text-white text-sm font-mono">{fee.transaction_id}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {fee.remarks && (
                      <div className="mt-3">
                        <p className="text-gray-400 text-sm">Remarks</p>
                        <p className="text-white text-sm">{fee.remarks}</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <p className="text-blue-400 text-sm font-medium">Payment Information</p>
            <p className="text-gray-400 text-sm mt-1">
              Contact the admin directly to make fee payments. Your fee records and payment status are displayed above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
