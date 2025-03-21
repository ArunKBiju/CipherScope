export default async function handler(req, res) {
  try {
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const response = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=1`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return res.status(404).json({ error: "Profile not found or restricted" });
    }

    const data = await response.json();
    const user = data.graphql?.user;

    if (!user) {
      return res.status(500).json({ error: "Failed to extract user data" });
    }

    res.status(200).json({
      username: user.username,
      fullName: user.full_name,
      profilePic: user.profile_pic_url_hd,
      bio: user.biography,
      email: user.business_email || null,
      phone: user.business_phone_number || null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data, Instagram may have restricted access" });
  }
}
