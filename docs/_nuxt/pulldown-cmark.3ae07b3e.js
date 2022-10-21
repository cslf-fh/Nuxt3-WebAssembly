import{a as f,r as p,_ as g,k as b,b as c,w as m,l as v,e as n,v as w,m as y,o as h,p as _,q as k,s as x}from"./entry.984d3c51.js";const $=r=>(_("data-v-bdfe9f16"),r=r(),k(),r),T=$(()=>n("label",{for:"pre"},"preview only",-1)),I={class:"cmark"},M=["innerHTML"],C=f({__name:"pulldown-cmark",setup(r){const e="`",t="```",s=p(`# pulldown-cmark

[![Build Status](https://dev.azure.com/raphlinus/pulldown-cmark/_apis/build/status/pulldown-cmark-CI?branchName=master)](https://dev.azure.com/raphlinus/pulldown-cmark/_build/latest?definitionId=2&branchName=master)
[![Docs](https://docs.rs/pulldown-cmark/badge.svg)](https://docs.rs/pulldown-cmark)
[![Crates.io](https://img.shields.io/crates/v/pulldown-cmark.svg?maxAge=2592000)](https://crates.io/crates/pulldown-cmark)

[Documentation](https://docs.rs/pulldown-cmark/)

This library is a pull parser for [CommonMark](http://commonmark.org/), written
in [Rust](http://www.rust-lang.org/). It comes with a simple command-line tool,
useful for rendering to HTML, and is also designed to be easy to use from as
a library.

It is designed to be:

* Fast; a bare minimum of allocation and copying
* Safe; written in pure Rust with no unsafe blocks (except in the opt-in SIMD feature)
* Versatile; in particular source-maps are supported
* Correct; the goal is 100% compliance with the [CommonMark spec](http://spec.commonmark.org/)

Further, it optionally supports parsing footnotes,
[Github flavored tables](https://github.github.com/gfm/#tables-extension-),
[Github flavored task lists](https://github.github.com/gfm/#task-list-items-extension-) and
[strikethrough](https://github.github.com/gfm/#strikethrough-extension-).

Rustc 1.56 or newer is required to build the crate.

## Example

Example usage:

${t}rust
// Create parser with example Markdown text.
let markdown_input = "hello world";
let parser = pulldown_cmark::Parser::new(markdown_input);

// Write to a new String buffer.
let mut html_output = String::new();
pulldown_cmark::html::push_html(&mut html_output, parser);
assert_eq!(&html_output, "<p>hello world</p>
");
${t}

## Why a pull parser?

There are many parsers for Markdown and its variants, but to my knowledge none
use pull parsing. Pull parsing has become popular for XML, especially for
memory-conscious applications, because it uses dramatically less memory than
constructing a document tree, but is much easier to use than push parsers. Push
parsers are notoriously difficult to use, and also often error-prone because of
the need for user to delicately juggle state in a series of callbacks.

In a clean design, the parsing and rendering stages are neatly separated, but
this is often sacrificed in the name of performance and expedience. Many Markdown
implementations mix parsing and rendering together, and even designs that try
to separate them (such as the popular [hoedown](https://github.com/hoedown/hoedown)),
make the assumption that the rendering process can be fully represented as a
serialized string.

Pull parsing is in some sense the most versatile architecture. It's possible to
drive a push interface, also with minimal memory, and quite straightforward to
construct an AST. Another advantage is that source-map information (the mapping
between parsed blocks and offsets within the source text) is readily available;
you can call ${e}into_offset_iter()${e} to create an iterator that yields ${e}(Event, Range)${e}
pairs, where the second element is the event's corresponding range in the source
document.

While manipulating ASTs is the most flexible way to transform documents,
operating on iterators is surprisingly easy, and quite efficient. Here, for
example, is the code to transform soft line breaks into hard breaks:

${t}rust
let parser = parser.map(|event| match event {
	Event::SoftBreak => Event::HardBreak,
	_ => event
});
${t}

Or expanding an abbreviation in text:

${t}rust
let parser = parser.map(|event| match event {
	Event::Text(text) => Event::Text(text.replace("abbr", "abbreviation").into()),
	_ => event
});
${t}

Another simple example is code to determine the max nesting level:

${t}rust
let mut max_nesting = 0;
let mut level = 0;
for event in parser {
	match event {
		Event::Start(_) => {
			level += 1;
			max_nesting = std::cmp::max(max_nesting, level);
		}
		Event::End(_) => level -= 1,
		_ => ()
	}
}
${t}

There are some basic but fully functional examples of the usage of the crate in the
${e}examples${e} directory of this repository.

## Using Rust idiomatically

A lot of the internal scanning code is written at a pretty low level (it
pretty much scans byte patterns for the bits of syntax), but the external
interface is designed to be idiomatic Rust.

Pull parsers are at heart an iterator of events (start and end tags, text,
and other bits and pieces). The parser data structure implements the
Rust Iterator trait directly, and Event is an enum. Thus, you can use the
full power and expressivity of Rust's iterator infrastructure, including
for loops and ${e}map${e} (as in the examples above), collecting the events into
a vector (for recording, playback, and manipulation), and more.

Further, the ${e}Text${e} event (representing text) is a small copy-on-write string.
The vast majority of text fragments are just
slices of the source document. For these, copy-on-write gives a convenient
representation that requires no allocation or copying, but allocated
strings are available when they're needed. Thus, when rendering text to
HTML, most text is copied just once, from the source document to the
HTML buffer.

When using the pulldown-cmark's own HTML renderer, make sure to write to a buffered
target like a ${e}Vec<u8>${e} or ${e}String${e}. Since it performs many (very) small writes, writing
directly to stdout, files, or sockets is detrimental to performance. Such writers can
be wrapped in a [${e}BufWriter${e}](https://doc.rust-lang.org/std/io/struct.BufWriter.html).

## Build options

By default, the binary is built as well. If you don't want/need it, then build like this:

${t}bash
> cargo build --no-default-features
${t}

Or put in your ${e}Cargo.toml${e} file:

${t}toml
pulldown-cmark = { version = "0.9.2", default-features = false }
${t}

SIMD accelerated scanners are available for the x64 platform from version 0.5 onwards. To
enable them, build with simd feature:

${t}bash
> cargo build --release --features simd
${t}

Or add the feature to your project's ${e}Cargo.toml${e}:

${t}toml
pulldown-cmark = { version = "0.9.2", default-features = false, features = ["simd"] }
${t}

## Authors

The main author is Raph Levien. The implementation of the new design (v0.3+) was completed by Marcus Klaas de Vries.

## Contributions

We gladly accept contributions via GitHub pull requests. Please see
[CONTRIBUTING.md](CONTRIBUTING.md) for more details.
`),i=p(),l=p(!1);let u;return g(()=>import("./pulldown_cmark.60f9a7ad.js"),["pulldown_cmark.60f9a7ad.js","__vite-plugin-wasm-helper.eadeccca.js"],import.meta.url).then(o=>u=o).finally(()=>{i.value=u.pulldown_cmark(s.value)}),b(s,(o,a)=>{i.value=u?.pulldown_cmark(o)}),(o,a)=>(h(),c("div",null,[m(n("input",{"onUpdate:modelValue":a[0]||(a[0]=d=>l.value=d),id:"pre",type:"checkbox"},null,512),[[v,l.value]]),T,n("div",I,[l.value?y("",!0):m((h(),c("textarea",{key:0,"onUpdate:modelValue":a[1]||(a[1]=d=>s.value=d),class:"cmark__textarea"},null,512)),[[w,s.value]]),n("div",{innerHTML:i.value,class:"cmark__markdown"},null,8,M)])]))}});const E=x(C,[["__scopeId","data-v-bdfe9f16"]]);export{E as default};
