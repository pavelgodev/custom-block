import {
	useBlockProps,
	InnerBlocks,
	RichText
} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {

	const {heading, isCollapsed} = attributes;
	const blockProps = useBlockProps.save({
		className: isCollapsed ? "accordion accordion__collapsed" : "accordion"
	});

	return (
		<div {...blockProps}>
			<RichText.Content
				tagName="h3"
				value={heading}
			/>
			<InnerBlocks.Content/>
		</div>
	);
}
