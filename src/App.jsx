import React, { useEffect, useState } from 'react'
import 'animate.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css'
import 'react-toastify/dist/ReactToastify.css'

const API_KEY = "Ay3fdCOWgR9vz6vBzmszLPkKyrRqeNaLTqVGjiAUIsnECeUVFHBNEzEG";

const App = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("flower")

  const fetchImage = async () => {
    try {
      setLoading(true)
      const options = {
        headers: {
          Authorization: API_KEY
        }
      }
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        options
      )
      setPhotos(prev => [...prev, ...res.data.photos])
    }
    catch (err) {
      toast.error("Failed to fetch images")
    }
    finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  const search = (e) => {
    e.preventDefault()
    const q = e.target[0].value.trim()
    if (!q) return
    setPhotos([])
    setPage(1)
    setQuery(q)
  }

  useEffect(() => {
    fetchImage()
  }, [page, query])

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-12 animate__animated animate__fadeIn'>
      <h1 className='text-3xl md:text-4xl font-bold text-indigo-600 text-center px-3'>
        📷 Image Gallery - {query}
      </h1>

      {/*  Responsive search bar */}
      <form onSubmit={search} className="flex flex-col sm:flex-row w-11/12 sm:w-auto items-center gap-3 sm:gap-0">
        <input
          className='p-3 bg-white rounded-lg sm:rounded-l-lg sm:rounded-r-none w-full sm:w-[350px] focus:outline-none focus:ring-2 focus:ring-indigo-500'
          placeholder='Search image here'
          required
        />
        <button className='bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 text-white font-bold py-3 px-6 sm:px-8 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:scale-105 transition-transform w-full sm:w-auto'>
          Search
        </button>
      </form>

      {
        photos.length === 0 && !loading &&
        <h1 className='text-xl md:text-2xl font-bold text-center text-gray-600'>
          Search result not found
        </h1>
      }

      {/*  Responsive grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 md:w-10/12'>
        {
          photos.map((item, index) => (
            <div key={index} className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
              <img
                src={item.src.medium}
                alt={item.alt}
                className='h-[200px] object-cover w-full hover:scale-110 transition-transform duration-300'
              />
              <div className='p-3'>
                <h1 className='text-base md:text-lg font-medium text-gray-600 capitalize truncate'>{item.photographer}</h1>
                <a target="_blank" href={item.src.original} rel="noreferrer"
                   className='mt-3 block bg-green-500 font-bold py-2 rounded-lg text-center text-white hover:scale-105 transition-transform duration-300'>
                  <i className="ri-download-line mr-1"></i>
                  Download
                </a>
              </div>
            </div>
          ))
        }
      </div>

      {loading &&
        <i className="ri-loader-line text-4xl text-gray-400 animate-spin"></i>
      }

      {
        photos.length > 0 && !loading &&
        <button onClick={loadMore}
                className='bg-rose-500 py-3 px-10 sm:px-16 rounded-lg font-medium text-white hover:scale-110 transition-transform duration-300'>
          Load more
        </button>
      }

      {/* GitHub profile footer */}
      <footer className="mt-12 text-center text-gray-600 px-3">
        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 font-bold hover:underline hover:text-indigo-800"
        >
          <i className="ri-github-fill text-2xl align-middle mr-1"></i>
          Visit my GitHub Profile
        </a>
      </footer>

      <ToastContainer />
    </div>
  )
}

export default App
