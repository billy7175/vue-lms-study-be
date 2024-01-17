const VocabularySheet = require('../../schemas/vocabularySheet')

async function getVocabularySheets(req, res) {
    const allSheets = await VocabularySheet.aggregate([
        // {
        //     $match : {
        //         title : '바로 읽는 배경지식 독해 LEVEL 1'
        //     }
        // },
        // { $limit: 1 },
        {
            $lookup: {
                from: "users",
                localField: 'register',
                foreignField: "_id",
                as: "register"
            },
        },
        { // register 속성에 대해서 배열이 아닌 객체로 반환
            $addFields: {
                register: { $arrayElemAt: ["$register", 0] }  // Take the first element if the array is not empty
            }
        },
        
    ])
    return res.send(allSheets)
}


async function createVocabularySheet(req, res) {
    console.log('#createVocabularySheet')
    console.log(req.body)
    try {
        const requestBody = req.body
        const newItem = await VocabularySheet.create(requestBody)
        return res.json(newItem)
    } catch (error) {
        console.log('#Error: createVocabularySheet')
        console.log(error)
        return res.status(400).send({
            code: 'VS001', // VS => Vocabuarry Sheet
            message: 'Please contact the administrator'
        })
    }
}

async function getVocabularyById (req, res){
    console.log('#getVocabularyById', req.params.id)
    const id = req.params.id
    const found = await VocabularySheet.findOne({ _id : id}).exec()
    console.log('#found', found)
    if(found){
        return res.send(found)
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

module.exports = {
    getVocabularySheets,
    createVocabularySheet,
    getVocabularyById
}