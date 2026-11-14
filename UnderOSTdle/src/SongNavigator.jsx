import Song from "./Song.jsx";
import UndertaleList from "./UndertaleList.jsx";
import DeltaList1 from "./DeltaList1.jsx";
import DeltaList2 from "./DeltaList2.jsx";
import DeltaList3 from "./DeltaList3.jsx";
const SongNavigator = () => {
  const songLibrarby = new Map();
  const motifsLibrarby = new Map();
  var selectedSongAndPath;
  var currentSong;
  const songListList = [UndertaleList, DeltaList1, DeltaList2, DeltaList3];

  //initialize the songLibrarby and motifLibrarby functions
  function initializeSongs(list) {
    for (let i = 0; i < list.length; i++) {
      var songID = list[i].id;
      var songName = list[i].name;
      var songMotifs = list[i].motifs;
      var songURL = list[i].url;
      var songGame = list[i].game;
      // add new song to song librarby
      songLibrarby.set(
        songName,
        new Song(songID, songName, songMotifs, songURL, songGame),
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

  for (let i = 0; i < songListList.length; i++) {
    initializeSongs(songListList[i]);
  }

  selectedSongAndPath = findSongWithDistance("Once Upon a Time", 1);
  resetSongs();
  console.log(motifsLibrarby);
  if (selectedSongAndPath != null) {
    console.log("selectedSong: ");
    console.log(selectedSongAndPath);
  } else {
    console.log("no song found");
  }
};

export default SongNavigator;
