import { Select, Spin } from 'antd';
import { useAutoComplete } from 'hooks/queryBuilder/useAutoComplete';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
	IBuilderQueryForm,
	TagFilter,
} from 'types/api/queryBuilder/queryBuilderData';
import { v4 as uuid } from 'uuid';

import { selectStyle } from './config';
import { StyledCheckOutlined } from './style';
import TagRender from './TagRender';

function QueryBuilderSearch({
	query,
	onChange,
}: QueryBuilderSearchProps): JSX.Element {
	const {
		handleClearTag,
		handleKeyDown,
		handleSearch,
		handleSelect,
		tags,
		options,
		searchValue,
		isMulti,
		isFetching,
	} = useAutoComplete(query);

	const onChangeHandler = (value: string[]): void => {
		if (!isMulti) handleSearch(value[value.length - 1]);
	};

	const onInputKeyDownHandler = (event: React.KeyboardEvent<Element>): void => {
		if (isMulti || event.key === 'Backspace') handleKeyDown(event);
	};

	const queryTags = useMemo(() => {
		if (!query.aggregateAttribute.key) return [];
		return tags;
	}, [query.aggregateAttribute.key, tags]);

	useEffect(() => {
		const initialTagFilters: TagFilter = { items: [], op: 'AND' };
		initialTagFilters.items = tags.map((tag) => {
			const [tagKey, tagOperator, ...tagValue] = tag.split(' ');
			return {
				id: uuid().slice(0, 8),
				key: tagKey,
				op: tagOperator,
				value: tagValue.map((i) => i.replace(',', '')),
			};
		});
		onChange(initialTagFilters);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tags]);

	const tagRender = useCallback(
		(props: CustomTagProps) =>
			TagRender({
				closable: props.closable,
				disabled: props.disabled,
				label: props.label,
				onClose: props.onClose,
				query,
				value: props.value,
			}),
		[query],
	);

	return (
		<Select
			virtual
			showSearch
			tagRender={tagRender}
			filterOption={!isMulti}
			autoClearSearchValue={false}
			mode="multiple"
			placeholder="Search Filter"
			value={queryTags}
			searchValue={searchValue}
			disabled={!query.aggregateAttribute.key}
			style={selectStyle}
			onSearch={handleSearch}
			onChange={onChangeHandler}
			onSelect={handleSelect}
			onDeselect={handleClearTag}
			onInputKeyDown={onInputKeyDownHandler}
			notFoundContent={isFetching ? <Spin size="small" /> : null}
		>
			{options?.map((option) => (
				<Select.Option key={option.value} value={option.value}>
					{option.value}
					{option.selected && <StyledCheckOutlined />}
				</Select.Option>
			))}
		</Select>
	);
}

interface QueryBuilderSearchProps {
	query: IBuilderQueryForm;
	onChange: (value: TagFilter) => void;
}

export interface CustomTagProps {
	label: React.ReactNode;
	value: string;
	disabled: boolean;
	onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	closable: boolean;
}

export default QueryBuilderSearch;
