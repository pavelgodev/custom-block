import {addLazyLoad} from "./addLazyLoad.js";

addLazyLoad();

window.addEventListener('load', (e) => {
	let accordionHeaders = document.querySelectorAll('.container');
	accordionHeaders.forEach(function (header, id) {
		header.addEventListener('click', function (e) {
			let targetItem = e.currentTarget.closest('.accordion__item');
			let isOpenItem = targetItem.classList.contains('accordion__item_show');
			let accordion = e.currentTarget.closest('.accordion__collapsed');
			if (accordion) {
				let items = accordion.querySelectorAll('.accordion__item');

				items.forEach(function (item) {
					item.classList.remove('accordion__item_show');
				});

				if (!isOpenItem) {
					targetItem.classList.add('accordion__item_show');
				}
			} else {
				targetItem.classList.toggle('accordion__item_show');
			}
		});
	})
});
