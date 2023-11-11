/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import ServerSideRender from '@wordpress/server-side-render';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { TextControl, ColorPalette } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {

	const {

		attributes : { token, location, backgroundColor},
		setAttributes,

	} = props;

	return (

		< div { ...useBlockProps( )} >

			<InspectorControls key="setting">

			<div>

				<fieldset>

					<TextControl
					 label = "Weather API Token"
					 help  = "Here you need to enter your weather API key"
					 value = {token}
					 onChange={(token)=>setAttributes ({token:token})}
					 />

					<TextControl
					 label = "Location"
					 help  = "Here you need to enter your weather Location"
					 value = {location}
					 onChange={(location)=>setAttributes ({location:location})}
					 />

					<ColorPalette
					value={backgroundColor}
					onChange={ (backgroundColor)=>setAttributes({backgroundColor:backgroundColor}) }
					/>

				</fieldset>

			</div>

			</InspectorControls>

			<ServerSideRender

				block="weather-block/weather-block"
				attributes={props.attributes}

			/>

		</div>


	);
}
