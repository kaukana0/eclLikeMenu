/*
all HTML and CSS as JS string
*/

export default class MarkUpCode {

	// helper
	static getHtmlTemplate(source) {
		const t = document.createElement('template')
		t.innerHTML = source
		return t.content
	}

  static getMenuHtml(data) {
    let retVal = this.getIntro()

    const btn = `<button class="ecl-button ecl-button--primary ecl-menu__button-caret" type="button" data-ecl-menu-caret aria-label="Access&#x20;item&#x27;s&#x20;children">
        <span class="ecl-button__container">
          <svg class="ecl-icon ecl-icon--xs ecl-icon--rotate-180 ecl-button__icon ecl-button__icon--after" focusable="false" aria-hidden="true" data-ecl-icon>
              <use xlink:href="./redist/ecl/icons.svg#corner-arrow"></use>
          </svg>
        </span>
    </button>
    `

    for (let [name, items] of data) {
      retVal += `<li class="ecl-menu__item ecl-menu__item--current ecl-menu__item--has-children" data-ecl-menu-item data-ecl-has-children aria-haspopup aria-expanded="false">
      <a mid="${name}" class="ecl-menu__link ecl-menu__link--current" data-ecl-menu-link>${name}</a>`
      if(items.length>0) {
        retVal += btn
        retVal += this.getSubMenuItems(items)
      }
    }

    return retVal+this.getOutro()
  }

  static getSubMenuItems(items) {
    let retVal = `<div class="ecl-menu__mega" data-ecl-menu-mega>
    <ul class="ecl-menu__sublist">`
    items.forEach((name) => {
      retVal += `<li class="ecl-menu__subitem" data-ecl-menu-subitem><a mid="${name}" class="ecl-menu__sublink">${name}</a></li>`
    })
    return retVal+= `</ul></div>`
  }

  static getIntro() {
    let retVal = `
    <nav class="ecl-menu ecl-menu--group1" data-ecl-menu data-ecl-auto-init="Menu" aria-expanded="false">
  <div class="ecl-menu__overlay" data-ecl-menu-overlay></div>
  
  <div class="ecl-container ecl-menu__container">
      <a class="ecl-link ecl-link--standalone ecl-menu__open" href="/component-library/example#tkl6e" data-ecl-menu-open>
        <svg class="ecl-icon ecl-icon--s" focusable="false" aria-hidden="true">
            <use xlink:href="./redist/ecl/icons.svg#hamburger"></use>
        </svg>
        Menu
      </a>
      <section class="ecl-menu__inner" data-ecl-menu-inner>
        <header class="ecl-menu__inner-header">
            <button class="ecl-menu__close ecl-button ecl-button--text" type="submit" data-ecl-menu-close>
              <span class="ecl-menu__close-container ecl-button__container">
                  <svg class="ecl-icon ecl-icon--s ecl-button__icon ecl-button__icon--before" focusable="false" aria-hidden="true" data-ecl-icon>
                    <use xlink:href="./redist/ecl/icons.svg#close-filled"></use>
                  </svg>
                  <span class="ecl-button__label" data-ecl-label="true">Close</span>
              </span>
            </button>
            <div class="ecl-menu__title">Menu</div>
            <button data-ecl-menu-back type="submit" class="ecl-menu__back ecl-button ecl-button--text">
              <span class="ecl-button__container">
                  <svg class="ecl-icon ecl-icon--xs ecl-icon--rotate-270 ecl-button__icon ecl-button__icon--before" focusable="false" aria-hidden="true" data-ecl-icon>
                    <use xlink:href="./redist/ecl/icons.svg#corner-arrow"></use>
                  </svg>
                  <span class="ecl-button__label" data-ecl-label>Back</span>
              </span>
            </button>
        </header>


        <ul class="ecl-menu__list">`

    return retVal
  }

  static getOutro() {
    return `
    </ul>
    </section>
    </div>
    </nav>
    `
  }

}