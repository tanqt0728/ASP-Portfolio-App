const mongoose = require("mongoose");
const slugify = require("slugify");

const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: {
        html: {
          type: String,
          default: "",
        },
        css: {
          type: String,
          default: "",
        },
        components: {
          type: String,
          default: "",
        },
        styles: {
          type: String,
          default: "",
        },
      },
      default: {},
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visibility: {
      type: String,
      enum: ["published", "unpublished"],
      default: "unpublished",
    },
  },
  {
    timestamps: true,
  }
);

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
