import { __ } from "@wordpress/i18n";
import {
	DateTimePicker,
	Dropdown,
	Button,
	PanelBody,
	Panel,
} from "@wordpress/components";
import { format, __experimentalGetSettings } from "@wordpress/date";
import { InspectorControls } from "@wordpress/block-editor";

import { BlockInfo } from "./block-info";

export const Inspector = (props) => {
	const dateSettings = __experimentalGetSettings();
	const timezone = dateSettings.timezone;
	const is12Hour = /a(?!\\)/i.test(
		dateSettings.formats.time
			.toLowerCase()
			.replace(/\\\\/g, "")
			.split("")
			.reverse()
			.join("")
	);
	const { eventDate, eventDateU, setAttributes, eventDateEnd } = props;

	function onChangeDate(value) {
		setAttributes({ eventDate: value });
		setAttributes({ eventDateU: timezone.string });
	}
	function onChangeDateEnd(value) {
		setAttributes({ eventDateEnd: value });
		setAttributes({ eventDateU: timezone.string });
	}

	const StartDatePicker = () => {
		return (
			<DateTimePicker
				currentDate={eventDate}
				onChange={onChangeDate}
				is12Hour={is12Hour}
			/>
		);
	};
	const EndDatePicker = () => {
		return (
			<DateTimePicker
				currentDate={eventDateEnd}
				onChange={onChangeDateEnd}
				is12Hour={is12Hour}
			/>
		);
	};
	return (
		<InspectorControls>
			<Panel title={__("Event Settings", "createwithrani-event-block")}>
				<PanelBody
					title={__("Event Settings", "createwithrani-event-block")}
					initialOpen={true}
				>
					<div className="createwithrani-date-button">
						<span>{__("Event Start", "createwithrani-event-block")}</span>
						<Dropdown
							position="bottom right"
							contentClassName="edit-post-post-schedule__dialog"
							renderToggle={({ isOpen, onToggle }) => (
								<Button isTertiary onClick={onToggle} aria-expanded={isOpen}>
									{eventDate
										? format("F j, Y g:i a", eventDate)
										: "Choose Date & Time"}
								</Button>
							)}
							renderContent={() => (
								<div>
									<StartDatePicker />
								</div>
							)}
						/>
					</div>
					<div className="createwithrani-date-button">
						<span>{__("Event End", "createwithrani-event-block")}</span>
						<Dropdown
							position="bottom right"
							contentClassName="edit-post-post-schedule__dialog"
							renderToggle={({ isOpen, onToggle }) => (
								<Button isTertiary onClick={onToggle} aria-expanded={isOpen}>
									{eventDateEnd
										? format("F j, Y g:i a", eventDateEnd)
										: "Choose Date & Time"}
								</Button>
							)}
							renderContent={() => (
								<div>
									<EndDatePicker />
								</div>
							)}
						/>
					</div>
				</PanelBody>
			</Panel>
			<BlockInfo />
		</InspectorControls>
	);
};
