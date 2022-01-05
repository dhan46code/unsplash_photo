import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Page from './Page';

// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = 'https://api.unsplash.com/photos/';
const searchUrl = 'https://api.unsplash.com/search/photos';

function App() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('cat');

  const fetchPhoto = async () => {
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    // if query exist get query , if not default page
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      // loading true dulu, jika sudah dapaat buat false
      setLoading(true);
      const resp = await fetch(url);
      const data = await resp.json();
      // update
      setPhoto((oldPhoto) => {
        // jika query benar maka pindahkan pada page 1 dan isi data baru
        // or wipe out
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhoto, ...data.results];
        } else {
          return [...oldPhoto, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // added page if window.innerHeight + window.scrollY
  // same with document.body.scrollHeight
  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        // update page
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener('scroll', event);
  }, []);

  useEffect(() => {
    fetchPhoto();
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <main>
      <section className='search'>
        <form className='search_form'>
          <input
            type='text'
            className='input_form'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='search_btn' type='submit' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos_'>
        <div className='photo_center'>
          {photo.map((item, index) => {
            return <Page key={index} {...item} />;
          })}
        </div>
        {loading && <h2 className='loading'>Loading waiting pic ..</h2>}
      </section>
    </main>
  );
}

export default App;
