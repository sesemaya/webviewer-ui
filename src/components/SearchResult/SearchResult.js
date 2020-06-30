import React from 'react';
import { withContentRect } from 'react-measure';
import PropTypes from 'prop-types';

import './SearchResult.scss';
import VirtualizedList from "react-virtualized/dist/commonjs/List";
import CellMeasurer, { CellMeasurerCache } from "react-virtualized/dist/commonjs/CellMeasurer";
import ListSeparator from "components/ListSeparator";

const SearchResultListSeparatorPropTypes = {
  currentResultIndex: PropTypes.number.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  translate: PropTypes.func.isRequired,
  pageLabels: PropTypes.arrayOf(PropTypes.any).isRequired,
};

function SearchResultListSeparator(props) {
  const { currentResultIndex, searchResults, translate, pageLabels } = props;

  const previousIndex = currentResultIndex === 0 ? currentResultIndex : currentResultIndex - 1;
  const currentListItem = searchResults[currentResultIndex];
  const previousListItem = searchResults[previousIndex];

  const isFirstListItem = previousListItem === currentListItem;
  const isInDifferentPage = previousListItem.pageNum !== currentListItem.pageNum;

  if (isFirstListItem || isInDifferentPage) {
    const listSeparatorText = `${translate('option.shared.page')} ${pageLabels[currentListItem.pageNum - 1]}`;
    return (
      <ListSeparator>{listSeparatorText}</ListSeparator>
    );
  }
  return null;
}

SearchResultListSeparator.propTypes = SearchResultListSeparatorPropTypes;

const SearchResultListItemPropTypes = {
  result: PropTypes.object.isRequired,
  currentResultIndex: PropTypes.number.isRequired,
  activeResultIndex: PropTypes.number.isRequired,
  onSearchResultClick: PropTypes.func,
};

function SearchResultListItem(props) {
  const { result, currentResultIndex, activeResultIndex, onSearchResultClick } = props;
  const { ambientStr, resultStrStart, resultStrEnd, resultStr } = result;
  const textBeforeSearchValue = ambientStr.slice(0, resultStrStart);
  const searchValue = ambientStr === '' ? resultStr : ambientStr.slice(resultStrStart, resultStrEnd);
  const textAfterSearchValue = ambientStr.slice(resultStrEnd);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button" tabIndex="-1"
      className={`SearchResult ${currentResultIndex === activeResultIndex ? 'selected' : ''}`}
      onClick={() => {
        if (onSearchResultClick) {
          onSearchResultClick(currentResultIndex, result);
        }
      }}
    >
      {textBeforeSearchValue}
      <span className="search-value">{searchValue}</span>
      {textAfterSearchValue}
    </div>
  );
}
SearchResultListItem.propTypes = SearchResultListItemPropTypes;

const SearchResultPropTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  activeResultIndex: PropTypes.number,
  noSearchResult: PropTypes.bool,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  translate: PropTypes.func.isRequired,
  onClickResult: PropTypes.func,
  pageLabels: PropTypes.arrayOf(PropTypes.any),
};

function SearchResult(props) {
  const { width, height, activeResultIndex, noSearchResult, searchResults = [], translate, onClickResult, pageLabels } = props;
  const cellMeasureCache = React.useMemo(() => {
    return new CellMeasurerCache({ defaultHeight: 50, fixedWidth: true });
  }, [width]);

  if (searchResults.length === 0) {
    // clear measure cache, when doing a new search
    cellMeasureCache.clearAll();
  }

  const rowRenderer = React.useCallback(function rowRendererCallback(rendererOptions) {
    const { index, key, parent, style } = rendererOptions;
    const result = searchResults[index];

    return (
      <CellMeasurer
        cache={cellMeasureCache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <div ref={registerChild} style={style}>
            <SearchResultListSeparator
              currentResultIndex={index}
              searchResults={searchResults}
              pageLabels={pageLabels}
              translate={translate}
            />
            <SearchResultListItem
              result={result}
              currentResultIndex={index}
              activeResultIndex={activeResultIndex}
              onSearchResultClick={onClickResult}
            />
          </div>
        )}
      </CellMeasurer>
    );
  }, [cellMeasureCache, searchResults, activeResultIndex]);

  if (width == null || height == null) { // eslint-disable-line eqeqeq
    // VirtualizedList requires width and height of the component which is calculated by withContentRect HOC.
    // On first render when HOC haven't yet set these values, both are undefined, thus having this check here
    // and skip rendering if values are missing
    return null;
  }

  if (noSearchResult) {
    return (
      <div className="info">{translate('message.noResults')}</div>
    );
  }

  return (
    <VirtualizedList
      width={width}
      height={height}
      overscanRowCount={10}
      rowCount={searchResults.length}
      deferredMeasurementCache={cellMeasureCache}
      rowHeight={cellMeasureCache.rowHeight}
      rowRenderer={rowRenderer}
    />
  );
}
SearchResult.propTypes = SearchResultPropTypes;

function SearchResultWithContentRectHOC(props) {
  const { measureRef, contentRect, ...rest } = props;
  const { width, height } = contentRect.bounds;
  return (
    <div className="results" ref={measureRef}>
      <SearchResult width={width} height={height} {...rest} />
    </div>
  );
}
SearchResultWithContentRectHOC.propTypes = {
  contentRect: PropTypes.object,
  measureRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
};

export default withContentRect('bounds')(SearchResultWithContentRectHOC);
