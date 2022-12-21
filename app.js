// global variables
let quantity = 0

// query selectors 
let mainImgEl = document.querySelector(".images-section .main-img")
let imagesToSelectFrom = document.querySelectorAll(".main-images-to-select-from img")
let previousBtn = document.querySelector(".previous-btn")
let nextBtn = document.querySelector(".next-btn")
let currentQuantity = document.querySelector(".current-quantity")
let decreaseQuantityEl = document.querySelector(".decrease-quantity")
let increaseQuantityEl = document.querySelector(".increase-quantity")
let addToCartBtnEl = document.querySelector(".add-to-cart")
let quantityInCart = document.querySelector(".quantity-in-cart")
let cartIconEl = document.querySelector(".cart")
let popUpCartEl = document.querySelector(".popup-cart")
let popupMainEl = document.querySelector(".popup-main")
let crossEl = document.querySelector(".cross")
let popupPreviousBtnEl = document.querySelector(".main-img-container .svg-container-previous") 
let popupNextBtnEl = document.querySelector(".main-img-container .svg-container-next")
let popupImagesToSelectFrom = document.querySelectorAll(".popup-images-to-select-from img")
let popupMainImgEl = document.querySelector(".main-img-container .main-img")
let menuEl = document.querySelector(".menu")
let popupMenuEl = document.querySelector(".popup-menu")
let closePopupMenuEl = document.querySelector(".close-popup-menu")

// initial function
changeMainPicture(1)
setQuantity(0)

// event listeners
window.addEventListener("resize", (e) => {
    if (window.innerWidth > 1100) {
        popupMenuEl.classList.remove("popup-menu-visible")
    } 
    if (window.innerWidth < 1100) {
        popupMainEl.classList.remove("visible-flex")
    }
})

imagesToSelectFrom.forEach((thumbnailImageEl) => {
    thumbnailImageEl.addEventListener("click", (e) => {
        let number = e.target.src.split("-thumbnail")[0].slice(-1)
        changeMainPicture(number)
        thumbnailImageEl.parentElement.classList.add("selected-img")
    })
})

popupImagesToSelectFrom.forEach((thumbnailImageEl) => {
    thumbnailImageEl.addEventListener("click", (e) => {
        let number = e.target.src.split("-thumbnail")[0].slice(-1)
        changePopupMainPicture(number)
        thumbnailImageEl.parentElement.classList.add("selected-img")
    })
})

nextBtn.addEventListener("click", ()=>{
    let number = findMainPictureIndex()
    let newNumber = increaseNumber(number)
    changeMainPicture(newNumber)
})

previousBtn.addEventListener("click", ()=> {
    let number = findMainPictureIndex()
    let newNumber = reduceNumber(number)
    changeMainPicture(newNumber)
})

decreaseQuantityEl.addEventListener("click", () => {
    let number = currentQuantity.innerHTML
    let newNumber = reduceQuantityF(number)
    setQuantity(newNumber)
})

increaseQuantityEl.addEventListener("click", () => {
    let number = currentQuantity.innerHTML
    let newNumber = increaseQuantityF(number)
    setQuantity(newNumber)
})

addToCartBtnEl.addEventListener("click", () => {
    let number = currentQuantity.innerHTML
    updateGlobalQuantity(number)
    setQuantity(0)
})

cartIconEl.addEventListener("click", () => {
    popUpCartEl.classList.toggle("visible")
})

mainImgEl.addEventListener("click", () => {
    if (window.innerWidth > 1320) {
        let number = findMainPictureIndex()
        changePopupMainPicture(number)
        popupMainEl.classList.add("visible-flex")
    }
})

crossEl.addEventListener("click", () => {
    popupMainEl.classList.remove("visible-flex")
})

popupPreviousBtnEl.addEventListener("click", () => {
    let number = findPopupMainPictureIndex()
    let newNumber = reduceNumber(number)
    changePopupMainPicture(newNumber)
})

popupNextBtnEl.addEventListener("click", () => {
    let number = findPopupMainPictureIndex()
    let newNumber = increaseNumber(number)
    changePopupMainPicture(newNumber)
})

