import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { dateI18n } from "@wordpress/date";

import { ImageComponent } from "./image";
import { Inspector } from "./inspector";
import "./editor.scss";

const BLOCKS_TEMPLATE = [
	["core/heading", { level: 2 }],
	["core/paragraph", { placeholder: "Short event description.." }],
];

export default function edit(props) {
	const { imgId, imgUrl, eventDate, eventDateU } = props.attributes;
	const { setAttributes } = props;
	const blockProps = useBlockProps({});
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template: BLOCKS_TEMPLATE,
		templateLock: true,
	});

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
								dateI18n("Y-m-d", eventDate) + "T" + dateI18n("h:iO", eventDate)
							}
						>
							{dateI18n("F j, Y g:i a e", eventDate)}
						</time>
					)}
					{innerBlockProps.children}
				</div>
			</div>
		</>
	);
}
