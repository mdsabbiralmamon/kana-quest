'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/global/Navbar/page';
import Footer from '@/components/global/Footer/Footer';
import { Lesson } from '@/lib/types/lesson';

const LessonsPage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lessons');
      const data = await res.json();

      if (res.ok && data.serverStatus === 'Success') {
        setLessons(data.lessons);
      } else {
        setError('Failed to fetch lessons.');
      }
    } catch (err) {
      setError(`An error occurred while fetching lessons: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleNavigate = (lessonId: string) => {
    router.push(`/pages/lessons/${lessonId}`);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Explore Lessons</h1>
          {loading && <p>Loading lessons...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg cursor-pointer transition transform hover:scale-105"
                onClick={() => handleNavigate(lesson._id)}
              >
                <h2 className="text-2xl font-semibold text-gray-800">{lesson.title}</h2>
                <p className="text-gray-600 mt-2">{lesson.description}</p>
                <button className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Start Lesson
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default LessonsPage;
