const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'files') {
      cb(null, 'public_html/assets');
    }
    if (file.fieldname === 'zip') {
      cb(null, 'public_html/zip');
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'files') {
      cb(null, Date.now() + '.jpg');
    }
    if (file.fieldname === 'zip') {
      cb(null, file.originalname);
    }
  },
});

exports.upload = multer({ storage: storage });

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public_html/assets');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.jpg');
  },
});

exports.updateImage = multer({ storage: storage2 }).array('fileUpdate', 10);

const storageZip = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public_html/zip');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.updateZip = multer({ storage: storageZip }).array('zipUpdate', 10);

exports.deleteImage = (req, res) => {
  const fileDelete = req.body.deleteFiles;
  console.log(fileDelete);
  fileDelete.map((f) => {
    fs.unlinkSync(`public_html/assets/${f}`);
  });
  res.status(200).json({ message: 'success' });
};

exports.deleteZip = (req, res) => {
  const zipDelete = req.body.deleteZip;
  console.log(zipDelete);
  zipDelete.map((z) => {
    fs.unlinkSync(`public_html/zip/${z}`);
  });
  res.status(200).json({ message: 'success' });
};
