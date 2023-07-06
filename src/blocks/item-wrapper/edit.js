import {__} from '@wordpress/i18n';

import {
	useBlockProps, InnerBlocks, RichText, InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	ToggleControl,
} from '@wordpress/components';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const ALLOWED_BLOCKS = ['cb/item'];
	const blockProps = useBlockProps({className: 'accordion'});

	const {heading, isCollapsed} = attributes;

	const onChangeHeading = (newHeading) => {
		setAttributes({heading: newHeading})
	}

	const onChangeIsCollapsed = () => {
		setAttributes({isCollapsed: !isCollapsed})
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Item Wrapper Settings')}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Accordion's items should be collapsed during interaction"
								help={
									isCollapsed
										? 'Yes'
										: 'No'
								}
								onChange={onChangeIsCollapsed}
								checked={isCollapsed}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<RichText
					onChange={onChangeHeading}
					tagName='h3'
					value={heading}
					className='accordion__heading'
					placeholder={__('Write your heading...')}
				/>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS}/>
			</div>
		</>
	);
}
