const template=document.querySelector("#video_template")
class video_component extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.content=document.importNode(template.content,true);
        this.shadowRoot.appendChild(this.content);
    }
    connectedCallback(){
        this.video=new Video(this.shadowRoot.querySelectorAll(".video")[0]);
        this.video.execute();
    }
}
customElements.define("video-player",video_component);