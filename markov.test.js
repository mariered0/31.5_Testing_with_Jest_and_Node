const { MarkovMachine } = require('./markov');


describe('MarkovMachine Class', function (){
    text = 'the cat in the hat is very happy'
    let mm = new MarkovMachine(text);
    
    test('words filters text into an array', function () {
        const textArr = text.split(' ');
        expect(mm.words).toEqual(textArr);
    })
    
    test('makeChains method', function() {
        const obj = {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": ["is"], "is":["very"], "very": ["happy"], "happy": [null]}
        expect(mm.makeChains()).toEqual(obj);
    })
})

