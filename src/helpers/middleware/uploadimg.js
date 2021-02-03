const multer = require('multer')
const path = require('path')

// setting diskStorage
const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `./public/img`)
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}${path.extname(file.originalname)}`) // ext originalname => img.png/img.jpg
  }
})

// setting conneting multer with storage
const multerUploadImg = multer({
  storage: multerStorage,
  limits: {fieldSize: 1*1024*1204}, //1byte*1000byte*1000byte = 1000.000 byte => 1000 Kb => 1 Mb
  // custom extension
  fileFilter: (req, file, callback) => {
    const typeExt = path.extname(file.originalname)
    if(typeExt === '.jpg' || typeExt === '.JPG' || typeExt === '.png' || typeExt === '.PNG') {
      callback(null, true)
    } else {
      callback({error: 'Wrong type extention!'}, false)
    }
  }
})

// make middleware
const singleUploadimg = (req, res, next) => {
  // process upload
  const multerSingle = multerUploadImg.single('image') // name file 
  multerSingle(req, res, (error) => {
    if(!error) {
      next()
    } else {
      // console.log(error)
      res.json({
        message: "Error Upload image!",
        error: error
      })
    }
  })
}

module.exports = singleUploadimg