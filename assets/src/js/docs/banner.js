let bannerElement = {};

const bannerHtml = `    
    <div data-cookiebanner class="cookieWarning">
        <div class="l-container infoBar-row">
            <a class="btn infoBar-btn" data-cookiebanner-btn data-test="cookieBannerBtn">Hello world</a>
            <p class="u-showAboveMid u-hideTextOverflow--narrow">Hello world 1</p>
            <p class="u-showBelowMid u-hideTextOverflow--narrow">Hello world 1</p>
            <p class="u-showBelowMid">Hello World 1</p>
        </div>
    </div>`;

const hideBanner = () => {
    bannerElement.style.display = 'none';
};

const createHideButton = () => {
    const hideButton = document.createElement('a');
    hideButton.href = '#';
    hideButton.innerText = 'THE BUTTON';
    hideButton.className = 'hideButton';
    hideButton.onclick = hideBanner;
    bannerElement.appendChild(hideButton);
};

const init = selector => {
    console.log('cookie banner 1');
    const anchor = document.querySelector(selector);
    anchor.insertAdjacentHTML('afterend', bannerHtml);
    bannerElement = document.querySelector('data-cookiebanner');
    createHideButton();
};

const cookieBanner = {
    hideBanner,
    init
};

export default cookieBanner;
