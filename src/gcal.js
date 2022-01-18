import { dateI18n, format, gmdate, gmdateI18n } from "@wordpress/date";

export function gCal(eventInfo, eventDate, eventDateEnd, eventDateU) {
	const eventTitle = eventInfo["eventTitle"];
	const eventDesc = eventInfo["eventDesc"];

	//create Google Calendar URL from the provided information
	const calendarUrl =
		"http://www.google.com/calendar/event?action=TEMPLATE&text=" +
		encodeURI(eventTitle) +
		"&dates=" +
		format("Ymd", eventDate) +
		"T" +
		format("His", eventDate) +
		"/" +
		format("Ymd", eventDateEnd) +
		"T" +
		format("His", eventDateEnd) +
		"&ctz=" +
		eventDateU +
		"&details=" +
		encodeURI(eventDesc);
	return calendarUrl;
}
