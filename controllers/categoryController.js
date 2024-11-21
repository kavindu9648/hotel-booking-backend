import Category from "../models/category.js";

export function createCategory(req, res) {
  if (req.user == null) {
    res.status(401).send({
      message: "Unaythorized",
    });
    return;
  }
  if (req.user.type != "admin") {
    res.status(401).send({
      message: "Forbiden",
    });
  }
  const newCategory = new Category(req.body);
  newCategory
    .save()
    .then((result) => {
      res.json({
        message: "created Successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Creation failed.",
        error: err,
      });
    });
}
