const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const PORT = 5000;

let users = [];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/api/users', async (_req, res) => {
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  req.body.id = Date.now().toString(24);
  users.push(req.body);
  res.statusCode(201).json(req.body);
});

app.patch('/api/users/:id', async (req, res) => {
  users = users.map(user => user.id === req.params.id ? {
    ...user,
    ...req.body
  }: user)
  res.sendStatus(200);
});

app.delete('/api/users/:id', async (req, res) => {
  users = users.filter(user => user.id === req.params.id);
  res.sendStatus(200);
});

app.use('/', express.static(path.resolve(__dirname, '../build')));
app.get('/*', (_req, res) =>
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
);

async function getInitialUsers() {
  let firstNames = await getRandomApi('Name?nameType=firstname&quantity=51');
  let allSurnames = await getRandomApi('Name?nameType=surname&quantity=101');
  analysts = await getRandomApi('Name?nameType=fullname&quantity=31');
  for (let i = 0; i < 10; i++) {
    let firstName = firstNames[Math.round(Math.random() * 50)];
    let surnames = [
      allSurnames[Math.round(Math.random() * 100)],
      allSurnames[Math.round(Math.random() * 100)],
    ];
    let cardInfo = await getRandomApi('Card');
    cardInfo.fullName = `${firstName}${middleName ? ' '+ middleName: ''} ${surnames.join(' ')}`;
    ///*
    users.push({
      id: (Date.now() + i).toString(24),
      email: (`${firstName}.${surnames[0]}.${surnames[1]}@example.com`).toLowerCase(),
      phone: (
        await getRandomApi('Phone/Generate?CountryCode=mx&Quantity=1')
      )[0],
      firstName,
      middleName: Math.round(Math.random())
        ? firstNames[Math.round(Math.random() * 50)]
        : '',
      surnames: surnames.join(' '),
      birthday: new Date(
        Date.now() - Math.round(Math.random() * 630720000000 + 567648000000)
      ),
      status: Math.round(Math.random() * 2 + 1),
      analyst: analysts[Math.round(Math.random() * 30)],
      cardInfo,
    });
    //*/
  }
}

async function getRandomApi(collection) {
  let response = await axios.get(`https://randommer.io/api/${collection}`, {
    headers: {
      'X-Api-Key': 'f3b80c8d2c6a478e89445e919e625fff',
    },
  });
  return response.data;
}

getInitialUsers()
  .catch((err) => console.log(err));
