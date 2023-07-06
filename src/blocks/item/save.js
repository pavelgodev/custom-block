import {
	useBlockProps,
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
	const {title, content, isItemOpen, heightContent, imageUrl, imageAlt} = attributes;

	const blockProps = useBlockProps.save();

	const defaultSrc = require('../../../assets/images/loading.gif');
	const itemImage = (dataSrc, alt, defaultSrc) => {
		if (!dataSrc) return null;

		if (alt) {
			return (
				<img
					className="item-image lazy"
					src={defaultSrc}
					data-src={dataSrc}
					alt={alt}
				/>
			);
		}

		return (
			<img
				className="item-image lazy"
				src={defaultSrc}
				data-src={dataSrc}
				alt=""
			/>
		);
	};

	const overflowY = heightContent ? "scroll" : "none";

	return (
		<div
			{...blockProps}
			className={isItemOpen ? "accordion__item accordion__item_show" : "accordion__item"}
		>
			<div className='container'>
				<RichText.Content
					tagName="div"
					value={title}
					className="accordion__header"
				/>
				<div className='icon-close'></div>
				<div className='accordion__header_divider'></div>
			</div>
			<div class="row accordion__body"
				 style={{height: heightContent, overflowY: overflowY}}>
				<RichText.Content
					tagName="div"
					value={content}
					className="col-1 item-text"
				/>
				<div className="col-2">
					{itemImage(imageUrl, imageAlt, defaultSrc)}
				</div>
			</div>
		</div>
	);
}
