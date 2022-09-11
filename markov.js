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
        console.log('word in chain:', words[i]);
        //if in chain, check if the next word is in the value array. if not, add the word in arr
        if (!chain[words[i]].includes(words[i + 1])) {
          console.log('word adding newly:', words[i + 1]);
          chain[words[i]].push(words[i + 1]);
        }
      }
      //if the word is not in chain obj
      else {
        console.log('adding key in chain:', words[i])
        console.log('chain:', chain);
        //if it's the last word, add an array with null
        if (words[i + 1] === undefined) {
          chain[words[i]] = [null];
        } else {
          //if it's not the last, add an array with the word next to it
          chain[words[i]] = [words[i + 1]];
        }
      }
    }
    console.log('console', chain);
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
      console.log(`${i}th word`)
      //if this is NOT the first word
      if (previousWord) {
        console.log('previous word:', previousWord);
        //look for the next word
        //generate random idx
        nextWordIdx = Math.floor(Math.random() * chain[previousWord].length);
        word = chain[previousWord][nextWordIdx];
        console.log('next word:', word);
        //if the arr of the next word is null, end this
        if (chain[previousWord][nextWordIdx] === null) {
          i = numWords;
        }
      //if this is the first word
      } else {
        //look for the word from keys
        const wordRandomIndex = Math.floor(Math.random() * Object.keys(chain).length);
        word = Object.keys(chain)[wordRandomIndex]
        console.log('random key:', word);
      }
      //set that word to text
      if(word !== null){
        text += ` ${word}`;
      }
      previousWord = word;
      i++;
    };
    text.trim();
    console.log('text:', text);

  }
}

// let mm = new MarkovMachine("the cat in the hat");
// mm.makeChains();
// mm.makeText(numWords = 30);

//export
module.exports = {
  MarkovMachine: MarkovMachine
};