import { addNewUser, findAllUser, findUser } from "../services/user.service.js";

export async function handleGetAllUser(req, res) {
  try {
    const user = await findAllUser();
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function handleSingInUser(req, res) {
  try {
    const { email } = req.params;
    const { password } = req.params;
    if (!email) {
      return res.status(400).json({
        message: "Email not found",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "password doesn't exist",
      });
    }
    // isabella.robertson@gmail.com/hotlips
    const user = await findUser(email, password);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist !!" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function handleNewUser(req, res) {
  try {
    const { nameFirst, nameLast, dobDate, email, locationCity, loginPassword } =
      req.body;

    if (
      !nameFirst ||
      !nameLast ||
      !dobDate ||
      !email ||
      !locationCity ||
      !loginPassword
    ) {
      return res.status(400).json({ message: "Tu merdes le couz recommance " });
    }

    const userUpdated = await addNewUser(
      nameFirst,
      nameLast,
      dobDate,
      email,
      locationCity,
      loginPassword,
    );

    if (!userUpdated) {
      return res
        .status(404)
        .json({ message: "Il exist pas ton putain de User  !" });
    }

    return res.status(200).json({ userUpdated });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
