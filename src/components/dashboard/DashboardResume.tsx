import { useState, useEffect } from 'react';
import { Save, Download, User, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardResumeProps {
  studentId: string;
}

export default function DashboardResume({ studentId }: DashboardResumeProps) {
  const [resumeData, setResumeData] = useState({
    personal_info: { name: '', email: '', phone: '', address: '', summary: '' },
    skills: [] as string[],
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    loadResume();
  }, [studentId]);

  const loadResume = async () => {
    const { data } = await supabase
      .from('student_resume')
      .select('*')
      .eq('student_id', studentId)
      .maybeSingle();

    if (data) {
      setResumeData({
        personal_info: data.personal_info || resumeData.personal_info,
        skills: data.skills || [],
      });
    }
  };

  const handleSave = async () => {
    const { data: existing } = await supabase
      .from('student_resume')
      .select('id')
      .eq('student_id', studentId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('student_resume')
        .update({ ...resumeData, updated_at: new Date().toISOString() })
        .eq('student_id', studentId);
    } else {
      await supabase
        .from('student_resume')
        .insert([{ student_id: studentId, ...resumeData }]);
    }
    alert('Resume saved successfully!');
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Builder</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Save className="w-5 h-5" />
            <span>Save</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
        <div>
          <h3 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={resumeData.personal_info.name}
              onChange={(e) => setResumeData({
                ...resumeData,
                personal_info: { ...resumeData.personal_info, name: e.target.value }
              })}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
            <input
              type="email"
              value={resumeData.personal_info.email}
              onChange={(e) => setResumeData({
                ...resumeData,
                personal_info: { ...resumeData.personal_info, email: e.target.value }
              })}
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
            <input
              type="tel"
              value={resumeData.personal_info.phone}
              onChange={(e) => setResumeData({
                ...resumeData,
                personal_info: { ...resumeData.personal_info, phone: e.target.value }
              })}
              placeholder="Phone"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={resumeData.personal_info.address}
              onChange={(e) => setResumeData({
                ...resumeData,
                personal_info: { ...resumeData.personal_info, address: e.target.value }
              })}
              placeholder="Address"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
          </div>
          <textarea
            value={resumeData.personal_info.summary}
            onChange={(e) => setResumeData({
              ...resumeData,
              personal_info: { ...resumeData.personal_info, summary: e.target.value }
            })}
            placeholder="Professional Summary"
            rows={4}
            className="w-full mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white resize-none"
          />
        </div>

        <div>
          <h3 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-4">
            <Award className="w-5 h-5 mr-2 text-green-600" />
            Skills
          </h3>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              placeholder="Add a skill"
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
            <button
              onClick={addSkill}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
