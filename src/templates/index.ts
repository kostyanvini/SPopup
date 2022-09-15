function html(content) {
    return `
        <div class="spopup">
            <div class="spopup__container">
                <div class="spopup__content">
                    ${content}
                </div>
            </div>
            <div class="spopup__layer"></div>
            <div class="spopup__close"></div>
        </div> 
    `;
}

function image(content) {
    return `
        <div class="spopup">
            <div class="spopup__container">
                <div class="spopup__content">
                    ${content}
                </div>
            </div>
            <div class="spopup__layer"></div>
            <div class="spopup__close"></div>
        </div>
    `;
}

export {html, image};
