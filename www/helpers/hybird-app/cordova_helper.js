cordoba_helper = {
    b64toBlob: function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    },

    /**
     * @author https://stackoverflow.com/a/13252184
     * @returns {Boolean}
     */
    isPhoneGap: function () {
        return (window.cordova || window.PhoneGap || window.phonegap)
                && /^file:\/{3}[^\/]/i.test(window.location.href)
                && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    },
    write_file: function (_filename, _content, _mime, _callback) {
        var _this = this;
        window.requestFileSystem(window.TEMPORARY, 0, function (fs) {
            //alert('file system open: ' + fs.name);
            //alert('file system open: ' + cordova.file.cacheDirectory);
            fs.root.getFile(_filename, {create: true, exclusive: false}, function (fileEntry) {
                // Create a FileWriter object for our FileEntry (log.txt).
                fileEntry.createWriter(function (fileWriter) {

                    fileWriter.onwriteend = function () {
                        //alert("Successful file read..." + "cdvfile://localhost/temporary/" + _filename);
                        resolveLocalFileSystemURL("cdvfile://localhost/temporary/" + _filename, function (entry) {
                            var nativePath = entry.toURL();
                            //alert('Native URI: ' + nativePath);
                            //document.getElementById('video').src = nativePath;
                            _callback(nativePath);
                        });
                    };

                    fileWriter.onerror = function (e) {
                        alert("Failed file read: " + e.toString());
                    };
                    try {
                        var blob = _this.b64toBlob(_content, _mime);
                        fileWriter.write(blob);
                    } catch (e) {
                        alert(e);
                    }
                });
            });
        });
    }
};