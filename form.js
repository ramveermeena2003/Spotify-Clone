// add event listener to signup button in form and in navbar both
document.querySelector(".signup").addEventListener("click", () => {
    document.querySelector(".form").innerHTML = "";
    // document.querySelector(".form").style.zIndex = "2";
    document.querySelector(".form").innerHTML =
        `<div class="login-signup">
            <form class="signup-form">
                <div class="cancel"><img src="svg/cross.svg" alt=""></div>
                <h2 class="form-h2">Sign Up</h2>
                <div class="input-group">
                    <label for="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="form-button">Sign Up</button>
                <p class="form-p">Already have an account? <a href="#">Login</a></p>
            </form>
        </div>`

    document.querySelector(".form-p").getElementsByTagName("a")[0].addEventListener("click", () => {
        document.querySelector(".form").innerHTML = "";
        document.querySelector(".form").innerHTML =
            `<div class="login-signup">
            <form class="login-form">
                <div class="cancel"><img src="svg/cross.svg" alt=""></div>
                    <h2 class="form-h2">Login</h2>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="form-button">Login</button>
                    <p class="form-p">Don't have an account? <a href="#">Sign up</a></p>
                </form>
            </div>`

        document.querySelector(".cancel").getElementsByTagName("img")[0].addEventListener("click", () => {
            document.querySelector(".form").innerHTML = "";
            // document.querySelector(".form").style.zIndex = "-1";
        })

    })

    document.querySelector(".cancel").getElementsByTagName("img")[0].addEventListener("click", () => {
        document.querySelector(".form").innerHTML = "";
        // document.querySelector(".form").style.zIndex = "-1";
    })



})

// add event listener to login button in form and in navbar both
document.querySelector(".login").addEventListener("click", () => {
    document.querySelector(".form").innerHTML = "";
    // document.querySelector(".form").style.zIndex = "2";
    document.querySelector(".form").innerHTML =
        `<div class="login-signup">
        <form class="login-form">
            <div class="cancel"><img src="svg/cross.svg" alt=""></div>
                <h2 class="form-h2">Login</h2>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="form-button">Login</button>
                <p class="form-p">Don't have an account? <a href="#">Sign up</a></p>
            </form>
        </div>`

    document.querySelector(".form-p").getElementsByTagName("a")[0].addEventListener("click", () => {
        document.querySelector(".form").innerHTML = "";
        document.querySelector(".form").innerHTML =
            `<div class="login-signup">
            <form class="signup-form">
                <div class="cancel"><img src="svg/cross.svg" alt=""></div>
                <h2 class="form-h2">Sign Up</h2>
                <div class="input-group">
                    <label for="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="form-button">Sign Up</button>
                <p class="form-p">Already have an account? <a href="#">Login</a></p>
            </form>
        </div>`
        document.querySelector(".cancel").getElementsByTagName("img")[0].addEventListener("click", () => {
            document.querySelector(".form").innerHTML = "";
            // document.querySelector(".form").style.zIndex = "-1";
        })

    })

    document.querySelector(".cancel").getElementsByTagName("img")[0].addEventListener("click", () => {
        document.querySelector(".form").innerHTML = "";
        // document.querySelector(".form").style.zIndex = "-1";
    })
})
