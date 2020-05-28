import DelayedButton from './delayed-button.js'

DelayedButton.install = (Vue) => {
    Vue.component(DelayedButton.name, DelayedButton);
}

export default DelayedButton;