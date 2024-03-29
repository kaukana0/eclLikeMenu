import MarkUpCode from  "./markUpCode.mjs"		// keep this file html/css free


class Element extends HTMLElement {

  #_onSelect					// callback
	#_isLocked = false

	constructor() {	super()	}
	connectedCallback() { setTimeout(()=> this.#_addEventHandlers(), 500) }
	disconnectedCallback() {}

	set data(val) {
		//document.head.insertAdjacentHTML("beforeend", MarkUpCode.css())
		const html = MarkUpCode.getHtmlTemplate(MarkUpCode.getMenuHtml(val)).cloneNode(true)
		// unfortunately, ECL menu doesn't work inside shadow DOM (at least not out of the box)
		//this.attachShadow({ mode: 'open' })
		//this.shadowRoot.appendChild(tmp)
		this.appendChild(html)
		const css = MarkUpCode.getHtmlTemplate(MarkUpCode.css()).cloneNode(true)
		this.appendChild(css)
		new ECL.Menu( this.firstElementChild ).init()	
	}

	set onSelect(val) {	this.#_onSelect = val	}

  //static get observedAttributes() {	return ['data', "onSelect", "onInited"]	}
	attributeChangedCallback(name, oldVal, newVal) {}

	#_addEventHandlers() {
		var items = this.querySelectorAll("[mid]")	// menu item id
		for (var i = 0; i < items.length; i++) {
			items[i].addEventListener("click", action.bind(this))
			items[i].addEventListener("keyup", e=>{if(e.key=="Enter") action.bind(this)(e)} )
		}	

		function action(e) {
			if(e.target.nodeName==="BUTTON" || e.target.nodeName==="svg") {
				return
			}
			// ecl-menu__item--current  AND ecl-menu__link--current don't do anything after init was called :-(
			// so do that manually here
			if(this.#_isLocked) {return}
			this.#deselectAll()
			const [mid,pmid,isParentMenuItem] = this.#selectByElement( this.#getElement(e) )
			this.#invokeCallback(mid,pmid,isParentMenuItem)
			e.stopPropagation()
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
			if(curr[i].classList.contains("ecl-menu__item")) {	// main item
				curr[i].style.background = "#00000000"
				curr[i].firstElementChild.style.color = ""
				const arrow = curr[i].querySelectorAll("svg")[0]
				if(arrow) {
					//arrow.setAttribute("stroke","")
					arrow.setAttribute('style', '')
				}
			} else {		// sub item
				curr[i].firstElementChild.style.background = ""
				curr[i].firstElementChild.style.color = ""
			}
		}
	}

	select(id) {
		if(this.#_isLocked) {return}
		this.#deselectAll()
		let el = this.firstElementChild.querySelector(`li[mid="${id}"]`)
		if(!el) {el = this.firstElementChild.querySelector(`li[pmid="${id}"]`)}
		this.#selectByElement( el ) 
	}

	#getElement(event) {return event.target.closest("li")}

	#selectByElement(li) {
		if(li.hasAttribute("data-ecl-menu-subitem")) {	// selected sub item
			li.firstElementChild.style.background = "#cfdaf5"
			li.firstElementChild.style.color = "#082b7a"
			li.firstElementChild.classList.add("currentlySelected")
		}
		//if(li.hasAttribute("data-ecl-menu-item")) {		// selected main item
			const mainMenuItem = li.closest(".ecl-menu__item")		// go up until this class is matched
			mainMenuItem.style.background = "#cfdaf5"
			mainMenuItem.firstElementChild.style.color = "#082b7a"
			mainMenuItem.firstElementChild.classList.add("currentlySelected")
			const arrow = mainMenuItem.querySelectorAll("svg")[0]
			if(arrow) {
				//arrow.setAttribute("stroke","black")
				arrow.setAttribute('style', 'fill: black')
			}
		//}
		return [li.getAttribute("mid"), li.getAttribute("pmid"), li.hasAttribute("data-ecl-menu-item")]
	}

	setLocked(isLocked) {
		this.#_isLocked = isLocked
	}

	close() {
		this.querySelector("#closebtn").click()		
	}

}

window.customElements.define('ecl-like-menu', Element)
