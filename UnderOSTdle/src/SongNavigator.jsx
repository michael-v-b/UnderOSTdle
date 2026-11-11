import Song from "./Song.jsx";
import SongList from "./SongList.jsx";
const SongNavigator = () => {
  const songLibrarby = new Map();
  const motifsLibrarby = new Map();
  var selectedSongAndPath;
  var currentSong;
  const SONG_ARRAY_SIZE = 4;

  //initialize the songLibrarby and motifLibrarby functions
  function initializeSongs() {
    for (let i = 0; i < SongList.length; i++) {
      if (SongList[i].length < SONG_ARRAY_SIZE) {
        console.log("unable to initializeSongs");
        return;
      }
      var songName = SongList[i][0];
      var songMotifs = SongList[i][1];
      var songURL = SongList[i][2];
      var songGame = SongList[i][3];
      // add new song to song librarby
      songLibrarby.set(
        songName,
        new Song(songName, songMotifs, songURL, songGame),
      );
      for (let j = 0; j < songMotifs.length; j++) {
        var motif = songMotifs[j];
        //if motif isn't present then add it, otherwise push song to end of motifs library
        if (!motifsLibrarby.has(motif)) {
          motifsLibrarby.set(motif, [songName]);
        } else {
          motifsLibrarby.get(motif).push(songName);
        }
      }
    }
  }

  //returns a random song that is that distance away
  function findSongWithDistance(startSong, distance) {
    //break if start song is not present
    if (!songLibrarby.has(startSong)) {
      console.log("has niether of the songs");
      return null;
    }

    var currentDistance = 0;
    var path = new Map();
    currentSong = songLibrarby.get(startSong);
    currentSong.visited = true;
    var songQueue = [songLibrarby.get(startSong)]; //contains song object and not song names
    var outputSongIndex = 0;
    //loop through queue
    while (songQueue.length > 0 && currentDistance < distance) {
      currentSong = songQueue.shift();
      currentDistance = currentSong.distance;
      // if the queue reached a song of the desired distance,
      // then all songs within that distance are present and the loop should break
      if (currentDistance == distance) {
        songQueue.push(currentSong);
        break;
      }
      //iterate through the song motifs
      for (let i = 0; i < currentSong.motifs.length; i++) {
        var motif = currentSong.motifs[i];
        var songNamesWithMotif = motifsLibrarby.get(motif);
        //iterate through songs with that motif
        for (let j = 0; j < songNamesWithMotif.length; j++) {
          var songWithMotif = songLibrarby.get(songNamesWithMotif[j]);
          if (songWithMotif && songWithMotif.visited == false) {
            songQueue.push(songWithMotif);
            songWithMotif.visited = true;
            songWithMotif.distance = currentDistance + 1;
            path.set(songWithMotif.name, currentSong.name);
          }
        }
      }
    }
    outputSongIndex = Math.floor(Math.random() * songQueue.length);
    return [songQueue[outputSongIndex], path];
  }

  //resets the visited and distance values for each song
  function resetSongs() {
    for (var songName of songLibrarby.keys()) {
      var currentSong = songLibrarby.get(songName);
      currentSong.visited = false;
      currentSong.distance = 0;
    }
  }

  initializeSongs();

  selectedSongAndPath = findSongWithDistance("Song 1", 2);
  resetSongs();
  if (selectedSongAndPath[0]) {
    console.log("selectedSong: ");
    console.log(selectedSongAndPath);
  } else {
    console.log("no song found");
  }
};

export default SongNavigator;
