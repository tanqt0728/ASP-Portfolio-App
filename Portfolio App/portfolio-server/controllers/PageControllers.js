const Page = require('../models/Page');

// Create a new page
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const page = new Page({ name });
    const savedPage = await page.save();
    res.status(201).json(savedPage);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing page
exports.update = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { name } = req.body;
    const updatedPage = await Page.findByIdAndUpdate(pageId, { name }, { new: true });
    if (!updatedPage) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a page
exports.deletePageRecord = async (req, res) => {
  try {
    const { pageId } = req.params;
    const deletedPage = await Page.findByIdAndDelete(pageId);
    if (!deletedPage) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(deletedPage);
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
    const updatedPage = await Page.findByIdAndUpdate(pageId, { content }, { new: true });
    if (!updatedPage) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(updatedPage);
  } catch (error) {
    console.error('Error changing page content:', error);
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
