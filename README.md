# Dictionary web app

This is a solution to the [Dictionary web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL).
Frontend Mentor challenges help you improve your coding skills by building realistic projects.



## Table of contents

  - [Workflow](#workflow)
  - [Screenshot](#Screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#things-i-learnt)
- [Profile](#author)
- [Acknowledgments](#acknowledgement)



## Links
[live site](https://dictionary-cat-bun.netlify.app/)  
[Github](https://github.com/Ebunski/dictionary)



##  Workflow

#### Catalyst:  
- [x] styling    
- [x] user Preferences  
- [x] Loading Screen  
- [x] Source attribution
- [x] Switch between light and dark themes
- [x] Suggestions

#### Ebun
- [x] Data fetching
- [x] Error handling
- [x] Play the audio file for a word when it's available
- [x] Switch between serif, sans serif, and monospace fonts.
- [x] other logic
- [x] input

## Built with
- React
- Tailwind
- Redux toolkit

## Things i Learnt
- working with React-redux (especially with data fetching)
- working with audio.

 #### Properties:

1. `currentTime`: Gets or sets the current playback position in seconds.
2. `duration`: Returns the duration of the audio in seconds.
3. `paused`: Indicates whether the audio is paused.
4. `ended`: Indicates whether the audio has ended.
5. `volume`: Gets or sets the audio volume, where 0 is muted, and 1 is full volume.
6. `muted`: Gets or sets whether the audio is muted.
7. `loop`: Gets or sets whether the audio should loop when it reaches the end.
8. `playbackRate`: Gets or sets the playback rate of the audio (e.g., 1 for normal speed, 2 for double speed, 0.5 for half speed).
9. `currentSrc`: Returns the URL of the currently playing audio source.
10. `paused`: Indicates whether the audio is paused.

#### Methods:

1. `play()`: Starts or resumes audio playback.
2. `pause()`: Pauses audio playback.
3. `load()`: Loads the audio file if it hasn't been loaded already.
4. `canPlayType(type)`: Checks if the browser can play audio of the specified type (e.g., "audio/mp3").
5. `seekTo(time)`: Seeks to a specific playback position in seconds.

#### Events:

1. `onplay`: Fired when audio playback begins.
2. `onpause`: Fired when audio playback is paused.
3. `onended`: Fired when the audio has finished playing.
4. `ontimeupdate`: Fired as the playback position of the audio changes (e.g., during playback, while seeking).
5. `onvolumechange`: Fired when the audio volume or mute status changes.
6. `oncanplay`: Fired when enough of the audio has loaded to be able to play it.
7. `oncanplaythrough`: Fired when enough of the audio has loaded to play it smoothly without buffering interruptions.

## Author
[Twitter](https://twitter.com/Ebun_ski?t=ffhsREWTvATspCVF6RMITw&s=09)

[LinkedIn](https://www.linkedin.com/in/ebunoluwa-oyebola-1490021b1)

Email: ebunoyebola.tech@gmail.com


## Acknowledgement
Thanks to catalyst (@Catalyst497 on twitter) for collaboration.
