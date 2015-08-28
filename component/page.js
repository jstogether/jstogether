import React from 'react';
import Component from './component';


export default class Page extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		if (!this.renderHeaderItem) throw new Error('[PageComponent] You must provide a "renderHeaderItem" function');
		if (!this.renderItem) throw new Error('[PageComponent] You must provide a "renderItem" function');
		if (!this.renderContent) throw new Error('[PageComponent] You must provide a "renderContent" function');	

		this._bind(
			'renderList',
			'renderContent',
			'renderPage',
			'renderItem'
		);
	}

	/**
	 *
	 */
	renderList (config) {
		const {items, selectedItem} = config;

		const headerItem = (
			<li
				key='headerItem'
				className='itemShort headerItem'>
				{this.renderHeaderItem()}
			</li>
		);

		const renderedItems = items.map((item, i) => {
			const isSelected = item === selectedItem;

			return (
				<li
					key={i}
					className={'itemShort' + (isSelected ? ' selected' : '')}
					onClick={this.generateItemClickHandler(item)}>
					{this.renderItem(item)}
				</li>
			);
		});

		return [headerItem, ...renderedItems];
	}

	/**
	 *
	 */
	renderPage (config) {
		const renderedItems = this.renderList(config);
		const renderedContent = this.renderContent();

		return (
			<div className='pageContainer'>
				<div className='listContainer'>
					<ul className='list'>
						{renderedItems}
					</ul>
				</div>

				<div className={'contentContainer'}>
					{renderedContent}
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	generateItemClickHandler () {
		return;
	}
}