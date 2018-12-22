## REST API using Node

Simple implementation of REST API using Node and Express.

**_Mongodb need to be properly setup on your machine, before cloning and running the app_**

### Usage

- `git clone https://github.com/PrashantKuntala/restNode.git`
- `npm install`
- `npm start`

### API Details

| Endpoint      | Supported HTTP Verbs     | Description                         |
|---------------|--------------------------|-------------------------------------|
|`/samples`     | GET                      | Retrieve all the public samples. |
|`/samples/{proteinName}`| GET             | Retrieve sample using proteinName.  |
|`/reviewSamples`| GET            | Retrieve all samples, both private & public.  |
|`/reviewSamples`| POST               | Submit all samples.  | 
|`/reviewSamples/{proteinName}`| GET             | Retrieve sample using proteinName.  |    
|`/reviewSamples/{sampleId}`| POST             | Submit sample using sampleId.  | 
|`/reviewSamples/{sampleId}`| PATCH             | Used to make a sample public.  | 
|`/reviewSamples/{sampleId}`| DELETE             | Delete a sample using sampleId.  | 

- Updating samples using the `PATCH` request need to be in this format

```
[
	{"propName": "assayType","value" : "ChIP-seq"},
	{"propName": "standardGeneName","value" : "SSL1"},
	{"propName": "isPublic","value" : true}
]
```

- Adding samples using the `POST` request need to be in this format

> By default the samples are not public, use `PATCH` to make them public after review

```
{
	"sampleId" : 12467,
	"featureName" : "YBR049C",
	"sgdId" : "S000000253",
	"peaks" : "825",
	"assayType" : "ChIP-exo",
	"alias" : "DNA-binding protein REB1 , GRF2",
	"dedupUniquelyMappedReads" : "4,054,207",
	"mappedReads" : "9,222,445",
	"genome" : "sacCer3_cegr",
	"motifCount" : 3,
	"uniquelyMappedReads" : "7,625,466",
	"epitopeTag" : "Confirmed",
	"featureType" : "ORF",
	"description" : "RNA polymerase I enhancer binding protein; DNA binding protein that binds to genes transcribed by both RNA polymerase I and RNA polymerase II; required for termination of RNA polymerase I transcription; Reb1p bound to DNA acts to block RNA polymerase II readthrough transcription",
	"dedupPercent" : "41.3%",
	"totalReads" : "9,816,007",
	"commonName" : "Reb1",
	"treatments" : "Normal",
	"featureQualifier" : "Verified",
	"mappedPercent" : "94.0%",
	"uniquelyMappedPercent" : "77.7%",
	"growthMedia" : "YPD",
	"standardGeneName" : "REB1",
	"runId" : 231,
	"antibody" : "i5006",
    "isMergedReplicate" : false,
    "codingImages": [{"url":"http://pluto.vmhost.psu.edu:8080/data/BoundFeatures/12467_Reb1_Bound_Features.png","type":"boundFeatures","category":"chexmix"},
    {"url":"http://pluto.vmhost.psu.edu:8080/data/BoundFeatures/12467_Reb1_All_Features.png","region":"allFeatures","category":"chexmix"},
     {"url":"http://pluto.vmhost.psu.edu:8080/data/NFR/12467_Reb1_NFR_Heatmap.png","region":"NFR_heatmap","category":"chexmix"},
     {"url":"http://pluto.vmhost.psu.edu:8080/data/NFR/12467_Reb1_NFR_Composite.png","region":"NFR_composite","category":"chexmix"}],
    "nonCodingImages": [
        {"url":"http://pluto.vmhost.psu.edu:8080/data/CUT/12467_Reb1_CUT_Heatmap.png","region":"cut","category":"chexmix"},
        {"url":"http://pluto.vmhost.psu.edu:8080/data/SUT/12467_Reb1_SUT_Heatmap.png","region":"sut","category":"chexmix"},
        {"url":"http://pluto.vmhost.psu.edu:8080/data/XUT/12467_Reb1_XUT_Heatmap.png","region":"xut","category":"chexmix"}
    ],
     "motifImages": [
 {"url":"http://pluto.vmhost.psu.edu:8080/data/Meme/12467_Reb1_memelogos/logo1.png","region":"logoforward","category":"Motif1"},
 {"url":"http://pluto.vmhost.psu.edu:8080/data/Meme/12467_Reb1_memelogos/logo_rc1.png","region":"logoreverse","category":"Motif1"},
  {"url":"http://pluto.vmhost.psu.edu:8080/data/Meme/12467_Reb1_Motif_1_fourcolor.png","region":"fourcolor","category":"Motif1"},
   {"url":"http://pluto.vmhost.psu.edu:8080/data/Meme/12467_Reb1_Motif_1_composite.png","region":"composite","category":"Motif1"},
    {"url":"http://pluto.vmhost.psu.edu:8080/data/Meme/12467_Reb1_Motif_1_Heatmap.png","region":"heatmap","category":"Motif1"}
     ]
}

```

### Packages Used

- express
- body-parser
- morgan
- mongoose

**_go to npmjs.com for more details on the above packages_**
