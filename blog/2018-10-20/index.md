---
date: "2018-10-19"
title: "Graceful connection"
category: "Codectober"
---

Yesterday I've got a problem with waiting for database to init prior my server start to failing to connect.

I wanted to do it simply with the [`wait-for-it.sh`](https://github.com/vishnubob/wait-for-it) or even try to use stack with healthchecks, but then interesting thought came to me: maybe my server, that is application regarding to database, shouldn't be failing so easily.

So, here is the 'graceful connection' to the database, that trying a lot prior failing


```javascript
const mysql = require("mysql");

const host = process.env.DB_HOST || "mysql";

const connection = mysql.createConnection({
  host: host,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

const sleep = time => new Promise(res => setTimeout(res, time));

const attempts = 10;

connection.connect(async err => {
  let count = 0;
  while (err && count < attempts) {
    count++
    console.error("error connecting: " + err.stack);
    console.log('Waiting... ', +new Date())
    await sleep(1000);
  }
  if (err) {
    console.error("Failed to connect to the database host: ", host);
    process.exit(1);
    return;
  } else {
    return connection;
  }
});

module.exports = connection;
```

the code is not ideal, but it giving the idea

Also, writing in the database is not so easy, as it seems.
The most popular library for mysql using callbacks, and promisify (for saving the day!) somehow failing it...

For now it's looks like `meh`:
```javascript
const db = require('./index')

const addCoffee = async (coffee) => {
  //that's a nightmare
	const keys = Object.keys(coffee.wheel).map(taste => taste.replace('/','_').replace(' ','_')).join(', ')
	const values = Object.values(coffee.wheel).join(', ')

  	// need to use it somehow different
    db.query(`USE coffee;`, (err, result) => {
      if (err) { throw err }
      else {
        console.log(result)
      }
    })

		// TODO promisify
		db.query(`INSERT INTO wheels (${keys}) VALUES (${values});`, (err, result) => {
			if (err) {return db.rollback(() =>{ throw err })} 
		})

		console.log('Success!');
}

module.exports = {
	addCoffee
}
```

So tomorrow, I should get working endpoint that dealing with database and then put my eyes to graphql side:)

[Source Code](https://github.com/dmitrybirin/cofferver)