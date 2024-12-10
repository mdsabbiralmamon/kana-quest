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
        setError(data.message || 'Failed to fetch lessons.');
      }
    } catch (err) {
      setError('An error occurred while fetching lessons.');
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
          <h1 className="text-5xl font-bold text-center mb-12 text-indigo-700">
            Explore Lessons
          </h1>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <p className="text-center text-red-500 text-lg">{error}</p>
          )}

          {/* Lessons Display */}
          {!loading && !error && lessons.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleNavigate(lesson._id)}
                >
                  <h2 className="text-2xl font-bold text-indigo-700">
                    {lesson.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{lesson.description}</p>
                  <button className="mt-4 inline-block bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
                    Start Lesson
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && lessons.length === 0 && (
            <div className="flex flex-col items-center text-center py-12">
              <img
                src="/images/empty-illustration.svg"
                alt="No lessons"
                className="w-64 h-64 mb-6"
              />
              <p className="text-gray-600 text-lg">
                No lessons available. Please check back later!
              </p>
            </div>
          )}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default LessonsPage;
