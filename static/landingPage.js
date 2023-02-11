app.component("landingpage", {
    template: `
    <html>
        <head>
            <title>Home</title>
        </head>
    <body>
    <div>
        <section data-bs-version="5.1" class="menu menu1 cid-tsJfjXi3Q4" once="menu" id="menu1-0">
            <nav class="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
                <div class="container">
                    <div class="navbar-brand">
                        <span class="navbar-caption-wrap"><a class="navbar-caption text-black display-7">Computer Aided
                                Learning</a></span>
                    </div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-bs-toggle="collapse"
                        data-target="#navbarSupportedContent" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <div class="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                            <li class="nav-item"><a class="nav-link link text-black display-4"
                                    href="https://www.linkedin.com/in/rahul-mohoto-me/" target="_blank">
                                    About me</a></li>
                            <li class="nav-item"><a class="nav-link link text-black display-4"
                                    href="https://www.hackster.io/rahulmohoto" target="_blank">
                                    Projects on Hackster</a></li>
                            <li class="nav-item"><a class="nav-link link text-black display-4"
                                    href="https://mobiri.se" target="_blank">Contacts</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>

        <section data-bs-version="5.1" class="header18 cid-tsJfrFk192 mbr-fullscreen" id="header18-1">
            <div class="align-center container">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-10">
                        <h1 class="mbr-section-title mbr-fonts-style mbr-white mb-3 display-1"><strong>Computer Aided
                                Learning</strong></h1>

                        <p class="mbr-text mbr-fonts-style mbr-white display-7">
                            Computer Aided Learning is a tool, which teaches you to draw the shapes without the help from
                            your teacher. This web console supports any device. Only you have to attach your Psoc4100S
                            Pioneer Kit to the device as a Mouse and start drawing the shapes.
                        </p>

                    </div>
                </div>
                <div>
                    <a href="/page2">
                        <button type="button" class="btn btn-primary">
                            Get Started
                        </button>
                    </a>
                </div>
            </div>
        </section>
        <section class="display-7"
            style="padding: 0;align-items: center;justify-content: center;flex-wrap: wrap; align-content: center;display: flex;position: relative;height: 4rem;">
            <a href="https://www.youtube.com/@rahulmohoto9315/featured" target="_blank"
                style="flex: 1 1;height: 4rem;position: absolute;width: 100%;z-index: 1;"><img alt="" style="height: 4rem;"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></a>
            <!-- <p style="margin: 0;text-align: center;" class="display-7">Made with &#8204;</p> -->
            <a style="z-index:1" href="https://www.youtube.com/@rahulmohoto9315/featured" target="_blank"> Copyright 2023 &copy; Rahul Mohoto</a>
        </section>
    </div>
    </body>
    </html>
    `,
})

app.component("hello_world",{
    template: `
    <h1>Hello World</h1>
    `
})