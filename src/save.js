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

import { TimeDisplay } from "./time-display";
import { gCal } from "./gcal";
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
	const {
		imgUrl,
		eventDate,
		buttonText,
		eventInfo,
		eventDateU,
		eventDateEnd,
	} = attributes;
	const calendarUrl = gCal(eventInfo, eventDate, eventDateEnd, eventDateU);
	console.log("save " + buttonText);
	return (
		<div {...useBlockProps.save()}>
			<figure>
				<img src={imgUrl} />
			</figure>
			<div class="details">
				{eventDate && (
					<TimeDisplay eventDate={eventDate} eventDateEnd={eventDateEnd} />
				)}
				<InnerBlocks.Content />
				<a
					href={calendarUrl}
					target="_blank"
					rel="noopener"
					class="add-to-cal-link"
				>
					<RichText.Content tagName="span" value={buttonText} />
				</a>
			</div>
		</div>
	);
}
