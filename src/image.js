import { __ } from "@wordpress/i18n";
import {
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
} from "@wordpress/block-editor";
import {
	ToolbarGroup,
	ToolbarButton,
	Placeholder,
} from "@wordpress/components";
import { Button, Modal, TextControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { ResponsiveWrapper } from "@wordpress/components";

const MEDIA_LIBRARY_BUTTON_CLASS = "editor-media-placeholder__button";

export const ImageComponent = (props) => {
	const { setAttributes, imgId, imgUrl } = props;
	const { media } = useSelect((select) => ({
		media: select("core").getMedia(imgId),
	}));
	function setImg(media) {
		setAttributes({ imgId: media.id });
		setAttributes({ imgUrl: media.url });
	}
	return (
		<>
			{/* {!imgId && ( */}
			<MediaUploadCheck>
				<MediaUpload
					onSelect={setImg}
					value={imgId}
					allowedTypes={["image"]}
					render={({ open }) => (
						<Button
							className={
								!imgId
									? "editor-post-featured-image__toggle"
									: "editor-post-featured-image__preview"
							}
							onClick={open}
						>
							{!imgId && __("Choose an image", "auroobablocks")}
							{media && (
								<ResponsiveWrapper
									naturalWidth={media.media_details.width}
									naturalHeight={media.media_details.height}
								>
									<img src={media.source_url} />
								</ResponsiveWrapper>
							)}
						</Button>
					)}
				/>
			</MediaUploadCheck>

			{/* {media && (
				<ResponsiveWrapper
					naturalWidth={media.media_details.width}
					naturalHeight={media.media_details.height}
				>
					<img src={media.source_url} />
				</ResponsiveWrapper>
			)} */}
		</>
	);
};
