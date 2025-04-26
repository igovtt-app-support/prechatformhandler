'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());   // creates http server
const token = 'M92d-M4FC55PufZ8erQOdLUUI!hx?rBU2qprZH=TmDafn7Mz';

// webhook check:
app.get('/', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401); // if not, return unauthorized error
    }

    // return challenge:
    return res.end(req.query.challenge);
});
//

// webhook endpoint:
app.post('/', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401); // if not, return unauthorized error
    }

    // print request body
    const jsonObj = req.body
    console.log(req.body);

    // extract question, name
    const reqQuestion = jsonObj.attributes.default_Pleasetypeyourquestionhere;
    const reqName = jsonObj.attributes.default_Name;

    // return a text response
    const data = {
        responses: [
            {
                type: "text",
                delay: 1000,
                message: `Hello!  Nice to meet you, ${reqName}!`
            }
        ],
        attributes: {
            question: `${reqQuestion}`
        }
    };

    res.json(data);
});
//

// last line of code:
app.listen(443, () => console.log('[ChatBot] Webhook is listening on port 443'));