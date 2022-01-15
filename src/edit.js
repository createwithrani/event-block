import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import "./editor.scss";

const BLOCKS_TEMPLATE = [
	["core/image", {}],
	["core/heading", { level: 2 }],
	["core/paragraph", { placeholder: "Short event description.." }],
];

export default function Edit() {
	const blockProps = useBlockProps({});
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template: BLOCKS_TEMPLATE,
		templateLock: true,
	});
	return <div {...innerBlockProps} />;
}
