/*
all HTML and CSS as JS string
*/

export default class MarkUpCode {

	static mainElement() {
		return `
		<div id='menuContainer' tabindex="0">	</div>
		`
	}

	static css(ms, zIndex) {
		return `<style>
		</style>`
	}

  /*
  <div id="menuContainer">
    <ul>
      <li>
        <a>Category</a>

        <ul>    submenu
          <li>
            <a>Item</a>
            <a>Item2</a>
          </li>
        </ul>

      </li>
    </ul>
  </div>
  */
  static getMenuHtmlElements(data, callback) {
		const ul = document.createElement('ul')
    for (let [name, items] of data) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.innerText = name
      li.appendChild(a)
      const x = this.getSubMenu(items, callback)
      if(x) {
        li.appendChild(x)
      }
      li.addEventListener('click', (ev) => callback(name))
      ul.appendChild(li)
    }
    return ul
  }

  static getSubMenu(items, callback) {
    if(items.length===0) {
      return
    } else {
      const ul = document.createElement('ul')
      items.forEach((name) => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.innerText = name
        li.appendChild(a)
        li.addEventListener('click', (ev) => {ev.stopImmediatePropagation(); callback(name)})
        ul.appendChild(li)
      })
      return ul
  }
}

	// helper
	static getHtmlTemplate(source) {
		const t = document.createElement('template')
		t.innerHTML = source
		return t.content
	}

}