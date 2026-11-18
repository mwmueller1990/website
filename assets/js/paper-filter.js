/* Paper filter on the research page.
 *
 * Each paper is tagged in index.qmd with category="published", "working"
 * (including R&Rs and papers under review) or "progress". The buttons show
 * one category at a time; theme sections with nothing to show are hidden.
 * Without JavaScript the filter stays hidden and all papers are shown.
 */
(function () {
  "use strict";
  var bar = document.querySelector(".paper-filter");
  if (!bar) return;
  var papers = Array.prototype.slice.call(document.querySelectorAll(".paper[data-category]"));
  var themes = Array.prototype.slice.call(document.querySelectorAll(".theme"));
  var buttons = Array.prototype.slice.call(bar.querySelectorAll("button"));

  buttons.forEach(function (b) {
    var f = b.getAttribute("data-filter");
    var n = f === "all" ? papers.length
      : papers.filter(function (p) { return p.getAttribute("data-category") === f; }).length;
    if (n === 0) b.hidden = true;   /* hide a category with no papers */
  });

  function apply(f) {
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-filter") === f ? "true" : "false");
    });
    papers.forEach(function (p) {
      p.hidden = !(f === "all" || p.getAttribute("data-category") === f);
    });
    themes.forEach(function (t) {
      t.hidden = !t.querySelector(".paper[data-category]:not([hidden])");
    });
  }

  bar.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (b) apply(b.getAttribute("data-filter"));
  });
  bar.hidden = false;
})();
