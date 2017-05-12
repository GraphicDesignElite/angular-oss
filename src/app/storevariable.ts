var data =  
        {
        "query": "eva larue",
        "start": 0,
        "rows": 10,
        "lang": "ENGLISH",
        "operator": "OR",
        "collapsing": {
            "max": 2,
            "mode": "OFF",
            "type": "OPTIMIZED"
        },
        "returnedFields": [
            "url"
        ],
        "snippets": [
            {
                "field": "title",
                "tag": "b",
                "separator": "...",
                "maxSize": 200,
                "maxNumber": 1,
                "fragmenter": "SENTENCE"
            },
            {
                "field": "content",
                "tag": "b",
                "separator": "...",
                "maxSize": 200,
                "maxNumber": 1,
                "fragmenter": "SENTENCE"
            }
        ],
        "enableLog": false,
        "searchFields": [
            {
                "field": "title",
                "mode": "TERM_AND_PHRASE",
                "boost": 10
            },
            {
                "field": "content",
                "mode": "TERM_AND_PHRASE",
                "boost": 1
            },
            {
                "field": "titleExact",
                "mode": "TERM_AND_PHRASE",
                "boost": 10
            },
            {
                "field": "contentExact",
                "mode": "TERM_AND_PHRASE",
                "boost": 1
            }
        ]
    };