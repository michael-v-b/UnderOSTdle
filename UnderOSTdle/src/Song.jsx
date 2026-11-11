/**
 * @param {string} name - The name of the song.
 * @param {string[]} motifs - The motifs present in the song.
 */
class Song {
  constructor(name, motifs, url, game) {
    this.name = name;
    this.motifs = motifs;
    this.visited = false;
    this.distance = 0;
    this.url = url;
    this.game = game;
  }
}

export default Song;
