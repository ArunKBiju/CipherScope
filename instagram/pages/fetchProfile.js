export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await fetch(
      `https://www.instagram.com/${username}/?__a=1&__d=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    const user = data.graphql?.user;

    res.status(200).json({
      username: user.username,
      fullName: user.full_name,
      profilePic: user.profile_pic_url_hd,
      bio: user.biography,
      email: user.business_email || null,
      phone: user.business_phone_number || null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
