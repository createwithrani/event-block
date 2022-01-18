import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { dateI18n, format } from "@wordpress/date";
import { useState } from "@wordpress/element";

import { ImageComponent } from "./image";
import { Inspector } from "./inspector";
import { gCal } from "./gcal";
import { TimeDisplay } from "./time-display";
import "./editor.scss";

// Our Event Block Template!
const BLOCKS_TEMPLATE = [
	["core/heading", { level: 2 }],
	["core/paragraph", { placeholder: "Short event description.." }],
];

export default function edit(props) {
	const {
		imgId,
		imgUrl,
		eventDate,
		eventDateU,
		buttonText,
		eventInfo,
		eventDateEnd,
	} = props.attributes;
	const { clientId, setAttributes } = props;

	// Set up inner block props with the innerblock template, locked to stop changes/additions
	const blockProps = useBlockProps({});
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template: BLOCKS_TEMPLATE,
		templateLock: true,
	});

	// Grab the current block object so we can check when its inner blocks change
	const { currentBlock } = useSelect((select) => ({
		currentBlock: select("core/block-editor").getBlock(clientId),
	}));

	// Initialize state variables for event title/desc
	const [eventInformation, setEventInformation] = useState(eventInfo);

	// Whenever the inner blocks change, save their content to the eventInfo object for calendar event creation
	currentBlock.innerBlocks.map((block) => {
		if (
			"core/heading" === block.name &&
			block.attributes.content !== eventInformation["eventTitle"]
		) {
			setEventInformation({
				...eventInformation,
				eventTitle: block.attributes.content,
			});
		}
		if (
			"core/paragraph" === block.name &&
			block.attributes.content !== eventInformation["eventDesc"]
		) {
			setEventInformation({
				...eventInformation,
				eventDesc: block.attributes.content,
			});
		}
	});
	setAttributes({ eventInfo: eventInformation });

	function updateButtonText(value) {
		// console.log("value " + value);
		setAttributes({ buttonText: value });
		// console.log("edit " + buttonText);
	}

	const calendarUrl = gCal(eventInfo, eventDate, eventDateEnd, eventDateU);

	//And then we display it all
	return (
		<>
			<Inspector
				eventDate={eventDate}
				eventDateU={eventDateU}
				setAttributes={setAttributes}
				eventDateEnd={eventDateEnd}
			/>
			<div {...innerBlockProps}>
				<ImageComponent
					setAttributes={setAttributes}
					imgId={imgId}
					imgUrl={imgUrl}
				/>
				<div className="details">
					{eventDate && (
						<TimeDisplay eventDate={eventDate} eventDateEnd={eventDateEnd} />
					)}
					{(!eventDate || !eventDateEnd) && (
						<span class="placeholder-time">
							Set up event date and time in the Inspector
						</span>
					)}
					{innerBlockProps.children}
					<a
						href={calendarUrl}
						target="_blank"
						rel="noopener"
						class="add-to-cal-link"
					>
						<RichText
							tagName="span"
							value={buttonText}
							allowedFormats={[]}
							onChange={updateButtonText}
							placeholder={__("Add to Calendar text...")}
						/>
					</a>
				</div>
			</div>
		</>
	);
}
