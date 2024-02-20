const Page = require('../models/Page');
const slugify = require('slugify');


// Create a new page
exports.create = async (req, res) => {
  try {
    const { name, visibility, ownerId } = req.body; // Added visibility and ownerId

    if (!name || !ownerId) {
      return res.status(400).json({ error: 'Name and owner are required' });
    }
    const slug = slugify(name, { lower: true });  // Generate slug
    const page = new Page({
      name,
      slug,
      owner: ownerId,
      visibility: visibility || 'unpublished', 
    });

    const savedPage = await page.save();
    res.status(201).json(savedPage);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { name, html, css, components, styles, visibility,slug } = req.body;
    const userId = req.user.userId; // Get user ID from authenticated user

    // Find the page owned by the user
    const page = await Page.findOne({ _id: pageId, owner: userId });

    if (!page) {
      return res.status(404).json({ error: 'Page not found or you do not have permission' });
    }

    // Update fields if they are provided in the request
    if (name) page.name = name;
    if (html) page.html = html;
    if (css) page.css = css;
    if (components) page.components = components;
    if (styles) page.styles = styles;
    if (visibility) page.visibility = visibility;
    if (slug) page.slug = slug;
    // Save the updated page
    const updatedPage = await page.save();
    res.json(updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a page with ownership verification
exports.deletePageRecord = async (req, res) => {
  try {
    const { pageId } = req.params;
    const userId = req.userId; // Get user ID from authenticated user

    const page = await Page.findOneAndDelete({ _id: pageId, owner: userId });

    if (!page) {
      return res.status(404).json({ error: 'Page not found or you do not have permission' });
    }

    res.json({ message: 'Page successfully deleted', page });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get details of a specific page
exports.details = async (req, res) => {
  try {
    const { pageId } = req.params;
    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    console.error('Error getting page details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a list of all pages
exports.list = async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (error) {
    console.error('Error getting list of pages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Change content of a page
exports.changeContent = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    const page = await Page.findOne({ _id: pageId, owner: userId });
    if (!page) {
      return res.status(404).json({ error: 'Page not found or you do not have permission' });
    }

    page.content = content;
    await page.save();

    res.json(page);
  } catch (error) {
    console.error('Error changing page content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a user's page by user ID
exports.getPageByUserId = async (req, res) => {
  try {
    const userId = req.user.userId; 

    const page = await Page.findOne({ owner: userId });
    if (!page) {
      return res.status(404).json({ error: 'No page found for this user' });
    }

    res.json(page);
  } catch (error) {
    console.error('Error getting page by user ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a user's page by Slug
exports.getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params; 

    const page = await Page.findOne({ slug: slug, visibility: 'published' });

    if (!page) {
      return res.status(404).json({ error: 'Page not found or not published' });
    }

    res.json(page);
  } catch (error) {
    console.error('Error getting page by slug:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Load content of a page
exports.loadContent = async (req, res) => {
  try {
    const { pageId } = req.params;
    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json({ content: page.content });
  } catch (error) {
    console.error('Error loading page content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
