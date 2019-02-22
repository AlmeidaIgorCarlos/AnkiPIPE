const configuracao = require('./../Arquivos/configuracao');
const request = require('request')

module.exports = {
    adicionar: (card) => new Promise((resolve, reject) => {
        let backPronuncia = "";
        let backDefinicao = "DEFINITIONS <br/>";
        let backExemplo = "EXAMPLES <br/>";

        card.pronuncia.forEach((data, index) => {
            backPronuncia += `${data.phoneticSpelling} <br/>`
        });

        card.definicao.forEach((data, index) => {
            backDefinicao += `${index + 1} - ${data.definitions} <br/>`
        });

        card.exemplos.forEach((data, index) => {
            backExemplo += `${index + 1} - ${data.text}<br/>`
        });

        request.post({
            body: {
                action: "addNote",
                version: 6,
                params: {
                    note: {
                        deckName: configuracao.AnkiConnect.deck,
                        modelName: "Basic",
                        fields: {
                            Front: card.frase,
                            Back: `${backPronuncia}</br></br>${backDefinicao}</br></br><sub>${backExemplo}</sub>`
                        },
                        options: {
                            allowDuplicate: true
                        },
                        tags: [
                        ]
                    }
                }
            },
            url: configuracao.AnkiConnect.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Postman-Token': 'bb798423-2e03-4a1a-9463-f01ee6be8a06'
            },
            json: true
        }, (err, res, body) => {
            if(err) reject(false);
            else resolve(true)
        });
    })
}