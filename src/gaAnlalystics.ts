// Set to the same value as the web property used on the site
export const GA_PROPERTY = 'G-D3GT5HVZRG';

// Disable tracking if the opt-out cookie exists.
export const GA_DISABLE_COOKIE_STR = 'ga-disable-' + GA_PROPERTY;
/*if (document.cookie.indexOf(disableStr + '=true') > -1) {
	// @ts-ignore
	window[disableStr] = true;
}*/

// Opt-out function
/** Use true to opt out */
export default function gaSetState(state: boolean): void {
	document.cookie = GA_DISABLE_COOKIE_STR + `=${state ? "true" : "false"}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
	// @ts-ignore
	window[GA_DISABLE_COOKIE_STR] = state;
}
