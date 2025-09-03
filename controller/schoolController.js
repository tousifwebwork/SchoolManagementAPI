const School = require("../models/scholl");

// Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}




exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields required" });
    }
    const school = new School({ name, address, latitude, longitude });
    await school.save();
    res.status(201).json({ message: "School added", school });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.listSchools = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "lat and lng required" });
    }
    const schools = await School.find();
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    const sorted = schools
      .map((s) => ({
        ...s._doc,
        distance: calculateDistance(userLat, userLng, s.latitude, s.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
