class Header extends HTMLElement {
	constructor() {
		super();

		this.animationTags = {
			NAVBAR_SHOW: 'show',
			BURGER_EXPAND: 'expanded',
		};
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		const rootPath = this.getRootPathAttr();

		const template = `
      <header id="header">
        <h2>Mediserv</h2>
        <button id="burgerMenu" aria-label="Toggle menu">☰</button>
        <nav id="navbar">
          <a class="nav-link" href="${rootPath}/index.html">Home</a>
          <a class="nav-link" href="${rootPath}/pages/about.html">About</a>
          <div class="dropdown">
            <a class="nav-link dropdown-item">Services</a>
            <div class="dropdown-content">
              <a href="${rootPath}/pages/services/diagnostics.html" class="nav-link">Diagnositics</a>
              <a href="${rootPath}/pages/services/healthcare.html" class="nav-link">Healthcare</a>
              <a href="" class="nav-link">Soon</a>
            </div>
          </div>
          <a class="nav-link" href="${rootPath}/pages/contact.html">Contact</a>
        </nav>
      </header>
    `;

		this.shadowRoot.innerHTML = `${styles}${template}`;
		this.navbarEl = this.shadowRoot.getElementById('navbar');
		this.burgerMenuEl = this.shadowRoot.getElementById('burgerMenu');

		this.injectBurgerAnimation();
		this.injectDropdownAnimation();

		this.shadowRoot.onclick = function (event) {
			if (!event.target.matches('.dropdown') || !event.target.matches('.dropdown-item')) {
				const dropdowns = document.getElementsByClassName('dropdown-content');

				for (let i = 0; i < dropdowns.length; i++) {
					const openDropdown = dropdowns[i];

					if (openDropdown.style.display !== 'none') {
						openDropdown.style.display = 'none';
					}
				}
			}
		};
	}

	getRootPathAttr() {
		let rootPath = this.getAttribute('root-path');

		if (!rootPath) {
			throw new Error('header-component requires `rootPath` attribute');
		}

    if (rootPath.endsWith('/')) {
      rootPath = rootPath.slice(0, rootPath.lastIndexOf('/'));
    }

		return rootPath.toLowerCase();
	}

	injectBurgerAnimation() {
		this.shadowRoot.getElementById('burgerMenu').addEventListener('click', () => {
			this.navbarEl.classList.contains(this.animationTags.NAVBAR_SHOW)
				? this.collapseBurger()
				: this.expandBurger();
		});
	}

	injectDropdownAnimation() {
		const dropdown = this.shadowRoot.querySelector('.dropdown');

    dropdown.onclick = () => {
      const dropdownContent = this.shadowRoot.querySelector('.dropdown .dropdown-content');

			if (this.#isDesktop()) {
				return;
			}

			dropdownContent.classList.toggle('hidden');
    };
	}

	collapseBurger() {
		this.navbarEl.classList.remove(this.animationTags.NAVBAR_SHOW);
		this.burgerMenuEl.classList.remove(this.animationTags.BURGER_EXPAND);
		this.burgerMenuEl.innerText = '☰';
	}

	expandBurger() {
		this.navbarEl.style.display = 'flex';
		this.burgerMenuEl.style.visibility = 'hidden';
		this.burgerMenuEl.classList.add(this.animationTags.BURGER_EXPAND);
		this.navbarEl.classList.add(this.animationTags.NAVBAR_SHOW);

    const dropdownContent = this.shadowRoot.querySelector('.dropdown .dropdown-content');
    dropdownContent.classList.add('hidden');

		setTimeout(() => {
			this.burgerMenuEl.style.visibility = 'visible';
			this.burgerMenuEl.innerText = 'X';
		}, 100);
	}

  #isDesktop() {
    return window.innerWidth > 857;
  }
}

const styles = `
  <style>
    #burgerMenu {
      display: none;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }

    header {
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    header > h2 {
      font-size: 24px;
    }

    #navbar {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    .nav-link {
      padding: 8px 16px;
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    .nav-link:hover {
      color: #f18954;
    }

    .dropdown, dropdown-submenu {
      position: relative;
      display: inline-block;
    }

    @media screen and (min-width: 858px) {  
      .dropdown:hover > .nav-link {
        color: #f18954;
      }
  
      .dropdown-content {
        width: 160px;
  
        display: none;
  
        position: absolute;
        top: 160%;
        left: 15%;
        z-index: 1;
  
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, .2);
      }
  
      .dropdown-content a {
        display: block;
        color: black;
        text-decoration: none;
        padding: 12px 16px;
      }
  
      .dropdown-content a:hover {
        color: white;
        background-color: #f18954;
      }

      .dropdown:hover .dropdown-content {
        display: block;
      }
    }

    @media screen and (max-width: 857px) {
      #burgerMenu {
        display: block;
      }

      #burgerMenu.expanded {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 20;

        color: white;
        font-size: 18px;
      }

      #navbar {
        width: 0px;

        display: flex;
        align-items: flex-start;
        gap: 1rem;
        flex-direction: column;

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;

        padding-top: 2rem;

        background-color: #f18954;
        border-left: 1px solid black;

        transition: width .3s ease-in;
      }

      #navbar.show {
        width: 220px;
      }

      #navbar .nav-link {
        width: 100%;
        color: white;
        margin: 0;
        font-weight: 500;
      }

      .dropdown, .dropdown-item {
        display: block;
        width: 100%;
      }

      .dropdown-content {
        display: flex;
        flex-direction: column;
        gap: 16px;

        margin-top: 16px;
        margin-left: 24px;
      }

      .dropdown-content a {
        padding: 4px 8px;
      }

      .dropdown-content.hidden {
        display: none;
      }
    }
  </style>
`;

customElements.define('header-component', Header);
