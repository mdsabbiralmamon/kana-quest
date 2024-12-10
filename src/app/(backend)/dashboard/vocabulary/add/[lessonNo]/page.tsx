'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Get lessonNo from the URL

// Define vocabulary type
interface Vocabulary {
  _id: string;
  word: string;
  pronunciation: string;
  whenToSay: string;
}

const AddVocabularyPage = () => {
  const { lessonNo } = useParams();
  const [word, setWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [whenToSay, setWhenToSay] = useState('');
  const [loading, setLoading] = useState(false);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]); // Use proper Vocabulary type
  const [lessonTitle, setLessonTitle] = useState<string | null>(null); // Correct type for lessonTitle

  // Fetch the existing vocabulary for the current lesson
  const fetchVocabulary = async () => {
    try {
      const res = await fetch(`/api/lessons/${lessonNo}/vocabulary`);
      const data = await res.json();
      if (res.ok) {
        setVocabularies(data.vocabulary);
      }
    } catch (error) {
      console.error('Failed to fetch vocabulary:', error);
    }
  };

  // Fetch lesson details
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

  // Fetch data on component mount
  useEffect(() => {
    if (lessonNo) {
      fetchLessonDetails();
      fetchVocabulary();
    }
  }, [lessonNo]);

  // Add vocabulary to the lesson
  const handleAddVocabulary = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lessons/${lessonNo}/vocabulary/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, pronunciation, whenToSay }),
      });

      if (res.ok) {
        fetchVocabulary(); // Re-fetch vocabulary after adding a new one
        setWord('');
        setPronunciation('');
        setWhenToSay('');
      }
    } catch (error) {
      console.error('Failed to add vocabulary:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete vocabulary from the lesson
  const handleDeleteVocabulary = async (vocabularyId: string) => {
    try {
      const res = await fetch(`/api/lessons/${lessonNo}/vocabulary/delete?vocabularyId=${vocabularyId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchVocabulary(); // Re-fetch vocabulary after deletion
      }
    } catch (error) {
      console.error('Failed to delete vocabulary:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Vocabulary to: {lessonTitle}</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="border px-4 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Pronunciation"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          className="border px-4 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="When to Say"
          value={whenToSay}
          onChange={(e) => setWhenToSay(e.target.value)}
          className="border px-4 py-2"
        />
        <button
          onClick={handleAddVocabulary}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 ml-2"
        >
          Add Vocabulary
        </button>
      </div>

      {/* Display the list of vocabulary words */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Vocabulary List</h2>
        <ul>
          {vocabularies.map((vocab) => (
            <li key={vocab._id} className="flex justify-between items-center p-4 bg-gray-100 mb-2 rounded shadow">
              <div>
                <h3 className="font-bold">{vocab.word}</h3>
                <p>{vocab.pronunciation}</p>
                <p>{vocab.whenToSay}</p>
              </div>
              <button
                onClick={() => handleDeleteVocabulary(vocab._id)}
                className="bg-red-500 text-white px-4 py-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddVocabularyPage;
