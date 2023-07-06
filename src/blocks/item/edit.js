import {__} from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	PlainText,
	MediaPlaceholder
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import {background} from "../../../../../../wp-includes/js/codemirror/csslint";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const blockProps = useBlockProps({className: 'accordion__item accordion__item_show'});

	const {title, content, isItemOpen, heightContent, imageUrl, imageAlt} = attributes;

	const onChangeTitle = (newTitle) => {
		setAttributes({title: newTitle})
	}

	const onChangeContent = (newContent) => {
		setAttributes({content: newContent})
	}

	const onChangeIsItemOpen = () => {
		setAttributes({isItemOpen: !isItemOpen})
	}

	const onChangeHeightContent = (newHeightContent) => {
		setAttributes({heightContent: newHeightContent});
	}

	const toggleImagePlaceholder = (openEvent) => {
		if(imageUrl) {
			return (
				<img
					src={imageUrl}
					alt={imageAlt}
					onClick={openEvent}
					className="item-image"
				/>
			);
		}
		else {
			return (
				<MediaPlaceholder
					onSelect = { img => { setAttributes({ imageAlt: img.alt, imageUrl: img.url }); } }
					allowedTypes = { [ 'image' ] }
					multiple = { false }
					labels = { { title: 'Upload image' } }
				>
				</MediaPlaceholder>
			);
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Item Settings')}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Should this item be open?"
								help={
									isItemOpen
										? 'Yes'
										: 'No'
								}
								onChange={onChangeIsItemOpen}
								checked={isItemOpen}
							/>
							<RangeControl
								help="Please select how restrict height of content."
								initialPosition={50}
								value={heightContent}
								label="Restriction of content by height"
								max={300}
								min={30}
								onChange={onChangeHeightContent}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className='container'>
					<RichText
						onChange={onChangeTitle}
						value={title}
						className='accordion__header'
						placeholder={__('Write your title...')}
					/>
					<div className='icon-close'></div>
				</div>
				<div className="row">
					<RichText
						onChange={onChangeContent}
						value={content}
						className='accordion__body col-1'
						style={{height: heightContent}}
						placeholder={__('Write your content...')}
					/>
					<div className="col-2">
						<MediaUpload
							onSelect={ img => { setAttributes({ imageAlt: img.alt, imageUrl: img.url }); } }
							type="image"
							value={ attributes.imageID }
							render={ ({ open }) => toggleImagePlaceholder(open) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
