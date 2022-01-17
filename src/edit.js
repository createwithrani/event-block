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
import "./editor.scss";

const BLOCKS_TEMPLATE = [
	["core/heading", { level: 2 }],
	["core/paragraph", { placeholder: "Short event description.." }],
];

export default function edit(props) {
	const { imgId, imgUrl, eventDate, eventDateU, buttonText, eventInfo } =
		props.attributes;
	const { clientId } = props;
	const { setAttributes } = props;
	const [eventInformation, setEventInformation] = useState(eventInfo);
	const blockProps = useBlockProps({});
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template: BLOCKS_TEMPLATE,
		templateLock: true,
	});
	const { currentBlock } = useSelect((select) => ({
		currentBlock: select("core/block-editor").getBlock(clientId),
	}));

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

	return (
		<>
			<Inspector
				eventDate={eventDate}
				eventDateU={eventDateU}
				setAttributes={setAttributes}
			/>
			<div {...innerBlockProps}>
				<ImageComponent
					setAttributes={setAttributes}
					imgId={imgId}
					imgUrl={imgUrl}
				/>
				<div className="details">
					{eventDate && (
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
					)}
					{innerBlockProps.children}
					<RichText
						tagName="span"
						value={buttonText}
						allowedFormats={[]}
						onChange={(content) => setAttributes({ buttonText: content })}
						placeholder={__("Add to Calendar text...")}
					/>
				</div>
			</div>
		</>
	);
}
