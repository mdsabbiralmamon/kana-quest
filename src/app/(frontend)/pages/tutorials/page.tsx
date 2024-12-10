'use client';

import Footer from '@/components/global/Footer/Footer';
import Navbar from '@/components/global/Navbar/page';
import React from 'react';

const TutorialPage = () => {
    const tutorials = [
        {
            id: 1,
            title: 'Introduction - Japanese Lesson 1',
            url: 'https://www.youtube.com/embed/rGrBHiuPlT0?si=0o_zX5D5h6Bes9Wy',
        },
        {
            id: 2,
            title: 'How to count in Japanese - Japanese Lesson 2',
            url: 'https://www.youtube.com/embed/bOUqVC4XkOY?si=j3_ShjD1ZXFhgmBt',
        },
        {
            id: 3,
            title: 'Days of the Week and Days of the Month - Japanese Lesson 3',
            url: 'https://www.youtube.com/embed/JnoZE51WZg4?si=2RbVzokQI8H4r5E9',
        },
        {
            id: 4,
            title: 'Going to a Destination - Japanese Lesson 4',
            url: 'https://www.youtube.com/embed/k74yjmfFb_A?si=9utSgJquUbE7USVo',
        },
        {
            id: 5,
            title: '4 Verbs (Nomimasu, Tabemasu, Mimasu, Kikimasu) - Japanese Lesson 5',
            url: 'https://www.youtube.com/embed/KUIWRsVZZZA?si=SnUF_iMTMXa3oV5u',
        },
        {
            id: 6,
            title: 'To do (verb) - Japanese Lesson 6',
            url: 'https://www.youtube.com/embed/ZGGufccTLso?si=tZQkcoBgqAA_MDir',
        },
        {
            id: 7,
            title: 'To give & To Receive - Japanese Lesson 7',
            url: 'https://www.youtube.com/embed/W0n-ODPwtzA?si=ZirsFt0ZapQFydOG',
        },
        {
            id: 8,
            title: 'Family Members - Japanese Lesson 8',
            url: 'https://www.youtube.com/embed/p9PEIsOzJ5E?si=Y6sVm9wEkNfGaECQ',
        },
    ];

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
                <div className="container mx-auto px-6 py-12">
                    <h1 className="text-5xl font-bold text-center mb-12 text-indigo-700">
                        Japanese Language Tutorials
                    </h1>

                    <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
                        Dive into Japanese learning with these video tutorials. From greetings to advanced grammar, start your journey to mastering the language!
                    </p>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {tutorials.map((tutorial) => (
                            <div
                                key={tutorial.id}
                                className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform hover:scale-105 flex flex-col items-center"
                            >
                                <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
                                    {tutorial.title}
                                </h2>
                                <div className="w-full aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={tutorial.url}
                                        title={tutorial.title}
                                        className="rounded-md w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
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

export default TutorialPage;
