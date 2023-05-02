declare global {
    interface Window {
      onSpotifyWebPlaybackSDKReady: () => void;
      Spotify: {
        Player: SpotifyPlayer;
      };
    }
  }

  export interface WebPlaybackPlayer {
    device_id: string;
  }
  
  export interface SimplifiedWebPlaybackAlbum {
    images: { url: string }[];
    name: string;
  }
  
  export interface SimplifiedWebPlaybackArtist {
    name: string;
  }
  
  export interface SimplifiedWebPlaybackTrack {
    name: string;
    artists: SimplifiedWebPlaybackArtist[];
    album: SimplifiedWebPlaybackAlbum;
    duration_ms: number;
  }
  
  export interface SimplifiedWebPlaybackState {
    paused: boolean;
    position: number;
    track_window: {
      current_track: SimplifiedWebPlaybackTrack;
    };
  }
  
  export type ReadyEvent = WebPlaybackPlayer;
  export type NotReadyEvent = WebPlaybackPlayer;
  export type PlayerStateChangedEvent = SimplifiedWebPlaybackState;
  
  export interface SpotifyPlayer {
    addListener(event: 'ready', callback: (data: ReadyEvent) => void): boolean;
    addListener(event: 'not_ready', callback: (data: NotReadyEvent) => void): boolean;
    addListener(event: 'player_state_changed', callback: (data: PlayerStateChangedEvent) => void): boolean;
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
    getCurrentState: () => Promise<PlayerStateChangedEvent | null>;
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
  