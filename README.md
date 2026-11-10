# Site kit — setup guide

This kit has been rendered and checked: all four pages build without
warnings, work at phone width with a collapsing menu, and the portrait
stepper works with mouse and keyboard. Grey placeholder images stand in for
your photos so you can see the layout before supplying anything.

Everything here is ready to render. The work left is installing two tools,
supplying your own photos and PDFs, and pointing your domain at GitHub.

Budget four sessions of two to three hours each. They are ordered so that
nothing is visible to the public until session four, and so you can stop after
any one of them without leaving anything broken.

---

## Session one — get it running on your own machine

**Install Quarto.** Download from <https://quarto.org/docs/get-started/>. It is a
normal installer, no command line required. Verify it worked by opening a
terminal and running `quarto --version`.

**Install a text editor**, if you don't have one you like. VS Code is free and
has a Quarto extension that gives you live preview. RStudio also works and you
may already have it.

**Preview the site.** Open a terminal in this folder and run:

```
quarto preview
```

A browser tab opens at `localhost:4200` showing the site. Leave that running —
it rebuilds automatically every time you save a file. This is the loop you will
work in for the next three sessions.

Nothing you do here is public yet. It is running only on your laptop.

**Then break something on purpose.** Open `index.qmd`, change a sentence, save,
and watch the browser update. That is the entire authoring model. `.qmd` files
are Markdown with a small header at the top.

### Where things live

```
_quarto.yml              Site config: nav, title, fonts
index.qmd                Homepage — bio and research
teaching.qmd             Teaching and advising, merged
cv.qmd                   CV summary and PDF link
off-the-clock.qmd        Cycling, namesakes, the other things
_includes/portrait.html  Markup for the portrait stepper
assets/css/theme.scss    Colours and fonts. Change a value, the site follows.
assets/css/styles.css    Layout and components. Heavily commented.
assets/js/portrait.js    Portrait stepper. Edit STAGES to change photos.
assets/img/portraits/    Your portraits. See NAMING.txt.
papers/                  Your PDFs. Self-hosted, so the links never rot.
.github/workflows/       Automatic publishing. Don't need to touch it.
CNAME                    Your domain name.
```

---

## Session two — your content

**PDFs are self-hosted.** The three working papers are already in `papers/`.
To post a new version, overwrite the file with the same name and update the
version date next to it in `index.qmd`. The link stays the same forever. Your CV
is `papers/cv.pdf`; replace it the same way whenever you update it.

**Fill in the placeholders.** Search every file for `TODO`. What's left: links
for the ARTE documentary, the Freakonomics episode and the Twitter thread on
the Off the clock page (the old site embedded these, so no address could be
recovered), and the teaching evaluations link.

**Read the copy critically.** The facts (positions, papers, co-authors, links,
courses, presentation venues) were taken from your current site. The wording is
partly mine: the bio is lightly rewritten, the two theme blurbs and the
one-paragraph Berkeley teaching summary are new. Treat those as drafts to
rewrite in your own voice.

Your old Research page still lists *The Price of Identity* as a working paper;
the kit has it correctly as R&R at AEJ: Applied.

**Check the abstracts.** I lightly edited them for the web: the LaTeX quote marks
and double hyphens are fixed, and I trimmed the last sentence or two where they
restated the findings. Compare against your canonical versions and restore
anything I cut that you want kept.

---

## Session three — the portraits

Read `assets/img/portraits/NAMING.txt` first. The short version: seven photos,
all cropped to 4:5, eyes at the same height, exported at 800×1000, saved over
the grey placeholders with the same filenames (`undergrad.jpg` through
`ap-now.jpg`).

Finding old photos is the slow part. Give it a proper session. Ask your family;
undergraduate-era photos are usually on someone else's hard drive.

Once the files are in place, edit the `STAGES` array at the top of
`assets/js/portrait.js` so the labels and years match what you actually have. You
can use fewer than seven. Keep them in chronological order — the last one loads
by default. A stage with an empty year simply hides its year line.

If a stage is missing entirely, just delete its line from `STAGES`. Nothing else
needs to change.

**Test it with JavaScript disabled.** The page should still show your current
photo, just without the stepper. That is the intended fallback.

---

## Session four — go live

### Put it on GitHub

Create a free account at github.com if you don't have one. Create a new
repository — call it whatever you like, `website` is fine — and make it public.
GitHub Pages requires a public repo on the free plan.

Push this folder to it. If the command line is unfamiliar, GitHub Desktop is a
graphical client that does the same thing.

Then: **Settings → Pages → Source → GitHub Actions**. That switches on the
workflow in `.github/workflows/publish.yml`. Push a commit and watch the Actions
tab; two minutes later the site is live at `yourusername.github.io/website`.

Check it there before touching DNS. If it looks right, move on.

### Point your domain at it

