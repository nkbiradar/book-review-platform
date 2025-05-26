const User = require('../models/User');

// GET /users/:id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id.trim(); // ✅ Trim to remove newline/space
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('❌ Get user error:', err);
    res.status(500).json({ error: 'Failed to fetch user', details: err.message });
  }
};


// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    console.log('🔧 Incoming update data:', req.body);

    const { name, email, profileImage } = req.body;

    // Build update object (avoid overwriting with undefined)
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (profileImage) updates.profileImage = profileImage;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    console.error('❌ Update user error:', err.message);
    res.status(400).json({ error: 'Failed to update user', details: err.message });
  }
};

module.exports = {
  getUserById,
  updateUser,
};
