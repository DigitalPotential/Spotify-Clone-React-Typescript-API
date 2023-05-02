declare global {
    interface Window {
      onSpotifyWebPlaybackSDKReady: () => void;
      Spotify: {
        Player: SpotifyPlayer;
      };
    }
  }
  
  export interface SpotifyTrack {
    duration_ms: number;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
  }
  
  export interface SpotifyArtist {
    name: string;
  }
  
  export interface SpotifyAlbum {
    name: string;
    images: SpotifyImage[];
  }
  
  export interface SpotifyImage {
    url: string;
  }
  
  export interface SpotifyTrackWindow {
    current_track: SpotifyTrack;
  }
  
  export interface SpotifyPlayerState {
    position: number;
    paused: boolean;
    track_window: SpotifyTrackWindow;
  }
  
  export interface SpotifyPlayer {
    new (options: SpotifyPlayerOptions): SpotifyPlayer;
    addListener(event: string, callback: (data: any) => void): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    previousTrack: () => void;
    togglePlay: () => void;
    nextTrack: () => void;
    seek: (position: number) => void;
  }
  
  
  export interface SpotifyPlayerOptions {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    volume?: number;
  }
  