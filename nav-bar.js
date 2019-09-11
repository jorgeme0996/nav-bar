import { html, LitElement, css } from 'lit-element';

import '@polymer/iron-icon'
import '@polymer/iron-icons'
import '@polymer/paper-icon-button'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/paper-item'

class Navbar extends LitElement {
    static get properties() {
        return {
            title: {type: String},
            icons: {type: Array},
            hasBurgerBar: {type: Boolean},
            menuOptions: {type: Array},
            menuTitle: {type: String}
        };
    }

    static get styles() {
        return css`
        :host {
            display: block;
        }
        app-toolbar {
            background-color: var(--paper-indigo-500);
            color: white;
        }
        app-toolbar div {
            margin-left: 20px;
        }
        #menuTile {
            margin-left: 20px;
        }
        `
    }

    render() {
        return html`
        <app-toolbar>
        ${this.hasBurgerBar === true ? html`
            <paper-icon-button icon="menu" @click="${this.openDrawer}"></paper-icon-button>
        `: ''}
            <div main-title>${this.title}</div>
            ${this.icons.map(icon=>html`
                <paper-icon-button icon="${icon}" @click="${this.iconClicked}"></paper-icon-button>
            `)}
        </app-toolbar>
        <app-drawer id="drawer">
        <h2 id="menuTile">${this.menuTitle}</h2>
        <div role="listbox">
            ${this.menuOptions.map(option=>html`
                <paper-item page="${option.page}" @click="${this.optionClicked}">${option.text}</paper-item>
            `)}
        </div>
        </app-drawer>
        `;
    }

    iconClicked(e){
        const iconClick = e.target.getAttribute("icon");
        let event = new CustomEvent('icon-clicked', {
          detail: iconClick,
          bubbles: true,
          composed: true 
        });
        this.dispatchEvent(event);
    }

    optionClicked(e){
        const optionPageClicked = e.target.getAttribute("page");
        let event = new CustomEvent('option-clicked', {
          detail: optionPageClicked ,
          bubbles: true,
          composed: true 
        });
        this.dispatchEvent(event);
    }

    openDrawer(){
        const drawer = this.shadowRoot.getElementById('drawer');
        drawer.open();
    }
}

window.customElements.define("nav-bar", Navbar);