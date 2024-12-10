import Footer from '@/components/global/Footer/Footer';
import Navbar from '@/components/global/Navbar/page';
import React from 'react';

const Home = () => {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <main>
      <h1>Home</h1>
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  );
};

export default Home;