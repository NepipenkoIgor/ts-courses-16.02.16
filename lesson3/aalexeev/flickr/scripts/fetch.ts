
/// <reference path="../typings/tsd.d.ts" />

interface Headers {
    append:(name:string, value:string)=>void;
    delete:(name:string)=>void;
    getAll:(name:string)=>string[];
    entries:()=>{
        key:string;
        value:string;
    }[]
}

interface Request {
    method:string;
    headers: string | Headers;
    mode: string;
    cache: string;
    redirect: any;
    clone:()=> Request;
}

interface InitRequest {
    url:string;
}


declare var Request:{
    prototype:Request;
    new (input:string | Request, init?:InitRequest):Request;
};

interface Response {
    arrayBuffer:()=>PromiseLike<ArrayBuffer>;
    blob:()=>PromiseLike<Blob>;
    formData:()=>PromiseLike<FormData>;
    json:() => PromiseLike<any>;
}

declare function fetch(input:string| Request):PromiseLike<Response>;

type opt = {
    elem: HTMLElement,
    uri: string,
    queryMethod: string,
    apiKey: string
}

interface IPhoto {
    farm: number;
    id: string;
    isfamily: string;
    isfriend: string;
    ispublic: number;
    owner: string;
    title: string;
    server: string;
    secret: string;
}

export class FlickrApp {
    protected elem: HTMLElement;
    protected uri: string;
    protected queryMethod: string;
    protected apiKey: string;
    protected input: HTMLInputElement;
    protected imagesBox: HTMLDivElement;
    protected searchButton: HTMLButtonElement;

    constructor(opt: opt) {
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
        console.log(body.photos.photo);
        for(let photo of body.photos.photo) {
            content += `<div  class='image-box'>
            <img src='https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg' />
            <p>${photo.title}</p>
            </div>`;
            this.imagesBox.innerHTML = content;
        }
    }

    protected search(cb:(body:any)=>any):void {
        let text = this.input.value;
        let url = new Request(`${this.uri}method=${this.queryMethod}&
        api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
        this.getPhotos(url, cb);
    }

    protected getPhotos(input:string | Request, cb:(body:any)=>any) {
        fetch(input)
            .then((response:Response):PromiseLike<any>=>{
            return response.json()
        }).then(cb);
    }
}