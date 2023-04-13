import MarkUpCode from  "./markUpCode.mjs"		// keep this file html/css free


class Element extends HTMLElement {

  #_callback
  #_isInitialized

	#$(elementId) {
		return this.shadowRoot.getElementById(elementId)
	}

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		const tmp = MarkUpCode.getHtmlTemplate(MarkUpCode.mainElement()).cloneNode(true)
		this.shadowRoot.appendChild(tmp)
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
    this.#$("menuContainer").appendChild(MarkUpCode.getMenuHtmlElements(val, this.onClick.bind(this)))
	}

	set callback(val) {
		this.#_callback = val
	}

  static get observedAttributes() {
		return ['data', "callback"]
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (name === 'data' || name === 'callback') {
			console.warn("menu: setting "+name+" via html attribute is being ignored. please use js property instead.")
		}
	}

  onClick(id) {
    this.#invokeCallback(id)
  }

  #invokeCallback(id) {
		if(this.#_callback !== undefined) {
			this.#_callback(id)
		} else {
			console.debug("menu: No callback")
		}
	}

}

window.customElements.define('ecl-like-menu', Element)
