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
    //an object put everything in
    const chain = {};
    const words = this.words;
    //putting the word into the object
    for (let i = 0; i < words.length; i++){
      //check if the word is in the chain obj
      if(words[i] in chain){
        console.log('word in chain:', words[i]);
        //if in chain, check if the next word is in the value array. if not, add the word in arr
        if(!chain[words[i]].includes(words[i+1])){
        console.log('word adding newly:', words[i+1]);
        chain[words[i]].push(words[i+1]);
        }
      }
      
      else{
        console.log('adding key in chain:', words[i])
        console.log('chain:', chain);
        if(words[i+1] === undefined){
          chain[words[i]] = [null];
        }else{
        chain[words[i]] = [words[i+1]];
        }
    }
  }
      console.log('chain', chain);
    }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}

let mm = new MarkovMachine("the cat in the hat");
mm.makeChains();