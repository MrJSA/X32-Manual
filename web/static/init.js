// Runs before first paint (loaded synchronously from app.html). Kept as a file instead of an
// inline <script> so the Content-Security-Policy can forbid every inline script it doesn't hash.
(function () {
	var root = document.documentElement;

	// Language: a saved choice (from the switch in the header) wins; without one, German
	// browsers get the German pages. Never redirects /de/ → / on the browser language
	// alone, so search engines (which browse in English) still see the German pages.
	try {
		var path = location.pathname;
		var onDe = path === '/de' || path.indexOf('/de/') === 0;
		var saved = localStorage.getItem('x32.lang');
		var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
		var browserDe = nav.toLowerCase().indexOf('de') === 0;
		var want = saved === 'de' || saved === 'en' ? saved : browserDe || onDe ? 'de' : 'en';
		var target = null;
		if (want === 'de' && !onDe) target = '/de' + path;
		else if (want === 'en' && onDe) target = path.slice(3) || '/';
		if (target) location.replace(target + location.search + location.hash);
	} catch (e) {}

	// Theme: saved choice, otherwise follow the system.
	root.classList.add('js');
	var theme = 'dark';
	try {
		var t = localStorage.getItem('theme');
		if (t === 'light' || t === 'dark') theme = t;
		else if (window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light';
	} catch (e) {}
	root.dataset.theme = theme;
})();
