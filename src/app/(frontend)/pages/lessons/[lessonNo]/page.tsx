'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Confetti from 'react-confetti';

// Define Vocabulary type
interface Vocabulary {
  _id: string;
  word: string;
  pronunciation: string;
  whenToSay: string;
}

const LessonDetailsPage = () => {
  const { lessonNo } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]); // Use Vocabulary type
  const [loading, setLoading] = useState(false);
  const [lessonTitle, setLessonTitle] = useState<string | null>(null);

  // Fetch Vocabulary
  const fetchVocabulary = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lessons/${lessonNo}/vocabulary`);
      const data = await res.json();

      if (res.ok && data.vocabulary) {
        setVocabulary(data.vocabulary);
      }
    } catch (error) {
      console.error('An error occurred while fetching vocabulary:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Lesson details
  const fetchLessonDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lessons/${lessonNo}`);
      const data = await res.json();

      if (res.ok) {
        setLessonTitle(data.lesson.title);
      } else {
        console.error('Failed to fetch lesson details.');
      }
    } catch (err) {
      console.error('An error occurred while fetching lesson details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lessonNo) {
      fetchLessonDetails();
      fetchVocabulary();
    }
  }, [lessonNo]);

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    setShowCongrats(true);
    setTimeout(() => {
      window.location.href = '/pages/lessons'; // Redirect to Lessons Page
    }, 5000);
  };

  const handlePlayPronunciation = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // Set language to Japanese
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white p-8 flex flex-col items-center justify-center">
      {loading ? (
        <p className="text-center text-gray-600">Loading lesson...</p>
      ) : (
        <>
          {!showCongrats ? (
            <>
              <h1 className="text-5xl font-extrabold text-indigo-600 mb-8">{lessonTitle || 'Lesson'}</h1>
              <div className="p-8 bg-white shadow-lg rounded-lg text-center w-full max-w-lg">
                {vocabulary.length > 0 ? (
                  <>
                    <h2
                      className="text-3xl font-semibold text-gray-800 cursor-pointer hover:underline"
                      onClick={() => handlePlayPronunciation(vocabulary[currentIndex].word)}
                    >
                      {vocabulary[currentIndex].word}
                    </h2>
                    <p className="text-lg text-gray-600 mt-4">
                      <strong>Pronunciation:</strong> {vocabulary[currentIndex].pronunciation}
                    </p>
                    <p className="text-lg text-gray-600 mt-2">
                      <strong>When to Say:</strong> {vocabulary[currentIndex].whenToSay}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-600">No vocabulary available or still loading...</p>
                )}
              </div>

              <div className="flex justify-between mt-8 w-full max-w-lg">
                <button
                  className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 transition-all"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>
                {currentIndex < vocabulary.length - 1 ? (
                  <button
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
                    onClick={handleComplete}
                  >
                    Complete
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <Confetti />
              <h1 className="text-4xl font-extrabold text-green-600 mb-4">Congratulations!</h1>
              <p className="text-lg text-gray-700 mb-6">
                You have successfully completed <strong>{lessonTitle || 'this lesson'}</strong>!
              </p>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                onClick={() => (window.location.href = '/pages/lessons')}
              >
                Back to Lessons
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LessonDetailsPage;
