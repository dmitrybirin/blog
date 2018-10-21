---
date: "2018-10-21"
title: "Always think about async"
category: "Codectober"
---

Today will be small one.

Node 10 has great support of es9 `for await ... of`, so you can do async loops without all the hassle:

```javascript
	for await (const query of queryArray) {
		try {
			this.query(query)
		} catch (err) {
			this.rollback()
			throw err
		}
	}
```

Also I've refactored transactions, because rollback didn't work:
```javascript
class Database {
	constructor({ host, user, password }) {
		this.connection = mysql.createConnection({ host, user, password })
		this.connection.connect(async err => {
				...
		})
	}

	beginTransaction() {
		return new Promise((res, rej) =>
			this.connection.beginTransaction(err => {
				console.log('Begin transaction')
				if (err) rej(err)
				else res()
			})
		)
	}

	rollback() {
		console.log('Rollback...')
		this.connection.rollback()
	}

	commit() {
		console.log('Commiting...')
		return new Promise((res, rej) =>
			this.connection.commit(err => {
				if (err) rej(err)
				else res()
			})
		)
	}

	...

	query(query) {
		return new Promise((res, rej) => {
			this.connection.query(query, (err, results) => {
				if (err) rej(err)
				else res(results)
			})
		})
	}

	async transaction(queryArray) {
		try {
			await this.beginTransaction()
			for await (const query of queryArray) {
				try {
					this.query(query)
				} catch (err) {
					this.rollback()
					throw err
				}
			}
			await this.commit()
		} catch (err) {
			this.rollback()
			throw err
		}
	}
}

```

[Source Code still there](https://github.com/dmitrybirin/cofferver)