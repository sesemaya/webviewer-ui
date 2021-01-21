import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FocusTrap } from '@pdftron/webviewer-react-toolkit';

import core from 'core';
import actions from 'actions';
import selectors from 'selectors';
import { Swipeable } from 'react-swipeable';
import './ShareModal.scss';

const ShareModal = () => {
  const [isDisabled, isOpen] = useSelector(state => [
    selectors.isElementDisabled(state, 'shareModal'),
    selectors.isElementOpen(state, 'shareModal')
  ]);

  const dispatch = useDispatch();
  const [t] = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.getElementById('ShareURL').innerHTML = encodeURIComponent(`${docViewer.getCurrentPage()},${docViewer.getScrollViewElement().scrollLeft},${docViewer.getScrollViewElement().scrollTop},${docViewer.getZoom()}`);

      dispatch(
        actions.closeElements([
          'errorModal',
          'loadingModal',
          'printModal',
          'progressModal'
        ]),
      );
    }
  }, [dispatch, isOpen]);

  const closeModal = () => {
    dispatch(actions.closeElement('shareModal'));
  };

  const modalClass = classNames({
    Modal: true,
    ShareModal: true,
    open: isOpen,
    closed: !isOpen,
  });

  return isDisabled ? null : (
    <Swipeable
      onSwipedUp={closeModal}
      onSwipedDown={closeModal}
      preventDefaultTouchmoveEvent
    >
      <FocusTrap locked={isOpen}>
        <div
          className={modalClass}
          data-element="shareModal"
          onMouseDown={closeModal}
        >
          <div
            className="container"
            onMouseDown={e => e.stopPropagation()}
          >
            <div className="swipe-indicator" />
             <p>p=<span id="ShareURL" /></p>
          </div>
        </div>
      </FocusTrap>
    </Swipeable>
  );
};

export default ShareModal;
