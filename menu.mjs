import MarkUpCode from  "./markUpCode.mjs"		// keep this file html/css free


class Element extends HTMLElement {

  #_onSelect					// callback

	constructor() {	super()	}
	connectedCallback() { setTimeout(()=> this.#_addEventHandlers(), 500) }
	disconnectedCallback() {}

	set data(val) {
		//document.head.insertAdjacentHTML("beforeend", MarkUpCode.css())
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
		var elements = this.querySelectorAll("[mid]")	// menu item id
		for (var i = 0; i < elements.length; i++) {
			elements[i].addEventListener("click", (e) => {

				// ecl-menu__item--current  AND ecl-menu__link--current don't do anything after init was called :-(
				// so do that manually here

				this.#deselectAll()
				const [mid,pmid,isParentMenuItem] = this.#selectByElement(e)
				this.#invokeCallback(mid,pmid,isParentMenuItem)
			})
		}	
	}

  #invokeCallback(id, pid, isParentMenuItem) {
		if(this.#_onSelect !== undefined) {
			this.#_onSelect(id, pid, isParentMenuItem)
		} else {
			console.debug("menu: No callback")
		}
	}

	#deselectAll() {
		const curr = this.querySelectorAll("li")		// [currentlySelected]
		for (let i = 0; i < curr.length; i++) {
			if(curr[i].classList.contains("ecl-menu__item")) {
				curr[i].style.background = "#00000000"
				curr[i].style.color = "white"
				//curr[i].firstElementChild.style.background = "#00000000"
				//curr[i].firstElementChild.style.color = "white"
			} else {
				curr[i].firstElementChild.style.background = "white"
				curr[i].firstElementChild.style.color = "#0e47cb"

			}
		}
	}

	select(id) {

	}

	#selectByElement(e) {
		const li = e.target.closest("li")

		if(li.hasAttribute("data-ecl-menu-subitem")) {
			li.style.background = "#cfdaf5"
			li.style.color = "black"
			li.firstElementChild.style.background = "#cfdaf5"
			li.firstElementChild.style.color = "black"
			li.firstElementChild.classList.add("currentlySelected")
		}
		if(li.hasAttribute("data-ecl-menu-item")) {
			const mainMenuItem = li.closest(".ecl-menu__item")		// go up until this class is matched
			//mainMenuItem.style.background = "white"
			mainMenuItem.style.color = "black"
			mainMenuItem.classList.add("currentlySelected")
		}
		return [li.getAttribute("mid"), li.getAttribute("pmid"), li.hasAttribute("data-ecl-menu-item")]
	}

}

window.customElements.define('ecl-like-menu', Element)
