import { __ } from "@wordpress/i18n";
import {
	DateTimePicker,
	ToggleControl,
	Dropdown,
	Button,
	PanelRow,
	PanelBody,
	Panel,
} from "@wordpress/components";
import { useSelect, useDispatch, withSelect } from "@wordpress/data";
import { dateI18n } from "@wordpress/date";
import { useState } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";

export const Inspector = (props) => {
	const { eventDate, eventDateU, setAttributes } = props;
	function onChangeDate(value) {
		setAttributes({ eventDate: value });
		setAttributes({ eventDateU: dateI18n("U", value) });
	}
	const DatePicker = () => {
		return (
			<DateTimePicker
				currentDate={eventDate}
				onChange={onChangeDate}
				is12Hour={true}
			/>
		);
	};
	return (
		<InspectorControls>
			<Panel title={__("Content Settings", "raniblocks-event-block")}>
				<PanelBody className="raniblocks-date-button">
					<span>{__("Event Date", "raniblocks-event-block")}</span>
					<Dropdown
						position="bottom right"
						contentClassName="edit-post-post-schedule__dialog"
						renderToggle={({ isOpen, onToggle }) => (
							<Button isTertiary onClick={onToggle} aria-expanded={isOpen}>
								{eventDate
									? dateI18n("F j, Y g:i a", eventDate)
									: "Date & Time"}
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
