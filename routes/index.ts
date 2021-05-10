var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
const {
  oneOf,
  buildCheckFunction,
  validationResult,
} = require("express-validator");
const checkQuery = buildCheckFunction(["query"]);

/* GET home page. */
router.get("/", function (req: any, res: any, next: any) {
  res.render("index", { title: "Express" });
});

router.get(
  "/wiki-search",
  checkQuery(["search"]).exists(),
  async (req: any, res: any, next: any) => {
    try {
      validationResult(req).throw();
      const { search, ga } = req.query;
      const users = await User[ga ? "find" : "findOne"]?.({
        user_name: { $regex: search },
      });
      res.send(users);
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

router.get(
  "/get-user",
  checkQuery("user_id").isMongoId(),
  async (req: any, res: any, next: any) => {
    try {
      validationResult(req).throw();
      const { user_id } = req.query;
      const user = await User.findOne({ _id: user_id });
      res.send(user);
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

router.get("/add-user", async (req: any, res: any, next: any) => {
  const user = new User({
    user_name: "Tirth Patel",
    user_occupation: "Learner",
    user_description: "This is me",
    titles: [
      {
        title_name: "Wow....",
        is_link: false,
        redirection_url: "",
      },
    ],
    birth_details: {
      birth_date: new Date(),
      place_of_birth: {
        city: "Ahmedabad",
        state: "Gujarat",
        country: "India",
      },
    },
    social_media_profiles: [
      {
        logo_url: "https://www.instagram.com/logo",
        media_name: "Instagram",
        redirection_url: "https://instagram.com/tirrrth",
      },
    ],
    quotes: ["Quote 1", "Quote 2"],
    height_in_cm: 165,
    net_worth_in_usd: 100,
    education_details: [
      {
        name: "Silver Oak University",
        from: 2018,
        is_link: true,
        redirection_url: "",
      },
    ],
    books: [
      {
        name: "Who am I?",
        release_year: 2019,
        cover_img_url: "https://www.image.com/cover",
        is_link: true,
      },
    ],
    others: [
      {
        title: "Honours",
        answers: [
          {
            title: "Top 10 this",
            is_link: false,
            redirection_url: "",
            extra_data: {
              short_desc_key: "m.",
              value: "2018",
            },
          },
        ],
      },
    ],
  });

  // const user = new User({ ...req.body });
  try {
    const userRes = await user.save();
    res.json(userRes);
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;
