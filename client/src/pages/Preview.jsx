import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import previewText from '../assets/preview.png'; 
import logoDark from '../assets/logo.png'; 
import logoLight from '../assets/logo-white.png';
import spotifyCodeBlack from '../assets/spotify-code-black.png'; 
import spotifyCodeWhite from '../assets/spotify-code-white.png'; 

// Mock Data for Spotify Search
const MOCK_SONGS = [
  { id: 1, title: "Espresso", artist: "Sabrina Carpenter", cover: "https://i.scdn.co/image/ab67616d0000b273659cd4673230913b3918e316" },
  { id: 2, title: "Birds of a Feather", artist: "Billie Eilish", cover: "https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62" },
  { id: 3, title: "Good Luck, Babe!", artist: "Chappell Roan", cover: "https://i.scdn.co/image/ab67616d0000b273949f3982e5d9565551381386" },
  { id: 4, title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", cover: "https://i.scdn.co/image/ab67616d0000b27382ea2e9e1858aa012c57cd45" },
  { id: 5, title: "Pink Pony Club", artist: "Chappell Roan", cover: "https://i.scdn.co/image/ab67616d0000b27344c20d75c87900dfc1050e6f" },
];

export default function Preview() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve state passed from Capture.jsx
  const { photos, layout } = location.state || { photos: [], layout: 'single' };

  // UI State
  const [frameColor, setFrameColor] = useState('white'); // 'white' or 'black'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);

  // Helper to determine grid class for the PHOTO CONTAINER based on layout
  const getLayoutClass = () => {
    switch (layout) {
      case 'single': return 'grid-cols-1';
      case 'strip-3': return 'grid-cols-1 gap-4';
      case 'strip-4': return 'grid-cols-1 gap-4';
      case 'grid-2x2': return 'grid-cols-2 gap-2';
      case 'grid-2x3': return 'grid-cols-2 gap-2';
      default: return 'grid-cols-1';
    }
  };

  // Filter songs based on search
  const filteredSongs = searchQuery 
    ? MOCK_SONGS.filter(s => 
        s.title.toLowerCase().startsWith(searchQuery.toLowerCase()) || 
        s.artist.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    : [];

  const handleSave = () => {
    // Navigate to Output page with final data
    navigate('/output', { 
      state: { 
        photos, 
        layout, 
        frameColor, 
        selectedSong 
      } 
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-20 pb-10 overflow-hidden bg-lightWhite">
      <Navbar />

        {/* Preview Title Image */}
        <div className="w-full flex items-center justify-center mb-5">
            <img src={previewText} alt="Preview" className="h-10 md:h-16 object-contain" />
        </div>
        
        <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 gap-8 md:gap-16 justify-center items-start">
        
        {/* ================= LEFT SIDE: FRAME PREVIEW ================= */}
        <div className="flex flex-col items-center gap-6 animate-fade-in-up">
          
          {/* THE FRAME */}
          <div 
            className={`relative p-6 shadow-2xl transition-colors duration-500 ease-in-out
              ${frameColor === 'white' ? 'bg-white' : 'bg-black'}
            `}
            style={{ 
              // Approximate aspect ratios for the frame container
              width: layout.includes('strip') ? '300px' : '400px',
              minHeight: layout.includes('strip') ? '600px' : '500px' 
            }}
          >
            {/* 1. Logo at Top */}
            <div className="flex justify-center mb-4">
              <img 
                src={frameColor === 'white' ? logoDark : logoLight} 
                alt="Brand Logo" 
                className="w-30 object-contain opacity-90"
              />
            </div>

            {/* 2. Photo Grid */}
            <div className={`grid w-full h-auto ${getLayoutClass()}`}>
              {photos.map((photo, index) => (
                <div key={index} className="aspect-video w-full overflow-hidden bg-gray-200">
                  <img src={photo} alt={`Snap ${index}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* 3. Spotify Code at Bottom */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <img 
                src={frameColor === 'white' ? spotifyCodeBlack : spotifyCodeWhite} 
                alt="Spotify Code" 
                className="w-32 md:w-40 opacity-80"
              />
              {/* Show song title if selected */}
              {selectedSong && (
                <p className={`text-[10px] font-semibold uppercase tracking-widest text-center font-button ${frameColor === 'white' ? 'text-black' : 'text-white'}`}>
                  {selectedSong.title} - {selectedSong.artist}
                </p>
              )}
            </div>
          </div>

          {/* Color Controls */}
          <div className="flex gap-6 mt-4">
            <button 
              onClick={() => setFrameColor('white')}
              className={`w-12 h-12 rounded-full border-2 transition-all transform hover:scale-110
                ${frameColor === 'white' ? 'bg-white border-black scale-110 shadow-lg' : 'bg-white border-gray-300'}
              `}
              aria-label="White Frame"
            />
            <button 
              onClick={() => setFrameColor('black')}
              className={`w-12 h-12 rounded-full border-2 transition-all transform hover:scale-110
                ${frameColor === 'black' ? 'bg-black border-gray-800 scale-110 shadow-lg' : 'bg-black border-gray-600'}
              `}
              aria-label="Black Frame"
            />
          </div>
        </div>


        {/* ================= RIGHT SIDE: SEARCH & ACTIONS ================= */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 gap-8 pt-10 animate-fade-in-up delay-100">
          
          
          {/* Spotify Search Section */}
          <div className="w-full bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-200 shadow-sm">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search a song that fits your vibe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 text-black border-black focus:outline-none bg-white font-body"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            {/* Results List */}
            <div className="max-h-75 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {searchQuery && filteredSongs.length === 0 && (
                <p className="text-gray-500 font-body text-center py-4">No songs found.</p>
              )}
              
              {!searchQuery && !selectedSong && (
                <p className="text-gray-400 font-body text-sm text-center py-4">Type to search for music...</p>
              )}

              {/* Render Filtered List */}
              {filteredSongs.map((song) => (
                <div 
                  key={song.id}
                  onClick={() => setSelectedSong(song)}
                  className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer 
                    ${selectedSong?.id === song.id ? 'bg-black text-white hover:bg-black' : ''}
                  `}
                >
                  <img src={song.cover} alt={song.title} className="w-10 h-10 rounded-md" />
                  <div className="flex flex-col">
                    <span className={`font-bold font-button text-sm ${selectedSong?.id === song.id ? 'text-gray-100' : 'text-gray-800'}`}>{song.title}</span>
                    <span className={`text-xs font-button ${selectedSong?.id === song.id ? 'text-gray-100' : 'text-gray-800'}`}>{song.artist}</span>
                  </div>
                </div>
              ))}
              
              {/* If a song is selected but search is cleared, show selected at top */}
              {!searchQuery && selectedSong && (
                 <div className="bg-black text-white flex items-center gap-3 p-2 rounded-xl">
                    <img src={selectedSong.cover} alt={selectedSong.title} className="w-10 h-10 rounded-md" />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{selectedSong.title}</span>
                      <span className="text-xs text-gray-300">{selectedSong.artist}</span>
                    </div>
                    <button onClick={() => setSelectedSong(null)} className="ml-auto text-xs text-gray-400 hover:text-white">✕</button>
                 </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="w-full flex justify-center md:justify-end mt-4">
            <button 
              onClick={handleSave}
              className="px-8 py-2 bg-black text-white font-button font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all transform"
            >
              Save
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}