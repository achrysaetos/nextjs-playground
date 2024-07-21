"use client"

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  by: number;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  comments?: Comment[];
}

type Comment = {
  id: number;
  by: string;
  text: string;
  time: number;
  kids?: number[];
};


const HomePage = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchTopStories = async () => {
            try {
                // Fetch top story IDs
                const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
                const storyIds = await response.json();
                
                // Fetch details for the first 30 stories
                const storyPromises = storyIds.slice(0, 30).map((id: any) =>
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
                );
                
                const stories = await Promise.all(storyPromises) as NewsItem[];

                // Fetch comments for each story
                const storiesWithComments = await Promise.all(stories.map(async story => {
                  if (story.kids) {
                    const commentPromises = story.kids.slice(0, 10).map((commentId: number) =>
                      fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`).then(res => res.json())
                    );
                    const comments = await Promise.all(commentPromises) as Comment[];
                    return { ...story, comments };
                  } else {
                    return story;
                  }
                }));
                
                setNewsItems(storiesWithComments);
            } catch (error) {
                console.error('Error fetching news items:', error);
            }
        };

        fetchTopStories();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <header className="bg-orange-600 text-white py-2 px-4 flex justify-between items-center">
                <h1 className="font-bold text-xl">Hacker News</h1>
                <nav>
                    <a href="#" className="mr-4">new</a>
                    <a href="#" className="mr-4">past</a>
                    <a href="#" className="mr-4">comments</a>
                    <a href="#" className="mr-4">ask</a>
                    <a href="#" className="mr-4">show</a>
                    <a href="#" className="mr-4">jobs</a>
                    <a href="#" className="mr-4">submit</a>
                </nav>
            </header>
            <main className="mt-4">
                {newsItems.map((item, index) => (
                    <div key={index} className="border-b py-2 flex justify-between items-center">
                        <div>
                            <div className="flex flex-row items-center">
                              <span className="text-sm text-gray-6000">{index + 1}.</span>
                              <span className="text-sm text-gray-6000">&nbsp;</span>
                              <a href={item.url} className="text-blue-600 hover:underline">{item.title}</a>
                            </div>
                            <p className="text-sm text-gray-600">
                                {item.score} points by {item.by} {formatDistanceToNow(item.time * 1000)} ago | {item.descendants} comments
                            </p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default HomePage;