const mongoose = require('mongoose');
const slugify = require('slugify');

const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: String,
      default: '', // You can change this default value based on your requirements
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to generate slug before saving
pageSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
