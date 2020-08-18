const template=document.querySelector("#video_template")
class video_component extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.content=document.importNode(template.content,true);
        this.shadowRoot.appendChild(this.content);
    }
    connectedCallback(){
        this.shadowRoot.querySelectorAll("video")[0].setAttribute("src",this.getAttribute("data-src"));
        this.video=new Video(this.shadowRoot.querySelectorAll(".video")[0]);
        this.video.execute();
        this.shadowRoot.querySelectorAll("video")[0].addEventListener("error",()=>{
            for(let [key,values] of Object.entries(this.video))
                if(typeof(values)=="function") this.video[key]=()=>{};
            this.video=null;
        });
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if(attr=="data-src"){
            this.shadowRoot.querySelectorAll("video")[0].setAttribute("src",this.getAttribute("data-src"));
            if(this.video===null){
                this.video=new Video(this.shadowRoot.querySelectorAll(".video")[0]);
                this.video.execute();
            }
        }
    }
    static get observedAttributes() {return ["data-src"];}
}
customElements.define("video-player",video_component);