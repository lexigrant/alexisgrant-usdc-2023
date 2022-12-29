/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * further hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    // added return guard for empty string 
    if (searchTerm === "") {
        return {
            "SearchTerm": "",
            "Results": []
        }
    }

    const searchResult = scannedTextObj.reduce((results, book) => {
        const contentWithSearchTerm = book.Content.filter(
            content => content.Text.includes(searchTerm)
        )
        return results.concat(contentWithSearchTerm.map(content => {
            return {
                "ISBN": book.ISBN,
                "Page": content.Page,
                "Line": content.Line
            }
        }))
    }, [])

    return {
        "SearchTerm": searchTerm,
        "Results": searchResult
    };
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian's"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// We can check if our search is case sensitive
const test3ExpectedOutput = {
    "SearchTerm": "The",
    "Results": [
        { ISBN: '9780000528531', Page: 31, Line: 8 }
    ]
}
const test3result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(test3ExpectedOutput) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", test3ExpectedOutput)
    console.log("Received:", test3result)
}

// We can check what happens if our search returns no matches
const test4ExpectedOutput = {
    "SearchTerm": "A word that's not there",
    "Results": [
    ]
}
const test4result = findSearchTermInBooks("A word that's not there", twentyLeaguesIn);
if (JSON.stringify(test4ExpectedOutput) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", test4ExpectedOutput)
    console.log("Received:", test4result)
}

// We can check to see if we get multiple results to our search 
const test5ExpectedOutput = {
    "SearchTerm": "and",
    "Results": [
        {
            ISBN: '9780000528531',
            Page: 31,
            Line: 9
        },
        {
            ISBN: '9780000528531',
            Page: 31,
            Line: 10
        }
    ]
}
const test5result = findSearchTermInBooks("and", twentyLeaguesIn);
if (test5result.Results.length == 2) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", test5ExpectedOutput.Results.length);
    console.log("Received:", test5result.Results.length);
}

// test for result when given multiple books and term contained within another word
const test6Input = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian's"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    },
    {
        "Title": "Lord of the Rings",
        "ISBN": "9780007136568",
        "Content": [
            {
                "Page": 200,
                "Line": 10,
                "Text": "One ring to rule them all"
            },
            {
                "Page": 20,
                "Line": 7,
                "Text": "A Wizard is never late, Frodo Baggins"
            },
            {
                "Page": 147,
                "Line": 20,
                "Text": "Even the smallest person can change the course of the future"
            }
        ]
    }
]

const test6ExpectedOutput = {
    "SearchTerm": "the",
    "Results": [
        {
            ISBN: '9780000528531',
            Page: 31,
            Line: 9
        },
        {
            ISBN: '9780007136568',
            Page: 200,
            Line: 10
        },
        {
            ISBN: '9780007136568',
            Page: 147,
            Line: 20
        }
    ]
}
const test6result = findSearchTermInBooks("the", test6Input);
if (JSON.stringify(test6ExpectedOutput) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", test6ExpectedOutput);
    console.log("Received:", test6result);
}
// test for when given no books
const test7Input = []

const test7ExpectedOutput = {
    "SearchTerm": "the",
    "Results": []
}

const test7result = findSearchTermInBooks("the", test7Input);
if (JSON.stringify(test7ExpectedOutput) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", test7ExpectedOutput);
    console.log("Received:", test7result);
}

// test for an empty search term 

const test8ExpectedOutput = {
    "SearchTerm": "",
    "Results": []
}

const test8result = findSearchTermInBooks("", twentyLeaguesIn);
if (JSON.stringify(test8ExpectedOutput) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", test8ExpectedOutput)
    console.log("Received:", test8result)
}


