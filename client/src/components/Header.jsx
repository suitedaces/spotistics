import { logOut } from '../spotifyApi';
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
// import { GithubButton } from 'react-github-btn';

const Header = () => {
    return (
        <div className='bg-black'>
            <div className="pt-8 order-last md:order-first mb-20 md:mb-0 flex justify-between items-center">
            <div className="relative pl-60 tracking-tight md:text-5xl border-lime-600 font-bold font-sans hover:shadow-lg hover:shadow-neon">
                <a href={`${CLIENT_URL}`} className="text-green-500">Sonophile</a> 👨🏽‍🎤
            </div>

                <div className='flex items-center pr-20 justify-end'>
                    <div className='flex items-center mr-4 text-gray-200 hover:text-green-400 cursor-pointer'>
                        {/* <GithubButton href="https://github.com/suitedaces/spotistics" data-icon="octicon-star" data-size="large" aria-label="Star suitedaces/spotistics on GitHub">Star</GithubButton> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588-.094-.117.34.427.433.539.19.227.33.365.44.438.204.137.587.196 1.15.14.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308 1.477-.933 2.613-1.226 3.422-1.096.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19.691.936 1.058 2.045 1.058 3.293 0 3.757-1.674 5.665-4.642 6.392.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716 1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446.005-.705c.005-.708.007-1.338.007-1.998 0-.697-.183-1.152-.425-1.36-.661-.57-.326-1.655.54-1.752 2.967-.333 4.337-1.482 4.337-4.66 0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66.865.097 1.201 1.177.544 1.748-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"/></svg>
                        <a target='blank' className='ml-2 text-sm' href="https://github.com/suitedaces/sonophile">Github</a>
                    </div>
                    <button onClick={logOut} className='text-gray-200  hover:text-red-600 '>
                        <div className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="13"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 11h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 1 0 0-12H4A9.985 9.985 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4z"/></svg>
                            <h2 className='ml-2 text-sm'>Logout</h2>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;





