---
date: "2018-10-20"
title: "Client and server are friends"
category: "Codectober"
---


Well, after a long trip in a bus and a lot of pints of beer, I'm surprising that I keeping me streak, but things are that they are:)

So, I manage to get my sql working, introducing the database class and manually wrapping the mysql node methods in Promises:

```javascript
const mysql = require('mysql')

const sleep = time => new Promise(res => setTimeout(res, time))

class Database {
	constructor({ host, user, password }) {
		this.connection = mysql.createConnection({ host, user, password })
		this.attempts = 10

		this.connection.connect(async err => {
			let count = 0
			while (err && count < attempts) {
				count++
				console.error('error connecting: ' + err.stack)
				console.log('Waiting... ', +new Date())
				await sleep(1000)
			}
			if (err) {
				console.error('Failed to connect to the database host: ', host)
				process.exit(1)
				return
			} else {
				return
			}
		})
	}

	rollback(err) {
		this.connection.rollback(() => Promise.reject(err))
	}

	async use() {
		await this.query(`USE coffee;`)
	}

	query(query, transaction = false) {
		return new Promise((res, rej) => {
			this.connection.query(query, (err, results) => {
				if (err) transaction ? this.rollback(err) : rej(err)
				else res(results)
			})
		})
	}

	async transaction(queryArray) {
		return new Promise((res, rej) => {
			this.connection.beginTransaction(err => {
				if (err) rej(err)
				queryArray.map(async query => await this.query(query, true))

				this.connection.commit(err => {
					if (err) this.rollback(err)
					res('success')
				})
			})
		})
	}
}
```

With it I can just running the code like this:
```javascript
	await db.transaction([
		`INSERT INTO wheels (${keys}) VALUES (${values});`,
		`INSERT INTO cups (title, date, description, wheel_id) VALUES (${
			coffee.cup.title ? coffee.cup.title : "''"
		}, NOW(),'',LAST_INSERT_ID());`,
	])
```

That's still ugly, but I'm going in the right direction.

Tomorrow will be working version in live and graphQL moving.

Have a nice day, everybody!

[Source Code still there](https://github.com/dmitrybirin/cofferver)