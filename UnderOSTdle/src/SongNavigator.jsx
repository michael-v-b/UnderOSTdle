import Song from "./Song.jsx";
import SongList from "./SongList.jsx";
const SongNavigator = () => {
  const songLibrarby = new Map();
  const motifsLibrarby = new Map();
  var songPath;
  var currentSong;

  //initialize the songLibrarby and motifLibrarby functions
  function initializeSongs() {
    for (let i = 0; i < SongList.length; i++) {
      var songName = SongList[i][0];
      var songMotifs = SongList[i][1];
      // add new song to song librarby
      songLibrarby.set(songName, new Song(songName, songMotifs));
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

  function navigateSongs(startSong, endSong) {
    //break if start song is not present
    if (!songLibrarby.has(startSong) || !songLibrarby.has(endSong)) {
      console.log("has niether of the songs");
      return null;
    }
    var path = new Map();
    currentSong = songLibrarby.get(startSong);
    currentSong.visited = true;
    var songQueue = [songLibrarby.get(startSong)]; //contains song object and not song names
    //loop through queue
    while (songQueue.length > 0 && currentSong.name != endSong) {
      currentSong = songQueue.shift();
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
            path.set(songWithMotif.name, currentSong.name);
          }
        }
      }
    }

    if (currentSong.name == endSong) {
      return path;
    } else {
      return null;
    }
  }

  initializeSongs();

  songPath = navigateSongs("Song 1", "Song 4");
  currentSong = "Song 4";
  console.log("Path: ");
  console.log(songPath);
  while (songPath && songPath.has(currentSong)) {
    console.log(currentSong);
    currentSong = songPath.get(currentSong);
  }
};

export default SongNavigator;
