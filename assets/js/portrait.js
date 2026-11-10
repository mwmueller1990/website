/* Portrait stepper.
 *
 * Lets a visitor step through photographs taken at each career stage.
 * No dependencies. Degrades to a single static photo if JS is off.
 *
 * To change the photos: edit STAGES below and drop matching files into
 * assets/img/portraits/. Keep them in chronological order. DEFAULT_FILE below
 * sets which photo loads first; if you change it, also change the src,
 * alt and caption in _includes/portrait.html to match.
 *
 * Crop every photo to the same 4:5 ratio with your head at roughly the
 * same size and position in frame. That consistency is what makes the
 * sequence read as one person ageing rather than a pile of snapshots.
 */

(function () {
  "use strict";

  /* A stage with year: "" simply hides its year line. */
  var STAGES = [
    { file: "undergrad.jpg",  label: "Undergraduate, LMU Munich",           year: "2009–13" },
    { file: "mphil.jpg",      label: "M.Phil., Oxford",                     year: "2013–15" },
    { file: "phd-start.jpg",  label: "PhD, first year, Berkeley",           year: "2015" },
    { file: "phd-end.jpg",    label: "PhD, final year, Berkeley",           year: "2022" },
    { file: "postdoc.jpg",    label: "Postdoc, briq",                       year: "2022–23" },
    { file: "ap-start.jpg",   label: "Assistant professor, first year, TSE", year: "2023" },
    { file: "ap-now.jpg",     label: "Assistant professor, now",            year: "2026" }
  ];

  var BASE = "assets/img/portraits/";

  var img     = document.getElementById("portrait-img");
  var caption = document.getElementById("portrait-caption");
  var year    = document.getElementById("portrait-year");
  var ticks   = document.getElementById("portrait-ticks");

  if (!img || !ticks) return;

  var DEFAULT_FILE = "phd-end.jpg";
  var current = STAGES.findIndex(function (s) { return s.file === DEFAULT_FILE; });
  if (current < 0) current = STAGES.length - 1;
  var buttons = [];

  function show(i) {
    if (i < 0 || i >= STAGES.length) return;
    current = i;
    var s = STAGES[i];

    img.src = BASE + s.file;
    img.alt = "Maximilian W. Müller" + (s.year ? " in " + s.year : "") +
              ". " + s.label + ".";

    caption.firstChild.nodeValue = s.label + " ";
    year.textContent = s.year;
    year.hidden = !s.year;

    buttons.forEach(function (b, j) {
      b.setAttribute("aria-current", j === i ? "true" : "false");
      b.tabIndex = j === i ? 0 : -1;
    });
  }

  STAGES.forEach(function (s, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", s.label + (s.year ? ", " + s.year : ""));
    b.setAttribute("aria-current", i === current ? "true" : "false");
    b.tabIndex = i === current ? 0 : -1;

    b.addEventListener("click", function () { show(i); });

    b.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = current + 1;
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   next = current - 1;
      if (e.key === "Home") next = 0;
      if (e.key === "End")  next = STAGES.length - 1;
      if (next === null) return;
      e.preventDefault();
      next = Math.max(0, Math.min(STAGES.length - 1, next));
      show(next);
      buttons[next].focus();
    });

    ticks.appendChild(b);
    buttons.push(b);
  });

  /* Preload the rest once the page is idle, so the first click is instant
     and there is never a flash of empty frame. */
  function preload() {
    STAGES.forEach(function (s, i) {
      if (i === current) return;
      var pre = new Image();
      pre.src = BASE + s.file;
    });
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(preload, { timeout: 3000 });
  } else {
    window.addEventListener("load", function () { setTimeout(preload, 800); });
  }
})();
