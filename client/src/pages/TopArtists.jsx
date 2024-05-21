import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsersTopArtists, getUsersTopArtistsSinceWeeks, getUsersTopArtistsSinceAYear } from '../spotifyApi';
import { ArtistCard } from '../components/Items';
import { FadeLoader } from 'react-spinners';

type Artist = {
  id: string;
  name: string;
  images: { url: string }[];
};

enum TimeRange {
  Weeks = '4 Weeks',
  Months = '6 Months',
Year = 'Over an Year',
}

const TopArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[] | null>(null);
  const [activeTab, setActiveTab] = useState<TimeRange>(TimeRange.Weeks);  // Default to '6 Months'

  useEffect(() => {
    window.scrollTo(0, 0);
    getUsersTopArtistsSinceWeeks().then(res => setArtists(res.data.items));
  }, []);

  const bringWeeks = () => {
    setActiveTab(TimeRange.Weeks);
    getUsersTopArtistsSinceWeeks().then(res => setArtists(res.data.items));
  };

  const bringMonths = () => {
    setActiveTab(TimeRange.Months);
    getUsersTopArtists().then(res => setArtists(res.data.items));
  };

  const bringYear = () => {
    setActiveTab(TimeRange.Year);
    getUsersTopArtistsSinceAYear().then(res => setArtists(res.data.items));
  };

  return (
    <div className='py-12 md:py-28'>
      <div className='flex justify-center space-x-4'>
        <h2 
          className={`w-32 text-center rounded-full shadow-md p-2 text-sm md:text-base cursor-pointer hover:text-green-400 ${activeTab === TimeRange.Weeks ? 'bg-gray-800 text-green-400' : 'bg-gray-1000'}`}
          onClick={bringWeeks}
        >
          4 Weeks
        </h2>
        <h2 
          className={`w-32 text-center rounded-full shadow-md p-2 text-sm md:text-base cursor-pointer hover:text-green-400 ${activeTab === TimeRange.Months ? 'bg-gray-800 text-green-400' : 'bg-gray-1000'}`}
          onClick={bringMonths}
        >
          6 Months
        </h2>
        <h2 
          className={`w-32  text-center rounded-full shadow-md p-2 text-sm md:text-base cursor-pointer hover:text-green-400 ${activeTab === TimeRange.Year ? 'bg-gray-800 text-green-400' : 'bg-gray-1000'}`}
          onClick={bringYear}
        >
          All Time
        </h2>
      </div>

      {artists ? (
        <div className='mt-12'>
          <h3 className="text-2xl heading font-bold">⚡️ Your favorite artists</h3>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5'>
            {artists.map((artist, index) => (
              <Link to={`/artist/${artist.id}`} key={artist.id}>
                <ArtistCard index={index + 1} imageURL={artist.images[2].url} itemName={artist.name} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full pt-40"> {/* <-- This is the new container div */}
          <FadeLoader color="#1DB954" />
        </div>
      )}
    </div>
  );
};

export default TopArtists;