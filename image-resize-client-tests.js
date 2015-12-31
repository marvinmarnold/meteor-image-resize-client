Tinytest.addAsync('Image - Resize', function(test, done) {
  var originalImg, resizedImg, originalBlob
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", 'https://scontent-dfw1-1.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12346343_871489722946736_5400293110848611387_n.jpg?oh=420c4ce953952c93b6d282898dd1061d&oe=56DBA4F4', true); // true for asynchronous
  xmlHttp.responseType = 'blob';
  xmlHttp.onload = originalImgRetrieved
  xmlHttp.send();

  function originalImgRetrieved(error) {
    if (this.status == 200) {
      originalBlob = new Blob([this.response], {type: 'image/jpg'})
      originalBlob.name = 'blob.jpg'

      originalImg = document.createElement('img');
      originalImg.src = window.URL.createObjectURL(originalBlob);
      originalImg.onload = onOriginalImgLoaded

      document.body.appendChild(originalImg)
    }
  }

  function onOriginalImgLoaded() {
    Resizer.resize(originalBlob, {width: 300, height: 100, cropSquare: false}, function(err, file) {
      resizedImg = document.createElement('img');
      resizedImg.src = window.URL.createObjectURL(file);
      resizedImg.onload = onResizedImgLoaded

      document.body.appendChild(resizedImg)
    })
  }

  function onResizedImgLoaded() {
    test.isTrue(originalImg.height > resizedImg.height)
    test.equal(resizedImg.height, 300)
    test.equal(resizedImg.width, 300)

    done()
  }
})
