/* Visit and download counting with GoatCounter (cookieless, no banner needed).
 * Dashboard: https://maximilianwmueller.goatcounter.com
 *
 * Page views are counted by GoatCounter's own script, loaded in _quarto.yml.
 * This file adds one extra count for every click on a PDF link, recorded as
 * "download/<path>", e.g. "download/papers/cv.pdf".
 */
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest("a[href]");
  if (!a) return;
  var url;
  try { url = new URL(a.getAttribute("href"), location.href); } catch (err) { return; }
  if (!/\.pdf$/i.test(url.pathname)) return;
  if (!window.goatcounter || !window.goatcounter.count) return;
  var path = url.origin === location.origin
    ? url.pathname.replace(/^\/(website\/)?/, "")
    : url.hostname + url.pathname;
  window.goatcounter.count({
    path: "download/" + path,
    title: (a.closest(".paper") && a.closest(".paper").querySelector(".paper-title")
              ? a.closest(".paper").querySelector(".paper-title").textContent.trim()
              : a.textContent.trim()),
    event: true
  });
});
