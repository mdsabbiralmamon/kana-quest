'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // For navigation to the vocabulary page

const LessonManagement = () => {
  const [lessons, setLessons] = useState<any[]>([]); // Use a proper type later
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchLessons = async () => {
    try {
      const res = await fetch('/api/lessons');
      const data = await res.json();
      if (res.ok) {
        setLessons(data.lessons);
      }
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    }
  };

  const handleAddLesson = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lessons/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        fetchLessons();
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error('Failed to add lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/lessons/delete?lessonId=${lessonId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchLessons();
      }
    } catch (error) {
      console.error('Failed to delete lesson:', error);
    }
  };

  const handleAddVocabulary = (lessonId: string) => {
    // Navigate to the Add Vocabulary page for the specific lesson
    router.push(`/dashboard/vocabulary/add/${lessonId}`);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lesson Management</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-4 py-2"
        />
        <button
          onClick={handleAddLesson}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 ml-2"
        >
          Add Lesson
        </button>
      </div>
      <ul>
        {lessons.map((lesson: any) => (
          <li key={lesson._id} className="flex justify-between p-4 bg-gray-100 mb-2 rounded shadow">
            <div>
              <h2 className="font-bold">{lesson.title}</h2>
              <p>{lesson.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleAddVocabulary(lesson._id)}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Add Vocabulary
              </button>
              <button
                onClick={() => handleDeleteLesson(lesson._id)}
                className="bg-red-500 text-white px-4 py-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonManagement;
