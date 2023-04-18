import MarkUpCode from  "./markUpCode.mjs"		// keep this file html/css free


class Element extends HTMLElement {

  #_onSelect					// callback
	#_onInited					// callback
  #_isInitialized

	//#$(elementId) {
	//	return this.shadowRoot.getElementById(elementId)
	//}

	constructor() {
		super()
	}

	#registerEvents() {
	}

	connectedCallback() {
		if(!this.#_isInitialized) {
			this.#registerEvents()	
			this.#_isInitialized = true
		}
	}

	disconnectedCallback() {
	}

	set data(val) {
		// todo: clear
    //this.#$("menuContainer").appendChild(MarkUpCode.getMenuHtmlElements(val, this.onClick.bind(this)))

		const tmp = MarkUpCode.getHtmlTemplate(MarkUpCode.getMenuHtml(val)).cloneNode(true)
		// unfortunately, ECL menu doesn't work inside shadow DOM (at least not out of the box)
		//this.attachShadow({ mode: 'open' })
		//this.shadowRoot.appendChild(tmp)
		this.appendChild(tmp)

		this.#_addScripts(this.#_onInited)
	}

	set onSelect(val) {
		this.#_onSelect = val
	}

	set onInited(val) {
		this.#_onInited = val
	}

  static get observedAttributes() {
		return ['data', "onSelect", "onInited"]
	}

	attributeChangedCallback(name, oldVal, newVal) {
		//if (name === 'data' || name === 'callback') {
		//	console.warn("menu: setting "+name+" via html attribute is being ignored. please use js property instead.")
		//}
	}

  #_invokeCallback(id) {
		if(this.#_onSelect !== undefined) {
			this.#_onSelect(id)
		} else {
			console.debug("menu: No callback")
		}
	}

	#_addEventHandlers() {
		var elements = this.querySelectorAll("[mid]")		//TODO: attention! "All" searches whole document!
		for (var i = 0; i < elements.length; i++) {
			elements[i].addEventListener("click", (e)=>this.#_invokeCallback(e.target.getAttribute("mid")))
		}	
	}

	#_addScripts() {
		var script = document.createElement('script')
		script.src="./redist/ecl/moment.min.js"
		this.appendChild(script)

		var script2 = document.createElement('script')
		script2.src="./redist/ecl/ecl-eu.js"
		const onLoaded = () => {
			this.#_addEventHandlers()
			if(this.#_onInited !== undefined) {
				this.#_onInited()
			}
		}
		script2.onload = onLoaded.bind(this)
		this.appendChild(script2)
	}

}

window.customElements.define('ecl-like-menu', Element)
