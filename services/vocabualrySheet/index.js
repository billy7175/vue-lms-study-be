const mongoose = require('mongoose')
const VocabularySheet = require('../../schemas/vocabularySheet')
const { findByIdAndUpdate } = require('../../schemas/users')

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

async function getVocabularyById(req, res) {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ObjectId format' });
        const found = await VocabularySheet.findOne({ _id: id }).exec()
        return res.send(found)
    } catch (error) {
        console.log('#error: getVocabularyById', error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



async function updateVocabularySheet(req, res) {
    const id = req.params.id
    const requestBody = req.body

    try {
        const updatedItem = await VocabularySheet.findByIdAndUpdate(id, requestBody, { new: true })
        if (!updatedItem) {
            return res.status(404).send({
                ok: false,
                error: "VocabularySheet not found"
            });
        }

        return res.send(updatedItem);
    } catch (error) {
        return res.status(500).send({
            ok: false,
            error: "Internal Server Error"
        });

    }
}




module.exports = {
    getVocabularySheets,
    getVocabularyById,
    createVocabularySheet,
    updateVocabularySheet
}