import Song from "./Song.jsx";
import SongList from "./SongList.jsx";
const SongNavigator = () => {
  const songLibrarby = new Map();
  const motifsLibrarby = new Map();

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

  initializeSongs();
  console.log(motifsLibrarby);
};

export default SongNavigator;
