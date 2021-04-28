const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    user_name: String,
    user_occupation: String,
    user_description: String,
    titles: [
      {
        title_name: String,
        is_link: Boolean,
        redirection_url: String,
      },
    ],
    birth_details: {
      birth_date: Date,
      place_of_birth: {
        city: String,
        state: String,
        country: String,
      },
      // required: true,
    },
    social_media_profiles: [
      {
        logo_url: String,
        media_name: String,
        redirection_url: String,
      },
    ],
    quotes: [],
    height_in_cm: Number,
    net_worth_in_usd: Number,
    education_details: [
      {
        name: String,
        from: Number,
        to: Number,
        is_link: Boolean,
        redirection_url: String,
      },
    ],
    // spouse_details: [
    //   {
    //     name: String,
    //     from: Number,
    //     to: Number,
    //     is_link: Boolean,
    //     redirection_url: String,
    //   },
    // ],
    // children_details: [
    //   {
    //     name: String,
    //     age: Number,
    //     is_link: Boolean,
    //     redirection_url: String,
    //   },
    // ],
    books: [
      {
        name: String,
        release_year: Number,
        cover_img_url: String,
        is_link: Boolean,
        redirection_url: String,
      },
    ],
    others: [
      {
        title: String,
        answers: [
          {
            title: String,
            is_link: Boolean,
            redirection_url: String,
            extra_data: {
              short_desc_key: String,
              value: String,
            },
          },
        ],
      },
    ],
  }
  //   { strict: false }
);

module.exports = mongoose.model("users", userSchema);
