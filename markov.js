/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    //an object to put everything in

    const chain = {};
    const words = this.words;
    //putting the word into the object
    for (let i = 0; i < words.length; i++) {
      //check if the word is in the chain obj
      if (words[i] in chain) {
        //if in chain, check if the next word is in the value array. if not, add the word in arr
        if (!chain[words[i]].includes(words[i + 1])) {
          chain[words[i]].push(words[i + 1]);
        }
      }
      //if the word is not in chain obj
      else {
        //if it's the last word, add an array with null
        if (words[i + 1] === undefined) {
          chain[words[i]] = [null];
        } else {
          //if it's not the last, add an array with the word next to it
          chain[words[i]] = [words[i + 1]];
        }
      }
    }
    return chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const chain = this.makeChains();
    let text = '';
    let word;
    let nextWordIdx;
    let previousWord;
    let i = 1;
    while (i <= numWords) {
      //if this is NOT the first word
      if (previousWord) {
        //look for the next word
        //generate random idx
        nextWordIdx = Math.floor(Math.random() * chain[previousWord].length);
        word = chain[previousWord][nextWordIdx];
        //if the arr of the next word is null, end this
        if (chain[previousWord][nextWordIdx] === null) {
          i = numWords;
        }
      //if this is the first word
      } else {
        //look for the word from keys
        const wordRandomIndex = Math.floor(Math.random() * Object.keys(chain).length);
        word = Object.keys(chain)[wordRandomIndex]
      }
      //set that word to text
      if(word !== null){
        text += ` ${word}`;
      }
      previousWord = word;
      i++;
    };
    return text.trim();

  }
}

//export
module.exports = {
  MarkovMachine: MarkovMachine
};