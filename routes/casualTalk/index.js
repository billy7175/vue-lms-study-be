const express = require("express");
const router = express.Router();
const { CasualTalk, SubCasualTalk } = require("../../schemas/casualTalk");
const { requireSignin } = require("../../middlewares/auth");
const _ = require("lodash");

const comments = [
  {
    _id: "c1",
    parentId: null,
    name: "Alexander Koghuashvili",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
    createdDate: new Date(),
    comment:
      "Wonderful work and create presentation. I'll be very happy if you also see my projects.",
  },
  {
    _id: "c2",
    parentId: null,
    name: "Thomas Shelby",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
    createdDate: new Date(),
    comment: "There is time, when my emotioanal minds conflict each other.",
  },
];

const subComments = [
  {
    parentId: "c1",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png",
    createdDate: new Date(),
    comment: "I don't think, that is the problem!",
  },
  {
    parentId: "c2",
    name: "Thomas Shelby",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png",
    createdDate: new Date(),
    comment: "Serously, what are you talking about ????",
  },
  {
    parentId: "c2",
    name: "Sherlock Homles",
    createdDate: new Date(),
    comment: "what are you guys fighting for ?? lol",
  },
  {
    parentId: "c2",
    name: "Nobody",
    imageUrl:
      "https://cdn.pixabay.com/photo/2020/06/04/12/55/emoji-5258611_640.png",
    createdDate: new Date(),
    comment:
      "just let them fight lololololololololololololololololololololololol",
  },
];

const subCommentsGrouped = _.groupBy(subComments, "parentId");

comments.forEach((comment) => {
  comment.subComments = _.get(subCommentsGrouped, comment._id, []);
});

console.dir(comments);

router.get("/api/casualtalks", requireSignin, async (req, res) => {
  const perPage = 5
  const page = parseInt(req.query.page) || 1
  console.log('#page', req.query)
  console.log('#page', page)

  try {
    const items = await CasualTalk.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "name email", // Select the fields you want to populate for main comments
      })
      .populate({
        path: "subComments",
        model: "SubCasualTalk", // Reference to the SubCasualTalk model
        select: "createdAt updatedAt comment user", // Adjust the fields you want to include from SubComments
        populate: {
          path: "user",
          model: "User", // Assuming "User" is your user model
          select: "name email",
        },
      })
      .limit(perPage)
      .skip((page - 1) * perPage)
    console.log("#casual");
    console.log(items);

    return res.status(200).send(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/casualtalks", async (req, res) => {
  try {
    const { user, comment } = req.body;
    const populatedCasualTalk = await CasualTalk.create({ user, comment }).then(
      (casualTalk) =>
        CasualTalk.populate(casualTalk, {
          path: "user",
          select: "email username",
        })
    );

    res.status(201).json(populatedCasualTalk);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/api/casualtalks-sub", async (req, res) => {
  try {
    const { user, comment, parentId } = req.body;
    const subComment = await SubCasualTalk.create({ user, comment, parentId });
    await CasualTalk.findByIdAndUpdate(parentId, {
      $push: { subComments: subComment._id },
    });
    res.status(201).json(subComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete('/api/casualtalks-sub/:id', async (req,res) => {
  try {
    // req.params.id에 해당하는 CasualTalk를 찾아 삭제합니다.
    const deletedItem = await SubCasualTalk.findByIdAndDelete(req.params.id);
    console.log('#deletedItem')
    console.log(deletedItem)

    // 성공적인 삭제 후 응답을 클라이언트에게 전송합니다.
    res.status(200).send(deletedItem);
  } catch (error) {
    // 오류가 발생한 경우 오류 메시지를 클라이언트에게 전송합니다.
    res.status(500).json({ error: '서버 오류 - CasualTalk 삭제에 실패했습니다.' });
  }
})

router.delete('/api/casualtalks/:id', async (req, res) => {
  try {
    // req.params.id에 해당하는 CasualTalk를 찾아 삭제합니다.
    const deletedItem = await CasualTalk.findByIdAndDelete(req.params.id);
    console.log('#deletedItem')
    console.log(deletedItem)
    
    // 성공적인 삭제 후 응답을 클라이언트에게 전송합니다.
    res.status(200).send(deletedItem);
  } catch (error) {
    // 오류가 발생한 경우 오류 메시지를 클라이언트에게 전송합니다.
    res.status(500).json({ error: '서버 오류 - CasualTalk 삭제에 실패했습니다.' });
  }
});

module.exports = router;
