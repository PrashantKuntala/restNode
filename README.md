## REST API using Node
---

Simple implementation of REST API using Node and Express.

**_Mongodb need to be properly setup on your machine, before cloning and running the app_**

### Usage

- `git clone https://github.com/PrashantKuntala/restNode.git`
- `npm install`
- `npm start`

### API Details

| Endpoint      | Supported HTTP Verbs     | Description                         |
|---------------|--------------------------|-------------------------------------|
|`/samples`     | GET, POST                | Retrieve all the available samples. |
|`/samples/{id}`| GET, PATCH, DELETE       | Retrieve sample using sampleID.     |   


- Updating samples need to be in this format

```
[
	{"propName": "assayType","value" : "ChIP-seq"},
	{"propName": "sampleName","value" : "SSL1"}
]
```

### Packages Used

- express
- body-parser
- morgan
- mongoose

**_go to npmjs.com for more details on the above packages_**
