import GalleryItem from "../models/galleryItems.js";

//create gallery item
export function createGalleryItem (req, res) {
       const user = req.user
       if(user==null){
        res.status(403).json({
            message: "Please logged in to create a gallery item"
        })
        return
       }
       if(user.type !="admin"){
        res.status(403).json({
            message: "You do not have permission to create a gallery item"
        })
        return
       }

      

  const galleryItem = req.body.item;
  const newGalleryItem = new GalleryItem(galleryItem);
  newGalleryItem
    .save()
    .then(() => {
      res.json({
        message: "Gallery item created successfully",
        galleryItem: newGalleryItem,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error creating gallery item",
      });
    });
}
export function getGalleryItems(req,res){
    GalleryItem.find().then(
        (list)=>{
            res.json({
                list:list

            })
        }
    )
}

