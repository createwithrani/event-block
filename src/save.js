/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";
import { dateI18n, format, gmdate, gmdateI18n } from "@wordpress/date";
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { imgUrl, eventDate, buttonText, eventInfo, eventDateU } = attributes;
	const eventTitle = eventInfo["eventTitle"];
	const eventDesc = eventInfo["eventDesc"];
	const calendarUrl =
		"http://www.google.com/calendar/event?action=TEMPLATE&text=" +
		encodeURI(eventTitle) +
		"&dates=" +
		format("Ymd", eventDate) +
		"T" +
		format("His", eventDate) +
		"/" +
		format("Ymd", eventDate) +
		"T" +
		format("His", eventDate) +
		"&ctz=" +
		eventDateU +
		"&details=" +
		encodeURI(eventDesc);

	return (
		<div {...useBlockProps.save()}>
			<figure>
				<img src={imgUrl} />
			</figure>
			<div class="details">
				{eventDate && (
					<time
						datetime={
							dateI18n("Y-m-d", eventDate) +
							"T" +
							dateI18n("h:i", eventDate) +
							dateI18n("O", eventDate)
						}
					>
						{format("F j, Y g:i a", eventDate) + dateI18n(" e", eventDate)}
					</time>
				)}
				<InnerBlocks.Content />
				<a href={calendarUrl} target="_blank">
					<RichText.Content tagName="span" value={buttonText} />
				</a>
			</div>
		</div>
	);
}
