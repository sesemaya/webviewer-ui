import Icon from 'components/Icon';
import { zoomTo, fitToPage, fitToWidth } from 'helpers/zoom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import selectors from 'selectors';
import FlyoutMenu from '../FlyoutMenu/FlyoutMenu';
import OverlayItem from '../OverlayItem';
import ToolButton from '../ToolButton';
import './ZoomOverlay.scss';

function ZoomOverlay() {
  const [t] = useTranslation();

  const zoomList = useSelector(selectors.getZoomList);
  const isReaderMode = useSelector(selectors.isReaderMode);

  return (
    <FlyoutMenu menu="zoomOverlay" trigger="zoomOverlayButton" ariaLabel={t('component.zoomOverlay')}>
      <button className="ZoomItem" onClick={fitToWidth} aria-label={t('action.fitToWidth')} role="option">
        <Icon className="ZoomIcon" glyph="icon-header-zoom-fit-to-width" />
        <div className="ZoomLabel">{t('action.fitToWidth')}</div>
      </button>
      {!isReaderMode && (
        <button className="ZoomItem" onClick={fitToPage} aria-label={t('action.fitToPage')} role="option">
          <Icon className="ZoomIcon" glyph="icon-header-zoom-fit-to-page" />
          <div className="ZoomLabel">{t('action.fitToPage')}</div>
        </button>
      )}
      <div className="divider" />
      {zoomList.map((zoomValue, i) => (
        <OverlayItem key={i} onClick={() => zoomTo(zoomValue)} buttonName={`${zoomValue * 100}%`} role="option" />
      ))}
      {!isReaderMode && (
        <>
          <div className="dividerSmall" />
          <ToolButton className="ZoomItem ZoomToolButton" img="icon-header-zoom-marquee" toolName="MarqueeZoomTool" label={t('tool.Marquee')} />
        </>
      )}
    </FlyoutMenu>
  );
}

export default ZoomOverlay;
