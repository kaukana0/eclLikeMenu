import MarkUpCode from  "./markUpCode.mjs"		// keep this file html/css free


class Element extends HTMLElement {

  #_onSelect					// callback

	constructor() {	super()	}
	connectedCallback() { setTimeout(()=> this.#_addEventHandlers(), 100) }
	disconnectedCallback() {}

	set data(val) {
		const tmp = MarkUpCode.getHtmlTemplate(MarkUpCode.getMenuHtml(val)).cloneNode(true)
		// unfortunately, ECL menu doesn't work inside shadow DOM (at least not out of the box)
		//this.attachShadow({ mode: 'open' })
		//this.shadowRoot.appendChild(tmp)
		this.appendChild(tmp)
		new ECL.Menu( this.firstElementChild ).init()	
	}

	set onSelect(val) {	this.#_onSelect = val	}

  //static get observedAttributes() {	return ['data', "onSelect", "onInited"]	}
	attributeChangedCallback(name, oldVal, newVal) {}

	#_addEventHandlers() {
		var elements = this.querySelectorAll("[mid]")		//TODO: attention! "All" searches whole document!
		for (var i = 0; i < elements.length; i++) {
			elements[i].addEventListener("click", (e)=>this.#_invokeCallback(e.target.getAttribute("mid")))
		}	
	}

  #_invokeCallback(id) {
		if(this.#_onSelect !== undefined) {
			this.#_onSelect(id)
		} else {
			console.debug("menu: No callback")
		}
	}

}

window.customElements.define('ecl-like-menu', Element)
