import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPageByUserId  } from '../api/api'; 

const DisplayPage = ({ pageId }) => {
  const [pageContent, setPageContent] = useState({ html: '', css: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchPageContent = async () => {
      try {
        const data = await getPageByUserId();
        setPageContent(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load page content');
        setIsLoading(false);
      }
    };

    fetchPageContent();
  }, [pageId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: pageContent.css }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent.html }} />
    </div>
  );
};

export default DisplayPage;
