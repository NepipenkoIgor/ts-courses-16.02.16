
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
    user?: string;
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
        const arr = _.sortBy(body, (photo:IPhoto):string=>photo.title);
        for(let photo of arr) {
            content += `<div  class='image-box'>
            <img src='https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg' />
            <p><em>${photo.title || 'notitle'}</em></p>
            <p>${photo.user || 'nonamed'}</p>
            </div>`;
            this.imagesBox.innerHTML = content;
        }

        this.searchButton.disabled = false;
    }

    protected search(cb:(body:any)=>any):void {
        let text = this.input.value;
        let url = new Request(`${this.uri}method=${this.queryMethod}&
        api_key=${this.apiKey}&text=${text}&per_page=20&page=1&format=json&nojsoncallback=1`);
        this.getPhotos(url, cb);
    }

    protected getPhotos(input:string | Request, cb:(body:any)=>any) {
        this.searchButton.disabled = true;
        fetch(input)
            .then((response:Response):PromiseLike<any>=>{
                return response.json();
            // [AA]: как правильно определить data?
            }).then((data):PromiseLike<any>=>{
                const photos = data.photos.photo;
                const promiseArray = photos.map((photo:IPhoto):PromiseLike<any>=>{
                    let url = new Request(`${this.uri}method=flickr.people.getInfo&
                    api_key=${this.apiKey}&user_id=${photo.owner}&format=json&nojsoncallback=1`);
                    return fetch(url).then(res => {
                        return res.json();
                    });
                });
                const allPromises = Q.all(promiseArray).then((res:any):PromiseLike<any>=> {
                    return (photos.map((photo, index)=>{
                        return _.assign(photo, {user: res[index].person.realname ? res[index].person.realname._content : ''});
                    }));
                });
                return allPromises;
            }).then(cb);
    }
}