var Metalsmith  = require("metalsmith");
var layouts     = require("metalsmith-layouts");
var collections = require("metalsmith-collections");
var markdown    = require("metalsmith-markdown");
var permalinks  = require("metalsmith-permalinks");
var static      = require("metalsmith-static");
var watch       = require('metalsmith-watch');

var debug       = process.argv.includes("debug");

var m = Metalsmith(__dirname)
    .metadata({
        page_title: "Josh Perry",
        url: "https://literallyjosh.com/",
        urls: {
            twitter: "https://twitter.com/literally_josh",
            github: "https://github.com/josh-perry/",
            blog: "/blog",
	    todo: "/stuff-i-want-to-do",
            cv: "/cv",
            projects: "/projects"
        }
    })
    .source("./src")
    .destination("./build")
    .clean(true)
    .use(collections({
        posts: {
            pattern: "blog/posts/*.md",
            sortBy: "date",
            reverse: true
	},
	jamgames: {
            pattern: "jam/game/*.md",
	    sortBy: "date",
	    reverse: true
	}
    }))
    .use(markdown())
    .use(permalinks())
    .use(layouts("nunjucks"))
    .use(static({
        src: "static",
        dest: "."
    }))

if (debug) {
    m.use(
        watch({
            paths: {
                "${source}/**/*": true,
                "static/**/*": "**/*",
                "layouts/**/*": "**/*.md",
            },
            livereload: true
        })
    )
}

m.build((err) => {
    if (err) {
        throw err;
    }

    console.log("Build finished!");
});
