//settings
const Version = {
    REGULAR: 'regular',
    PRO: 'pro',
};
const defaultVersion = Version.REGULAR
const body = document.querySelector("body")
const toolbar = document.querySelector("input.js-switch-input")
const currentVersion = localStorage.getItem('version')
const versionDescription = document.querySelector("ul.features")
//set theme
body.classList.add(currentVersion || defaultVersion)
versionDescription.classList.add(currentVersion || defaultVersion)
//change toolbar to checked when dark theme applied

if (currentVersion == Version.REGULAR) {
    toolbar.setAttribute("checked", true)
}


//setup toolbar listener
const changeVersion = () => {
    if (body.classList.contains(Version.REGULAR)) {
        body.classList.replace(Version.REGULAR, Version.PRO)
        versionDescription.classList.replace(Version.REGULAR, Version.PRO)
        localStorage.setItem('version', Version.PRO);
        return
    }

    if (body.classList.contains(Version.PRO)) {
        body.classList.replace(Version.PRO, Version.REGULAR)
        versionDescription.classList.replace(Version.PRO, Version.REGULAR)
        localStorage.setItem('version', Version.REGULAR);
        return
    }

}


toolbar.addEventListener("change", changeVersion)
