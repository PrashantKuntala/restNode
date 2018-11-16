#### REST API using Node
---

Simple implementation of REST API using Node and Express

> **Mongodb need to be properly setup on your machine, before cloning and running the app**

#### Usage
---

- `git clone https://github.com/PrashantKuntala/restNode.git`
- `npm install`
- `npm start`

#### API Details
---
| Endpoint      | Supported HTTP Verbs     | Description                         |
|---------------|--------------------------|-------------------------------------|
|`/samples`     | GET, POST                | Retrieve all the available samples. |
|`/samples/{id}`| GET, POST, PATCH, DELETE | Retrieve sample using sampleID.     |   

#### Package Info
---
- express
- body-parser
- morgan
- mongoose

> **go to npmjs.com for more details on the above packages**