Your domain is currently serving Google Sites. Two things to sort out.

**First, find out where the domain is registered.** If you bought it through
Google, that registration moved to Squarespace in 2023, and your DNS controls are
in a Squarespace account you may not know you have. If you bought it elsewhere,
log in there.

**Second, set the DNS records.** In GitHub: Settings → Pages → Custom domain →
enter `www.maximilianwmueller.com` → Save. Then at your registrar, create:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| CNAME | www  | `yourusername.github.io` |
| A     | @    | `185.199.108.153`        |
| A     | @    | `185.199.109.153`        |
| A     | @    | `185.199.110.153`        |
| A     | @    | `185.199.111.153`        |

The four A records handle the bare `maximilianwmueller.com` so it redirects to
the `www` version. Delete any existing A or CNAME records pointing at Google
first, or they will conflict.

Propagation takes anywhere from ten minutes to a day. Once it resolves, go back
to GitHub Pages settings and tick **Enforce HTTPS**. If that box is greyed out,
wait an hour and check again — GitHub needs the DNS to resolve before it can
issue the certificate.

**Leave the Google Site up until the new one resolves.** Then delete it, so
there's no chance of a stale copy being indexed alongside the new one.

### After it's live

Submit the site to Google Search Console so the new URLs get indexed quickly, and
check that your Google Scholar profile links to the new PDF locations.

---

## Analytics

GitHub Pages has no built-in analytics of any kind — it is a static file host and
keeps no logs you can see. You add analytics yourself with a small script tag.

You are at a French institution, so GDPR applies to whatever you pick. The
practical consequence: a cookieless analytics tool needs no consent banner, and a
cookie-based one like Google Analytics does. A consent banner on a personal
academic site is worse than having no analytics at all, so I would rule out GA
for that reason alone.

Three good options, all cookieless:

**GoatCounter** — free for personal use, open source, very simple dashboard.
Probably the right pick. Sign up at goatcounter.com, then add your code to
`_quarto.yml` under `include-in-header`:

```yaml
    include-in-header:
      - text: |
          <script data-goatcounter="https://YOURCODE.goatcounter.com/count"
                  async src="//gc.zgo.at/count.js"></script>
```

**Cloudflare Web Analytics** — free, no limits, but it wants your domain on
Cloudflare's nameservers. Worth it if you are moving DNS anyway and like the idea
of free caching thrown in.

**Plausible** — around €9 a month, the nicest dashboard of the three. Only worth
paying for if you will actually look at it.

### Tracking paper downloads

This is the number you will actually care about. GoatCounter can count PDF clicks
with a few lines:

```html
<script>
document.addEventListener("click", function (e) {
  var a = e.target.closest("a[href$='.pdf']");
  if (a && window.goatcounter) {
    window.goatcounter.count({
      path: "download" + new URL(a.href, location).pathname,
      title: a.textContent.trim(),
      event: true
    });
  }
});
</script>
```

Which is a real argument for self-hosting the PDFs rather than leaving them on
Box: you cannot count what you do not serve.

A caveat worth holding onto. Academic site traffic is small and noisy — a mention
on a mailing list produces a spike that means nothing. The genuinely useful
signals are which papers get downloaded and whether anyone reaches the advising
page, not the visitor count.

---

## Changing the design

- **Colours and fonts** are in `assets/css/theme.scss`. `$accent` is the link
  colour, currently a deep green; `#1F4E79` is a restrained navy if you want the
  conventional academic look. To change the typeface, edit
  `$font-family-sans-serif` there and the Google Fonts URL in `_quarto.yml`.
  Newsreader, Spectral and Literata are free and all look different from the
  default.
- **The page width** is `grid: body-width` in `_quarto.yml`, currently 860px.
  If you change it, change the matching `860px` in the navbar rule in
  `styles.css` too, so the navbar stays aligned with the content. Long
  paragraphs are capped at about 75 characters by the "line length" rule in
  `styles.css`, so widening the page doesn't make text hard to read.
- **Layout and components** (bio, papers, abstracts, portrait, gallery) are in
  `assets/css/styles.css`, with comments on each section.

The design intentionally uses one typeface and one colour. If you add a second of
either, the discipline is what you'd be spending, so make it deliberate.

## Gotchas I hit while building this

- **Blank lines around `:::`.** A fenced div that touches the paragraph above it
  silently becomes text. Quarto warns with "The following string was found in
  the document: :::".
- **Indented HTML becomes a code block.** Four spaces of indentation in Markdown
  means "code". Raw HTML you want left alone goes inside a ```` ```{=html} ````
  block, as in `_includes/portrait.html`.
- **Images loaded by JavaScript need declaring.** Quarto only copies files it
  sees referenced, so `assets/img/` and `assets/js/` are listed under
  `resources:` in `_quarto.yml`. Anything new a script loads should live in one
  of those folders.
