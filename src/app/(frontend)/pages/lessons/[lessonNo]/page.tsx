'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Confetti from 'react-confetti';

const LessonDetailsPage = () => {
  const { lessonNo } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [vocabulary, setVocabulary] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lessonTitle, setLessonTitle] = useState<any>(null);

  const fetchVocabulary = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lessons/${lessonNo}/vocabulary`);
      const data = await res.json();

      if (res.ok && data.vocabulary) {
        setVocabulary(data.vocabulary);
      } else {
        setError('Failed to fetch vocabulary.');
      }
    } catch (error) {
      setError('An error occurred while fetching vocabulary.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lessonNo) {
      fetchVocabulary();
    }
  }, [lessonNo]);

  // Fetch lesson details
  const fetchLessonDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lessons/${lessonNo}`);
      const data = await res.json();

      if (res.ok) {
        // console.log('Lesson title:', data.lesson.title);
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

  // Fetch data on component mount
  useEffect(() => {
    if (lessonNo) {
      fetchLessonDetails();
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6 flex flex-col items-center justify-center">
      {!showCongrats ? (
        <>
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Lesson {lessonTitle}</h1>
          <div className="p-6 bg-white shadow-md rounded-lg text-center w-full max-w-md">
            {vocabulary.length > 0 ? (
              <>
                <h2
                  className="text-3xl font-bold text-gray-800 cursor-pointer hover:underline"
                  onClick={() => handlePlayPronunciation(vocabulary[currentIndex].word)}
                >
                  {vocabulary[currentIndex].word}
                </h2>
                <p className="text-gray-600 mt-4">
                  <strong>Pronunciation:</strong> {vocabulary[currentIndex].pronunciation}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>When to Say:</strong> {vocabulary[currentIndex].whenToSay}
                </p>
              </>
            ) : (
              <p className="text-gray-600">No vocabulary available or still loading...</p>
            )}
          </div>

          <div className="flex justify-between mt-8 w-full max-w-md">
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded shadow hover:bg-gray-600 disabled:bg-gray-300"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            {currentIndex < vocabulary.length - 1 ? (
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600"
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
          <h1 className="text-4xl font-bold text-center text-green-600 mb-6">
            Congratulations!
          </h1>
          <p className="text-lg text-center text-gray-700 mb-6">
            You have successfully completed <strong>Lesson {lessonNo}</strong>!
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
            onClick={() => (window.location.href = '/pages/lessons')}
          >
            Back to Lessons
          </button>
        </>
      )}
    </div>
  );
};

export default LessonDetailsPage;
