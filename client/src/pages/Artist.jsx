import { useEffect, useState } from 'react'
import { useParams, Link, Route, Routes } from 'react-router-dom'
import { getArtist, getArtistsTopTracks, getArtistsAlbums, getArtistsRelatedArtists, isArtistFollowedByUser, followArtist, unfollowArtist } from '../spotifyApi'
import { TrackItem, ArtistCard } from '../components/Items'
import Album from '../pages/Album'
import { convertMS } from '../helper'
interface Image {
    url: string;
}
interface Artist {
    id: string;
    name: string;
    images: Image[];
    followers: { total: number };
    popularity: number;
3 }
3 interface Track {
3     id: string;
3     name: string;
3     artists: Artist[];
3     album: { name: string; images: Image[] };
3     duration_ms: number;
3     played_at: string;
3 }
3 interface Album {
3     id: string;
3     name: string;
3     images: Image[];
3 }
3 interface ArtistInfoProps {
3     basicInfo: Artist | null;
3     topTracks: Track[] | null;
3     albums: { items: Album[] } | null;
3     related: Artist[] | null;
3     followed: boolean | null;
3 }
3 const Artist: React.FC = () => {
3     return (
3         <div className='py-24'>
3             <Routes>
3                 <Route path="/" element={<ArtistInfo />} />
3                 <Route path="album/:albumId" element={<Album />} />
3             </Routes>
3         </div>
3     );
3 }
3 const ArtistInfo: React.FC = () => {
3     const { id } = useParams<{ id: string }>();
3     const [basicInfo, setBasicInfo] = useState<Artist | null>(null);
3     const [topTracks, setTopTracks] = useState<Track[] | null>(null);
3     const [albums, setAlbums] = useState<{ items: Album[] } | null>(null);
3     const [related, setRelated] = useState<Artist[] | null>(null);
3     const [followed, setFollowed] = useState<boolean | null>(null);
3     const ualbums = new Set<string>();
3     const newAlbums = albums && albums.items.map(album => {
3         if (ualbums.has(album.name)) return null;
3         else {
3             ualbums.add(album.name);
3             return album;
3         }
3     });
3     useEffect(() => {
3         getArtist(id!).then(res => setBasicInfo(res.data));
3         getArtistsTopTracks(id!).then(res => setTopTracks(res.data.tracks));
3         getArtistsAlbums(id!).then(res => setAlbums(res.data));
3         getArtistsRelatedArtists(id!).then(res => setRelated(res.data.artists));
3         window.scrollTo(0, 0);
3         isArtistFollowedByUser(id!).then(res => setFollowed(res.data[0]));
3     }, [id]);
3     const follow = () => {
3         setFollowed(!followed);
3         followArtist(id!).then(() => console.log('Followed!'));
3     }
3     const unfollow = () => {
3         setFollowed(!followed);
3         unfollowArtist(id!).then(() => console.log('Unfollowed!'));
3     }
3     return (
3         <div>
3             {basicInfo && topTracks && albums && newAlbums && related ? 
3                 <div>
3                     <div className='flex flex-col justify-center'>
3                         <div className='w-40 h-40 rounded-full flex justify-center items-center overflow-hidden mx-auto'>
3                             <img src={basicInfo.images[1].url} alt="artist" className='object-cover'/> 
3                         </div>
3                         <h1 className='text-white text-2xl sm:text-3xl lg:text-4xl text-center mt-3'>{basicInfo.name}</h1>
3                         <div className='flex space-x-8 mt-6 w-full justify-center items-center'>
3                             <div>
3                                 <h3 className='text-gray-600 text-xs tracking-wider'>FOLLOWERS</h3>
3                                 <h4 className='text-spotify text-base lg:text-2xl'>{basicInfo.followers.total.toLocaleString()}</h4>
3                             </div>
3                             <div className=''>
3                                 <h3 className='text-gray-600 text-xs tracking-wider'>POPULARITY</h3>
3                                 <h4 className='text-spotify text-base lg:text-2xl'>{basicInfo.popularity}</h4>
3                             </div>
3                         </div>
3                         {followed === undefined ? null :
3                             <div className='mt-4 cursor-pointer mx-auto'>
3                                 {followed ? 
3                                     <h3 onClick={unfollow} className=' rounded-full text-gray-400 inline-block text-sm px-3 py-1 border border-red-800 hover:bg-red-800'>Unfollow</h3> : 
3                                     <h3 onClick={follow} className=' rounded-full inline-block text-white text-sm px-3 py-1 bg-spotify transform transition-all duration-300 hover:scale-110'>Follow</h3>}
3                             </div>
3                         }
3                     </div>
3                     <div className='mt-20'>
23                         <h2 className='text-2xl heading mb-1 font-bold'>Top Songs by {basicInfo.name} </h2>
23                         <div className="table justify-between w-full">
23                             <div className="w-4/4 lg:w-auto flex justify-between text-gray-700 mb-4 tracking-wider text-sm border-gray-800 sticky top-0 pt-8 bg-black border-bottom">
23                                 <div className='w-12/12 lg:w-7/12 text-left text-gray-200'>TRACK</div>
23                                 <div className='w-4/12 hidden lg:block text-left text-gray-200'>ALBUM</div>
23                                 <div className='w-1/12 hidden lg:block text-left text-gray-200'>DURATION</div>
23                             </div>
23                             {topTracks.map(song => 
23                                 <div className="lg:flex text-gray-400 justify-between w-full" key={song.played_at}>
23                                     <div className="w-12/12 lg:w-7/12 truncate hover:translate-x-4 transition-transform duration-300 transform">
23                                         <Link to={`/track/${song.id}`}>
23                                             <TrackItem songName={song.name} songArtists={song.artists} songAlbum={song.album.name} picURL={song.album.images[1].url}/>
23                                         </Link>
23                                     </div>
23                                     <div className='w-4/12 hidden lg:block pr-4'>{song.album.name}</div>
23                                     <div className='w-1/12 hidden lg:block'>{convertMS(song.duration_ms)}</div>
23                                 </div>
23                             )}
23                         </div>
23                     </div>
23                     <div className='mt-20'>
23                         <h3 className='text-2xl heading mb-1 font-bold'>Latest Albums</h3>
23                         <div className="grid grid-cols-2 md:grid-cols-5">
23                             {newAlbums.slice(0, 5).map(album => 
23                                 {    
23                                     if (album) {
23                                         return (
23                                             <Link to={`/artist/${id}/album/${album.id}`} key={album.id}>
23                                                 <ArtistCard imageURL={album.images[1].url} itemName={album.name}/>
23                                             </Link>)
23                                     } else return null
23                                 }
23                             )}
23                         </div>
23                     </div>
23                     <div className='mt-24'>
23                         <h3 className='text-2xl heading mb-1 font-bold'>You might also like..</h3>
23                         <div className="grid grid-cols-2 md:grid-cols-5">
23                             {related.slice(0, 5).map(relatedArtist => 
23                                 <Link to={`/artist/${relatedArtist.id}`} key={relatedArtist.id}>
23                                     <ArtistCard imageURL={relatedArtist.images[1].url} itemName={relatedArtist.name}/>
23                                 </Link>
23                             )}
23                         </div>
23                     </div>
23                 </div>
23                 : <div className='loader' />
23             }
23         </div>
23     )
23 }
23 export default Artist