import axios from "axios";
import querystring from "querystring";
import { User } from "./mongoDb.js";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "./config.js";

// Define types and enums
type AccessToken = string;
type TimeRange = 'short_term' | 'medium_term' | 'long_term';
interface Artist {
    name: string;
    rank: number;
}
interface Track {
    name: string;
    rank: number;
}
interface LoginData {
    timestamp: Date;
    data: {
        short_term: {
            artists: Artist[];
            songs: Track[];
        };
        medium_term: {
            artists: Artist[];
            songs: Track[];
        };
        long_term: {
            artists: Artist[];
            songs: Track[];
        };
    };
}
// User-related utility functions
export const fetchUserProfile = async (access_token: AccessToken) => {
    return axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
};
export const fetchUserTopData = async (access_token: AccessToken): Promise<LoginData> => {
    const timeRanges: TimeRange[] = ['short_term', 'medium_term', 'long_term'];
    const currentLoginData: LoginData = {
        timestamp: new Date(),
        data: {
            short_term: { artists: [], songs: [] },
0             medium_term: { artists: [], songs: [] },
02             long_term: { artists: [], songs: [] }
04         }
06     };
08     for (const range of timeRanges) {
10         const topArtistsResponse = await getUsersTopArtistsByRange(range, access_token);
12         const topTracksResponse = await getUsersTopTracksByRange(range, access_token);
14         currentLoginData.data[range].artists = topArtistsResponse.data.items.map((artist: any, index: number) => ({ 
16             name: artist.name, 
18             rank: index + 1
20         }));
22         currentLoginData.data[range].songs = topTracksResponse.data.items.map((track: any, index: number) => ({ 
24             name: track.name, 
26             rank: index + 1
28         }));
30     }
32     return currentLoginData;
34 };
36 export const getUsersTopArtistsByRange = async (range: TimeRange, access_token: AccessToken) => {
38     return axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=50`, {
40         headers: {
42             'Authorization': `Bearer ${access_token}`
44         }
46     });
48 };
50 export const getUsersTopTracksByRange = async (range: TimeRange, access_token: AccessToken) => {
52     return axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=50`, {
54         headers: {
56             'Authorization': `Bearer ${access_token}`
58         }
60     });
62 };
64 export const updateOrCreateUser = async (spotifyId: string, name: string, currentLoginData: LoginData) => {
66     const existingUser = await User.findOne({ spotifyId: spotifyId });
68     if (existingUser) {
70         existingUser.logins.push(currentLoginData);
72         await existingUser.save();
74     } else {
76         const newUser = new User({
78             spotifyId: spotifyId,
80             name: name,
82             logins: [currentLoginData]
84         });
86         await newUser.save();
88     }
90 };
92 // random
94 export const generateRandomString = (length: number): string => {
96     let text = '';
98     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
00     for (let i = 0; i < length; i++) {
02         text += possible.charAt(Math.floor(Math.random() * possible.length));
04     }
06     return text;
08 };
10 export const catchErrors = (func: Function) => {
12     return function (...args: any[]) {
14         return func(...args).catch((err: any) => {
16             console.error(err);
18         });
20     };
22 };
24 export const formatDuration = (ms: number): string => {
26     const minutes = Math.floor(ms / 60000);
28     const seconds = Math.floor(((ms % 60000) / 1000));
30     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
32 };
34 export const handleTokenExchange = async (code: string) => {
36     return axios({
38         method: 'post',
40         url: 'https://accounts.spotify.com/api/token',
42         data: querystring.stringify({
44             code: code,
46             redirect_uri: REDIRECT_URI,
48             grant_type: 'authorization_code'
50         }),
52         headers: {
54             'content-type': 'application/x-www-form-urlencoded',
56             Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
58         },
60     });
62 };