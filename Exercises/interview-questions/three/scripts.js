const testStrings = [
    "code",
    "hello",
    "world",
    "a",
    "",
    "mirror",
    "JavaScript",
    "madam",
    "12345",
    "racecar",
    "openAI",
    "test!",
    "space test",
    "AaBb",
    "mirror123"
];

function mirror(strings) {
    strings.forEach(string => {
        let rev = "";
        console.log(string);
        for (let i = string.length - 1; i >= 0; i--) {
            rev = rev.concat(string[i]);
        }
        string = string.concat(rev);
        console.log(string);
    });

}

mirror(testStrings)