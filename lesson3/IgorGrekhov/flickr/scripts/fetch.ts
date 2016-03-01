/**
 * Created by igor on 2/26/16.
 */

/// <reference path="../typings/tsd.d.ts" />
interface Headers {
    append:(name:string, value:string) => void;
    delete:(name:string) => void;
    getAll:(name:string) => string[];
    entries:() => {
        key:string,
        value:string
    }[];
}


interface Request {
    method:string;
    headers: string| Headers;
    mode:string;
    cache:string;
    redirect:any;
    clone:() => Request;
}
interface InitRequest {
    url:string;
}

declare var Request:{
    prototype:Request;
    new (input:string | Request, init?:InitRequest):Request;
};

interface Response {
    arrayBuffer:() => PromiseLike<ArrayBuffer>;
    blob:() => PromiseLike<Blob>;
    formData:() => PromiseLike<FormData>;
    json:() => PromiseLike<any>;
}

declare function fetch(input:string| Request):PromiseLike<Response>;

type opt = {
    elem:HTMLElement,
    uri:string,
    queryMethod:string,
    apiKey:string
}

interface IPhoto {
    farm:number;
    id:string;
    isfamily:string;
    isfriend:string;
    ispublic:number;
    owner:string;
    title:string;
    server:string;
    secret:string;
    username?:string;
}

class FlickrApp {
    protected elem:HTMLElement;
    protected uri:string;
    protected queryMethod:string;
    protected apiKey:string;
    protected input:HTMLInputElement;
    protected imagesBox:HTMLDivElement;
    protected searchButton:HTMLButtonElement;

    constructor(opt:opt) {
        let {elem, uri, queryMethod, apiKey} = opt;
        this.elem = elem;
        this.uri = uri;
        this.queryMethod = queryMethod;
        this.apiKey = apiKey;
        this.input = this.elem.querySelector('.flickr-search-input') as HTMLInputElement;
        this.imagesBox = this.elem.querySelector('.image-area') as HTMLDivElement;
        this.searchButton = this.elem.querySelector('.flickr-search-button') as HTMLButtonElement;
        this.searchButton.addEventListener('click', this.search.bind(this, this.render.bind(this)));
    }

    protected render(body:any):void {
        let content = ``;

        let sortedPhotos:IPhoto[] = _.sortBy(body.photos.photo as IPhoto[], ['title']);

        for (let photo of sortedPhotos) {
            content += `<div  class='image-box'>
            <img src='https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg' />
            <p>${photo.title}</p>
            <p><strong>${photo.username}</strong></p>
            </div>`;
        }
        this.imagesBox.innerHTML = content;
    }

    protected search(cb:(body:any) => any):void {
        let text = this.input.value;
        let url = new Request(`${this.uri}method=${this.queryMethod}&
        api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
        this.getPhotos(url, cb);
    }

    protected getPhotos(input:string| Request, cb:(body:any) => any) {
        fetch(input)
            .then((response:Response):PromiseLike<any> => {
                return response.json();
            }).then((result) => {
                let ownersRequests = [];

                for (var photo of result.photos.photo) {
                    ownersRequests.push(
                        new Promise((resolve, reject) =>
                            {
                                fetch(new Request(`${this.uri}method=flickr.people.getInfo&api_key=${this.apiKey}&user_id=${photo.owner}&format=json&nojsoncallback=1`))
                                    .then((response:Response):PromiseLike<any> => {
                                        return response.json();
                                    }).then((result) => {
                                        resolve(result.person.username._content);
                                    });
                            }));
                    }

                return Promise.all(ownersRequests).then((responses) => {
                    for (let i = 0; i < responses.length; i++) {
                        result.photos.photo[i].username = responses[i];
                    }

                    return result;
                });

            }).then(cb);
    }
}

let flickr = new FlickrApp({
    elem: document.querySelector('.flikr-box') as HTMLElement,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});

