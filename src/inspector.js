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
	const { eventDate, eventDateU, setAttributes } = props;

	function onChangeDate(value) {
		setAttributes({ eventDate: value });
		setAttributes({ eventDateU: timezone.string });
	}

	const DatePicker = () => {
		return (
			<DateTimePicker
				currentDate={eventDate}
				onChange={onChangeDate}
				is12Hour={is12Hour}
			/>
		);
	};
	return (
		<InspectorControls>
			<Panel title={__("Content Settings", "createwithrani-event-block")}>
				<PanelBody className="createwithrani-date-button">
					<span>{__("Event Date", "createwithrani-event-block")}</span>
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
								<DatePicker />
							</div>
						)}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
};