menuEl.addEventListener("click", () => {
    popupMenuEl.classList.add("popup-menu-visible")
})

closePopupMenuEl.addEventListener("click", () => {
    popupMenuEl.classList.remove("popup-menu-visible")
})

// functions 
function changeMainPicture(number) {
    removeSelectedTags()
    let newPictureUrl = `./images/image-product-${number}.jpg`
    mainImgEl.style.backgroundImage = `url(${newPictureUrl})`
    let imageSelected = document.querySelectorAll(".main-images-to-select-from img")[number-1].parentElement
    imageSelected.classList.add("selected-img")
}

function changePopupMainPicture(number) {
    removePopupSelectedTags()
    let newPictureUrl = `./images/image-product-${number}.jpg`
    popupMainImgEl.src = newPictureUrl
    let imageSelected = document.querySelectorAll(".popup-images-to-select-from img")[number-1].parentElement
    imageSelected.classList.add("selected-img")
}

function removeSelectedTags() {
    imagesToSelectFrom.forEach((thumbnailImageEl) => {
        thumbnailImageEl.parentElement.classList.remove("selected-img")
    })
} 

function removePopupSelectedTags() {
    popupImagesToSelectFrom.forEach((thumbnailImageEl) => {
        thumbnailImageEl.parentElement.classList.remove("selected-img")
    })
}

function findMainPictureIndex() {
    return mainImgEl.style.backgroundImage.split(`.jpg`)[0].slice(-1)
}

function findPopupMainPictureIndex() {
    return popupMainImgEl.src.split(`.jpg`)[0].slice(-1)
}

function setQuantity(number) {
    currentQuantity.innerHTML = number
}

function increaseNumber(number) {
    let n = Number(number)
    if (n == 4) {
        return 1
    } else {
        return n + 1
    }
}

function reduceNumber(number) {
    let n = Number(number)
    if (n == 1) {
        return 4
    } else {
        return n - 1
    }
}

function reduceQuantityF(number) {
    let n = Number(number)
    if (n==0) {
        return 0
    } else {
        return n - 1
    }
}

function increaseQuantityF(number) {
    let n = Number(number)
    if (n == 5) {
        return n
    } else {
        return n + 1
    }
}

function updateGlobalQuantity(number) {
    quantity += Number(number)
    updateQuantityInCart()
    if (quantity!=0) {
        quantityInCart.style.display = "block"
    }
}

function resetGlobalQuantity() {
    quantity = 0
    updateQuantityInCart()
    quantityInCart.style.display = "none"
}

function updateQuantityInCart() {
    let innerHtmlForPopupCart = ""
    if (quantity === 0) {
        quantityInCart.innerHTML = ""
        innerHtmlForPopupCart = `
        <div class="popup-container">
            <p class="cart-text">Cart</p>
        </div>
        <div class="break-line"></div>
        <div class="popup-container-center">
            <p class="empty-cart-text">Your cart is empty</p>
        </div>
        `
        popUpCartEl.innerHTML = innerHtmlForPopupCart
    } else {
        quantityInCart.innerHTML = quantity
        innerHtmlForPopupCart = `
        <div class="popup-container">
            <p class="cart-text">Cart</p>
        </div>
        <div class="break-line"></div>
        <div class="popup-container">
            <div class="requisition">
                <img class="requisition-picture" src="./images/image-product-1-thumbnail.jpg" alt="picture of sneakers">
                <div class="description-of-requisition">
                    <p>Fall Limited Edition Sneakers</p>
                    <div class="popup-prices">
                        <p class="price-of-one-unit">$125.00 x ${quantity}</p>
                        <p>$${125*quantity}.00</p>
                    </div>
                </div>
                <img class="delete" src="./images/icon-delete.svg" alt="">
            </div>
            <button class="check-out button">Checkout</button>
        </div>
        `
        popUpCartEl.innerHTML = innerHtmlForPopupCart
        popUpCartEl.querySelector(".delete").addEventListener("click", () => {
            resetGlobalQuantity()
        })
    }
}