import Footer from '@/components/global/Footer/Footer';
import Navbar from '@/components/global/Navbar/page';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-gradient-to-b from-blue-100 via-white to-blue-100 min-h-screen flex flex-col justify-center items-center py-10">
        <div className="text-center max-w-2xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to Kana-Quest!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Learn Japanese in a fun, interactive way! Whether you are just starting or looking to enhance your skills, Kana-Quest is here to guide you every step of the way.
          </p>
          <p className="text-xl text-gray-700 mb-8">
            Explore lessons, master vocabulary, and immerse yourself in the world of Japanese language and culture.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/pages/lessons" className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Start Learning
            </Link>
            <button className="bg-transparent border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
