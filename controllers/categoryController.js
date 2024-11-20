import Category from "../models/category.js";

export function createCategory(req, res) {
  if (req.user == null) {
    res.status(401).send({
      message: "Unaythorized",
    });
    return;
  }
}
