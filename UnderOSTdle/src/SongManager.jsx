import { useRef, forwardRef, useImperativeHandle } from "react";
import Song from "./Song.jsx";
import UndertaleList from "./UndertaleList.jsx";
import DeltaList1 from "./DeltaList1.jsx";
import DeltaList2 from "./DeltaList2.jsx";
import DeltaList3 from "./DeltaList3.jsx";
import DeltaList5 from "./DeltaList5.jsx";
const SongManager = forwardRef(({}, ref) => {
  const songLibrarbyRef = useRef(new Map());
  const motifsLibrarbyRef = useRef(new Map());
  var selectedSongAndPath;
  var currentSong;
  const songListList = [
    UndertaleList,
    DeltaList1,
    DeltaList2,
    DeltaList3,
    DeltaList5,
  ];

  //initialize the songLibrarby and motifLibrarby functions
  function initializeSongs() {
    const songLibrarby = songLibrarbyRef.current;
    const motifsLibrarby = motifsLibrarbyRef.current;
    songLibrarby.clear();
    motifsLibrarby.clear();
    for (let list of songListList) {
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
    console.log(motifsLibrarby);
  }

  //returns a random song that is that distance away
  function findSongWithDistance(startSong, distance) {
    const songLibrarby = songLibrarbyRef.current;
    const motifsLibrarby = motifsLibrarbyRef.current;
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
    resetSongs();
    return [songQueue[outputSongIndex], path];
  }

  //resets the visited and distance values for each song
  function resetSongs() {
    const songLibrarby = songLibrarbyRef.current;
    for (var songName of songLibrarby.keys()) {
      var currentSong = songLibrarby.get(songName);
      currentSong.visited = false;
      currentSong.distance = 0;
    }
  }

  function getSolution(path, start, end) {
    var output = [end];
    var currentSong = path.get(end);
    while (currentSong != null && currentSong != start) {
      output.unshift(currentSong);
      currentSong = path.get(currentSong);
    }
    output.unshift(start);
    return output;
  }

  function printSongList() {
    console.log(songLibrarbyRef.current);
  }
  function getSong(songName) {
    return songLibrarbyRef.current.get(songName);
  }

  function getMotifList() {
    return motifsLibrarbyRef;
  }

  function getSongs(distance) {
    const songLibrarby = songLibrarbyRef.current;
    const songNames = Array.from(songLibrarby.keys());
    var index = Math.floor(Math.random() * songNames.length);
    var song1 = songNames[index];
    var song2AndPath = findSongWithDistance(song1, distance);
    return [getSong(song1), song2AndPath[0], song2AndPath[1]];
  }

  function checkNeighbor(songNameA, songNameB) {
    const songLibrarby = songLibrarbyRef.current;
    const motifsLibrarby = motifsLibrarbyRef.current;
    if (!songLibrarby.has(songNameA) || !songLibrarby.has(songNameB)) {
      return false;
    }
    const songA = songLibrarby.get(songNameA);
    //check if song name is a neighbor to currentSong
    for (const motif of songA.motifs) {
      for (const song of motifsLibrarby.get(motif)) {
        if (songNameB == song) {
          return true;
        }
      }
    }
    return false;
  }

  useImperativeHandle(ref, () => ({
    initializeSongs,
    getSolution,
    findSongWithDistance,
    printSongList,
    getSongs,
    getSong,
    checkNeighbor,
  }));
});

export default SongManager;
