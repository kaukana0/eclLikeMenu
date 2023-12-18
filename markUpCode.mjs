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

    // mid = menu item id
    for (let [name, items] of data) {
      const bla1 = items.length>0?"ecl-menu__item--has-children":""
      const bla2 = items.length>0?"data-ecl-has-children":""
      retVal += `<li class="ecl-menu__item ${bla1}" ${bla2} 
        data-ecl-menu-item mid="${name}" pmid="${name}" aria-haspopup aria-expanded="false">
        <a class="ecl-menu__link" data-ecl-menu-link style="cursor: pointer;">${name}</a>`

      if(items.length>0) {
        retVal += btn
        retVal += this.getSubMenuItems(name, items)
      }
    }

    return retVal+this.getOutro()
  }

  static getSubMenuItems(parentMenuItem, items) {
    let retVal = `<div class="ecl-menu__mega" data-ecl-menu-mega>
    <ul class="ecl-menu__sublist" style="column-count: 1!important;">`
    items.forEach((name) => {
      retVal += `<li class="ecl-menu__subitem" data-ecl-menu-close data-ecl-menu-subitem mid="${name}" pmid="${parentMenuItem}"><a class="ecl-menu__sublink" style="cursor: pointer;">${name}</a></li>`
    })
    return retVal+= `</ul></div>`
  }

  static getIntro() {
    let retVal = `
    <nav id="mainmenu" class="ecl-menu ecl-menu--group1" data-ecl-menu data-ecl-auto-init="Menu" aria-expanded="false">
    <div class="ecl-menu__overlay" data-ecl-menu-overlay></div>

    <div class="ecl-container ecl-menu__container overrideWidth someMargin someMargin2">
      <a class="ecl-link ecl-link--standalone ecl-menu__open" data-ecl-menu-open>
        <svg class="ecl-icon" focusable="false" aria-hidden="true" style="width:23px; height:23px;">
          <use xlink:href="./redist/ecl/icons.svg#hamburger"></use>
        </svg>
      </a>
      <section class="ecl-menu__inner" data-ecl-menu-inner>
        <header class="ecl-menu__inner-header">
          <button id="closebtn" class="ecl-menu__close ecl-button ecl-button--text" type="submit" data-ecl-menu-close>
            <span class="ecl-menu__close-container ecl-button__container">
              <svg class="ecl-icon ecl-icon--s ecl-button__icon ecl-button__icon--before" focusable="false"
                aria-hidden="true" data-ecl-icon>
                <use xlink:href="./redist/ecl/icons.svg#close-filled"></use>
              </svg>
              <span class="ecl-button__label" data-ecl-label="true">Close</span>
            </span>
          </button>
          <div class="ecl-menu__title">Menu</div>
          <button data-ecl-menu-back type="submit" class="ecl-menu__back ecl-button ecl-button--text">
            <span class="ecl-button__container">
              <svg class="ecl-icon ecl-icon--xs ecl-icon--rotate-270 ecl-button__icon ecl-button__icon--before"
                focusable="false" aria-hidden="true" data-ecl-icon>
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
</nav>`
  }

  static css() {
    return `
<style>
/*
  .ecl-menu__mega {
    height: 500px !important;
    width: 100px;
  }
*/
  @media (min-width: 480px) {
      .overrideWidth {
          width: unset !important;
      }
  }

  @media (min-width: 768px) {
      .overrideWidth {
          width: unset !important;
      }
  }

  .someMargin {
    /* margin-left: calc(35px - 16px); */
  }

  @media (max-width: 996px) {
      .overrideWidth {
          width: unset !important;
      }
  }

  @media (max-width: 996px) {
    .someMargin {
      margin-left: 0;
      padding:4px;
      margin-right:9px;
    }
    .someMargin2 {
      width:60px;
    }
    #mainmenu {
      box-shadow:unset !important;
    }
  }

  @media (min-width: 1140px) {
      .overrideWidth {
          width: unset !important;
      }
  }

</style>
    `    
  }

}