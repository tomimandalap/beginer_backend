const multer = require('multer')
const path = require('path')
const limitFile = 1 // Megabyte

const { notAllowed, failed, large, notAcceptable } = require('../response')

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
  limits: {
    fileSize: limitFile * 1024 * 1024 // MegaByte(s)
  },
  // custom extension
  fileFilter: (req, file, callback) => {
    const typeExt = path.extname(file.originalname)
    if(typeExt === '.jpg' || typeExt === '.JPG' || typeExt === '.png' || typeExt === '.PNG') {
      callback(null, true)
    } else {
      callback({
        error: 'Wrong type extention! Please upload like png/PNG/jpg/JPG.',
        code: 'typeExtWrong'
      }, false)
    }
  }
})

// make middleware
const singleUploadimg = (req, res, next) => {
  // process upload
  const multerSingle = multerUploadImg.single('image') // name file 
  if(multerSingle) {
    multerSingle(req, res, (error) => {
      if (error) {
        // console.log(error)
        if (error.code === 'LIMIT_FILE_SIZE') {
          return large(res, `File size exceeds the ${limitFile} Mb limit`)
        } else if(error.code === 'typeExtWrong') {
          return notAcceptable(res, 'Wrong type extention! Please upload like png/PNG/jpg/JPG.')
        } else {
          return failed(res, 'Internal server error!', [])
        }
      } else {
        if (!req.file) {
          // jika file kosong
          return notAllowed(res, 'Please select an image to upload', [])
        } else {
          next()
        }
      }
    })
  } else {
    next()
  }
}

module.exports = singleUploadimg