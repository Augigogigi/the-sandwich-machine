export function prettyDate(date, startDate) {
	let secs = Math.floor((date.getTime() - startDate.getTime()) / 1000);
	if (secs < 60) return secs + " sec(s) ago";
	if (secs < 3600) return Math.floor(secs / 60) + " min(s) ago";
	if (secs < 86400) return Math.floor(secs / 3600) + " hour(s) ago";
	if (secs < 604800) return Math.floor(secs / 86400) + " day(s) ago";
	return date.toDateString();
}