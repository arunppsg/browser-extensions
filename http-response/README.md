# Logging HTTP Response

Logs HTTP Response to a file in the local machine.

The extension uses webRequest API of javascript to listen for
HTTP request events. Using it, we log each requests properties
like their MIME type, response etc. A challenge is that browsers
cannot export data to system filestorage. See:
https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
https://stackoverflow.com/questions/27177661/save-html-locally-with-javascript

[IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) of
firefox can also be used to store the data.
