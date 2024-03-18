class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    let rootPath = this.getAttribute('root-path');

    if (!rootPath) {
      throw new Error('header-component requires `rootPath` attribute');
    }

    rootPath = rootPath.toLowerCase();

    const template = `
      <header>
        <h2>Mediserv</h2>
        <nav>
          <a href="${rootPath}index.html">Home</a>
          <a href="${rootPath}pages/about.html">About</a>
          <a href="${rootPath}pages/services.html">Services</a>
          <a href="${rootPath}pages/contact.html">Contact</a>
        </nav>
      </header>
    `;

    this.shadowRoot.innerHTML = `${styles}${template}`;
  }
}

const styles = `
  <style>
    header {
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    header > nav {
      display: flex;
      gap: 2rem;
    }
    
    header > h2 {
      font-size: 24px;
    }
    
    header > nav > a {
      color: black;
      text-decoration: none;
    }  
  </style>
`;

customElements.define('header-component', Header);

function normalizePath(path) {
  let result;

  return result.toLowerCase()
}
