const template=document.querySelector("#video_template")
class video_component extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.content=document.importNode(template.content,true);
        this.shadowRoot.appendChild(this.content);
        this.video=null;
    }
    connectedCallback(){
        this.update_tag();
    }
    update_tag(){
        let video_container=this.shadowRoot.querySelectorAll(".video")[0];
        let video_tag=this.shadowRoot.querySelectorAll("video")[0];
        if(this.getAttribute("data-src")==null) this.setAttribute("data-src","");
        video_tag.setAttribute("src",this.getAttribute("data-src"));
        this.video=new Video(video_container);
        this.video.execute();                    
        video_tag.onerror=()=>this.video_error(video_container,video_tag);
    }
    video_error(video_container,video_tag){
        console.log(`%cVideo error`,"font-size:20px",`
networkState: ${video_tag.networkState}
src: ${this.getAttribute("data-src")}`);
        this.reset_tag(video_container);
        console.log(this);
    }
    reset_tag(tag){
        let video_tag=this.shadowRoot.querySelectorAll("video")[0];
        let baseNode=tag.cloneNode(true);
        video_tag.onerror=null;
        tag.parentNode.replaceChild(baseNode,tag);
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if(attr=="data-src"&&oldValue!=newValue&&this.video!=null) this.update_tag(); 
    }
    static get observedAttributes() {return ["data-src"];}
}
customElements.define("video-player",video_component);