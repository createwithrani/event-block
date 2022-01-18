import { PanelBody, Panel } from "@wordpress/components";
export const BlockInfo = () => {
	return (
		<Panel>
			<PanelBody>
				<div class="block-info">
					<p>
						More features are coming soon! Learn more on the{" "}
						<a
							href="https://createwithrani.com/"
							target="_blank"
							rel="noopener"
						>
							block's website
						</a>
						!
					</p>
				</div>
			</PanelBody>
		</Panel>
	);
};
