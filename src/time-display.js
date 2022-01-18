import { dateI18n, format } from "@wordpress/date";

export const TimeDisplay = (props) => {
	const { eventDate, eventDateEnd } = props;
	const startDate = format("Y-m-d", eventDate);
	const endDate = format("Y-m-d", eventDateEnd);
	if (startDate === endDate) {
		return (
			<div class="time-details">
				<time
					datetime={
						format("Y-m-d", eventDate) +
						"T" +
						format("h:i", eventDate) +
						format("O", eventDate)
					}
				>
					{format("F j, Y g:i a", eventDate)}
				</time>
				<span>–</span>
				<time
					datetime={
						format("Y-m-d", eventDateEnd) +
						"T" +
						format("h:i", eventDateEnd) +
						format("O", eventDateEnd)
					}
				>
					{format("g:i a", eventDateEnd) + dateI18n(" e", eventDateEnd)}
				</time>
			</div>
		);
	} else {
		return (
			<div class="time-details">
				<time
					datetime={
						format("Y-m-d", eventDate) +
						"T" +
						format("h:i", eventDate) +
						format("O", eventDate)
					}
				>
					{format("F j, Y g:i a", eventDate) + dateI18n(" e", eventDate)}
				</time>
				<span>–</span>
				<time
					datetime={
						format("Y-m-d", eventDateEnd) +
						"T" +
						format("h:i", eventDateEnd) +
						format("O", eventDateEnd)
					}
				>
					{format("F j, Y g:i a", eventDateEnd) + dateI18n(" e", eventDateEnd)}
				</time>
			</div>
		);
	}
};
