if (typeof (PULI_UTILS) === "undefined") {
    PULI_UTILS = {};
}

/**
 * @author https://stackoverflow.com/a/46405969
 * @param {type} dataURI
 * @returns {Blob}
 */
PULI_UTILS.b64toFile = function (b64Data, filename, contentType) {
    var sliceSize = 512;
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
    var file = new File(byteArrays, filename, {type: contentType});
    return file;
};