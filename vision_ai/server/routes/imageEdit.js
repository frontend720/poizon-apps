const {openai} = require("../config")


openai.chat.completions.create({

}).then((data) => {
    console.log(data.choices)
})