import { useState, useEffect } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardNotesProps {
  studentId: string;
}

export default function DashboardNotes({ studentId }: DashboardNotesProps) {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    loadNotes();
  }, [studentId]);

  const loadNotes = async () => {
    const { data } = await supabase
      .from('student_notes')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false });
    if (data) setNotes(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Daily Notes</h2>
        <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-lg text-sm font-medium">
          {notes.length} Note{notes.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
        <p className="text-cyan-400 text-sm">
          Your trainer will share important daily notes and learning materials here. These notes are provided by your trainer to help guide your learning journey.
        </p>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-white">{note.title}</h3>
              <div className="flex items-center text-sm text-gray-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                <Calendar className="w-4 h-4 mr-1 text-cyan-400" />
                {new Date(note.date).toLocaleDateString()}
              </div>
            </div>
            <p className="text-gray-300 mb-4 whitespace-pre-wrap leading-relaxed">{note.content}</p>
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-cyan-500/20">
          <Plus className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No notes shared yet</p>
          <p className="text-sm text-gray-500 mt-2">Your trainer will share important notes and learning materials here</p>
        </div>
      )}
    </div>
  );
}
