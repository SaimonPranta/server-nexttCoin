const nameConverter = (string = "") => {
    const stringArray = string.split(" ")
    const array = []
    stringArray.map(word => {
        const newWord = word.charAt(0).toUpperCase() + word.slice(1);
        array.push(newWord)
    })
    return array.join(" ")
}

module.exports = nameConverter;



