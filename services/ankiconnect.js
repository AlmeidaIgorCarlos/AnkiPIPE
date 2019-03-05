const request = require('request')

function setCards(cards) {
    const tempCards = [];

    cards.forEach((card) => {
        tempCards.push({
            deckName: 'English deck',
            modelName: "Basic",
            fields: {
                Front: card.sentence,
                Back: `${card.pronunciation}</br></br>${card.definition}</br></br><sub>${card.example}</sub>`
            },
            options: {
                allowDuplicate: true
            },
            tags: [
            ]
        });

    });
    return tempCards;
}

module.exports = {
    postAnkiCards: (cards) =>{
        request.post({
            body: {
                action: "addNotes",
                version: 6,
                params: {
                    notes: setCards(cards)
                }
            },
            url: 'http://127.0.0.1:8765',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Postman-Token': 'bb798423-2e03-4a1a-9463-f01ee6be8a06'
            },
            json: true
        })
    },
    getAnkiCards: () => new Promise((resolve, reject) => {
        request.post({
            body:{
                "action": "findCards",
                "version": 6,
                "params": {
                    "query": 'deck:current'
                }
            },
            url: 'http://127.0.0.1:8765',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Postman-Token': 'bb798423-2e03-4a1a-9463-f01ee6be8a06'
            },
            json: true
        }, (err, res, body)=>{
            if(err || res.statusCode != 200) reject("Anki's connection failed")
            else resolve(JSON.stringify(body))
        })
    }),
    count: (data) => JSON.parse(data).result.length  
}