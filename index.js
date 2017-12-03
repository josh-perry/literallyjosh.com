var Metalsmith  = require("metalsmith");
var layouts     = require("metalsmith-layouts");
var markdown    = require("metalsmith-markdown");
var permalinks  = require("metalsmith-permalinks");
var static      = require("metalsmith-static");
var watch       = require('metalsmith-watch');

Metalsmith(__dirname)
    .metadata({
        page_title: "Josh Perry",
        url: "https://literallyjosh.com/",
        urls: {
            email: "josh@literallyjosh.com",
            linkedin: "https://www.linkedin.com/in/josh-perry-0a802681",
            twitter: "https://twitter.com/literally_josh",
            github: "https://github.com/josh-perry/",
            blog: "/blog",
            cv: "/cv",
            projects: "/projects"
        }
    })
    .source("./src")
    .destination("./build")
    .use(markdown())
    .use(permalinks())
    .use(layouts("handlebars"))
    .use(static({
        src: "static",
        dest: "."
    }))
    .use(
        watch({
            paths: {
                "${source}/**/*": true,
                "static/**/*": "**/*",
                "layouts/**/*": "**/*.md",
            },
            livereload: true
        })
    )
    .build((err) => {
        if (err)
        {
            throw err;
        }

        console.log("Build finished!");
    });