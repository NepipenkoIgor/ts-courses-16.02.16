/**
 * Created by igor on 2/26/16.
 */

import flickrMod = require('./fetch');

let flickr = new flickrMod.FlickrApp({
    elem: document.querySelector('.flikr-box') as HTMLElement,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});