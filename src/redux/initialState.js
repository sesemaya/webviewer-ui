import React from 'react';

import ToggleZoomOverlay from 'components/ToggleZoomOverlay';
import ToolsOverlay from 'components/ToolsOverlay';
import actions from 'actions';
import defaultTool from 'constants/defaultTool';
import { defaultZoomList } from 'constants/zoomFactors';

import core from 'core';
import getHashParams from 'helpers/getHashParams';
import { copyMapWithDataProperties } from 'constants/map';
import Ribbons from 'components/Ribbons';

export default {
  advanced: {
    customCSS: getHashParams('css', null),
    defaultDisabledElements: getHashParams('disabledElements', ''),
    disableI18n: getHashParams('disableI18n', false),
    fullAPI: getHashParams('pdfnet', false),
    officeWorkerTransportPromise: null,
    pdfWorkerTransportPromise: null,
    preloadWorker: getHashParams('preloadWorker', false),
    serverUrl: getHashParams('server_url', ''),
    serverUrlHeaders: JSON.parse(getHashParams('serverUrlHeaders', '{}')),
    useSharedWorker: getHashParams('useSharedWorker', false)
  },
  document: {
    totalPages: 0,
    outlines: [],
    bookmarks: {},
    layers: [],
    printQuality: 1,
    passwordAttempts: -1,
    loadingProgress: 0,
  },
  search: {
    isAmbientString: false,
    isCaseSensitive: false,
    isRegex: false,
    isSearchUp: false,
    isWholeWord: false,
    isWildcard: false,
    results: [],
    value: ''
  },
  user: {
    isAdmin: getHashParams('admin', false),
    name: getHashParams('user', 'Guest')
  },
  viewer: {
    activeHeaderGroup: 'default',
    activeLeftPanel: 'thumbnailsPanel',
    activeTheme: 'light',
    activeToolGroup: '',
    activeToolName: 'AnnotationEdit',
    activeToolStyles: {},
    allowPageNavigation: true,
    annotationContentOverlayHandler: null,
    annotationPopup: [
      { dataElement: 'annotationCommentButton' },
      { dataElement: 'annotationStyleEditButton' },
      { dataElement: 'annotationDeleteButton' }
    ],
    canRedo: false,
    canUndo: false,
    colorMap: copyMapWithDataProperties('currentPalette', 'iconColor'),
    contextMenuPopup: [
      { dataElement: 'panToolButton' },
      { dataElement: 'highlightToolButton' },
      { dataElement: 'stickyToolButton' },
      { dataElement: 'freeTextToolButton' },
      { dataElement: 'freeHandToolButton' }
    ],
    currentPage: 1,
    customElementOverrides: {},
    customMeasurementOverlay: [],
    customModals: [],
    customNoteFilter: null,
    customPanels: [],
    customStamps: [],
    disabledElements: {},
    displayedSavedSignatures: [],
    displayedSignaturesFilterFunction: () => true,
    displayMode: 'Single',
    documentContainerHeight: null,
    documentContainerWidth: null,
    doesAutoLoad: getHashParams('auto_load', true),
    enableMouseWheelZoom: true,
    fitMode: '',
    headers: {
      default: [
        {
          dataElement: 'leftPanelButton',
          element: 'leftPanel',
          img: 'icon-header-sidebar-fill',
          title: 'component.leftPanel',
          type: 'toggleElementButton'
        },
        {
          className: 'custom-ribbons-container',
          render: () => <Ribbons />,
          type: 'customElement'
        },
        {
          dataElement: 'viewControlsButton',
          element: 'viewControlsOverlay',
          hidden: ['small-mobile'],
          img: 'icon-header-page manipulation-line',
          title: 'component.viewControlsOverlay',
          type: 'toggleElementButton'
        },
        {
          dataElement: 'zoomOverlayButton',
          element: 'zoomOverlay',
          hidden: ['small-mobile'],
          hiddenOnMobileDevice: true,
          render: () => <ToggleZoomOverlay />,
          type: 'customElement'
        },
        {
          hidden: ['small-mobile', 'mobile', 'tablet'],
          type: 'divider'
        },
        {
          toolName: 'Pan',
          type: 'toolButton'
        },
        {
          toolName: 'TextSelect',
          type: 'toolButton'
        },
        {
          hidden: ['small-mobile', 'mobile'],
          toolName: 'AnnotationEdit',
          type: 'toolButton'
        },
        {
          type: 'divider'
        },
        {
          dataElement: 'shareButton',
          element: 'shareModal',
          hidden: ['small-mobile'],
          img: 'icon-tool-link',
          title: 'component.sharePanel',
          type: 'toggleElementButton'
        },
        {
          dataElement: 'searchButton',
          element: 'searchPanel',
          hidden: ['small-mobile'],
          img: 'icon-header-search',
          title: 'component.searchPanel',
          type: 'toggleElementButton'
        },
        {
          dataElement: 'toggleNotesButton',
          element: 'notesPanel',
          hidden: ['small-mobile'],
          img: 'icon-header-chat-line',
          onClick: dispatch => {
            dispatch(actions.toggleElement('notesPanel'));
            // Trigger with a delay so we ensure the panel is open before we compute correct coordinates of annotation
            setTimeout(() => dispatch(actions.toggleElement('annotationNoteConnectorLine')), 400);
          },
          title: 'component.notesPanel',
          type: 'toggleElementButton'
        },
        {
          dataElement: 'menuButton',
          element: 'menuOverlay',
          hidden: ['small-mobile'],
          img: 'icon-header-settings-line',
          title: 'component.menuOverlay',
          type: 'toggleElementButton'
        },
        {
          dataElement: 'moreButton',
          hidden: ['mobile', 'tablet', 'desktop'],
          img: 'icon-tools-more',
          onClick: dispatch => {
            dispatch(actions.setActiveHeaderGroup('small-mobile-more-buttons'));
            core.setToolMode(defaultTool);
          },
          title: 'action.more',
          type: 'actionButton'
        },
      ],
      'small-mobile-more-buttons': [
        {
          dataElement: 'viewControlsButton',
          element: 'viewControlsOverlay',
          img: 'icon-header-page manipulation-line',
          title: 'component.viewControlsOverlay',
          type: 'toggleElementButton'
        },
        { type: 'divider' },
        {
          dataElement: 'zoomOverlayButton',
          element: 'zoomOverlay',
          hiddenOnMobileDevice: true,
          render: () => <ToggleZoomOverlay />,
          type: 'customElement'
        },
        {
          dataElement: 'shareButton',
          element: 'shareModal',
          img: 'icon-tool-link',
          title: 'component.sharePanel',
          type: 'toggleElementButton'
        },
        {
          dataElement: 'searchButton',
          element: 'searchPanel',
          img: 'icon-header-search',
          title: 'component.searchPanel',
          type: 'toggleElementButton'
        },
        {
          dataElement: 'toggleNotesButton',
          element: 'notesPanel',
          img: 'icon-header-chat-line',
          title: 'component.notesPanel',
          type: 'toggleElementButton'
        },
        {
          dataElement: 'menuButton',
          element: 'menuOverlay',
          img: 'icon-header-settings-line',
          title: 'component.menuOverlay',
          type: 'toggleElementButton'
        },
        { type: 'spacer' },
        { type: 'divider' },
        {
          dataElement: 'defaultHeaderButton',
          img: 'ic_close_black_24px',
          onClick: dispatch => {
            dispatch(actions.setActiveHeaderGroup('default'));
            core.setToolMode(defaultTool);
          },
          titile: 'action.close',
          type: 'actionButton'
        },
      ],
      'toolbarGroup-Annotate': [
        {
          dataElement: 'highlightToolGroupButton',
          title: 'annotation.highlight',
          toolGroup: 'highlightTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'underlineToolGroupButton',
          title: 'annotation.underline',
          toolGroup: 'underlineTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'squigglyToolGroupButton',
          title: 'annotation.squiggly',
          toolGroup: 'squigglyTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'strikeoutToolGroupButton',
          title: 'annotation.strikeout',
          toolGroup: 'strikeoutTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'stickyToolGroupButton',
          title: 'annotation.stickyNote',
          toolGroup: 'stickyTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'freeTextToolGroupButton',
          title: 'annotation.freetext',
          toolGroup: 'freeTextTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'shapeToolGroupButton',
          title: 'annotation.rectangle',
          toolGroup: 'rectangleTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'freeHandToolGroupButton',
          title: 'annotation.freehand',
          toolGroup: 'freeHandTools',
          type: 'toolGroupButton'
        },
        { type: 'divider' },
        {
          dataElement: 'toolsOverlay',
          hidden: ['small-mobile', 'mobile'],
          render: () => <ToolsOverlay />,
          type: 'customElement'
        },
        {
          dataElement: 'undoButton',
          img: 'icon-operation-undo',
          isNotClickableSelector: state => !state.viewer.canUndo,
          onClick: () => {
            core.undo();
          },
          title: 'action.undo',
          type: 'actionButton'
        },
        {
          dataElement: 'redoButton',
          img: 'icon-operation-redo',
          isNotClickableSelector: state => !state.viewer.canRedo,
          onClick: () => {
            core.redo();
          },
          title: 'action.redo',
          type: 'actionButton'
        },
        {
          toolName: 'AnnotationEraserTool',
          type: 'toolButton'
        }
      ],
      'toolbarGroup-Shapes': [
        {
          dataElement: 'freeHandToolGroupButton',
          title: 'annotation.freehand',
          toolGroup: 'freeHandTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'shapeToolGroupButton',
          title: 'annotation.rectangle',
          toolGroup: 'rectangleTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'ellipseToolGroupButton',
          title: 'annotation.ellipse',
          toolGroup: 'ellipseTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'polygonToolGroupButton',
          title: 'annotation.polygon',
          toolGroup: 'polygonTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'polygonCloudToolGroupButton',
          title: 'annotation.polygonCloud',
          toolGroup: 'cloudTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'lineToolGroupButton',
          title: 'annotation.line',
          toolGroup: 'lineTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'polyLineToolGroupButton',
          title: 'annotation.polyline',
          toolGroup: 'polyLineTools',
          type: 'toolGroupButton'
        },
        {
          dataElement: 'arrowToolGroupButton',
          title: 'annotation.arrow',
          toolGroup: 'arrowTools',
          type: 'toolGroupButton'
        },
        { type: 'divider' },
        {
          dataElement: 'toolsOverlay',
          hidden: ['small-mobile', 'mobile'],
          render: () => <ToolsOverlay />,
          type: 'customElement'
        },
        {
          dataElement: 'undoButton',
          img: 'icon-operation-undo',
          isNotClickableSelector: state => !state.viewer.canUndo,
          onClick: () => {
            core.undo();
          },
          title: 'action.undo',
          type: 'actionButton'
        },
        {
          dataElement: 'redoButton',
          img: 'icon-operation-redo',
          isNotClickableSelector: state => !state.viewer.canRedo,
          onClick: () => {
            core.redo();
          },
          title: 'action.redo',
          type: 'actionButton'
        },
        {
          toolName: 'AnnotationEraserTool',
          type: 'toolButton'
        }
      ],
      'toolbarGroup-View': [],
    },
    highContrastMode: getHashParams('highContrastMode', false),
    isAccessibleMode: getHashParams('accessibleMode', true),
    isFullScreen: false,
    isMultipleViewerMerging: false,
    isNoteEditing: false,
    isReaderMode: false,
    isReadOnly: getHashParams('readonly', false),
    isReplyDisabledFunc: null,
    isSnapModeEnabled: false,
    isThumbnailMerging: true,
    isThumbnailMultiselect: true,
    isThumbnailReordering: true,
    lastPickedToolForGroup: {},
    lastPickedToolGroup: {},
    maxSignaturesCount: 4,
    measurementUnits: {
      from: ['in', 'mm', 'cm', 'pt'],
      to: ['in', 'mm', 'cm', 'pt', 'ft', 'm', 'yd', 'km', 'mi'],
    },
    noteDateFormat: 'MMM D, h:mma',
    notePopupId: '',
    notesInLeftPanel: getHashParams('notesInLeftPanel', false),
    noteTransformFunction: null,
    openElements: {
      header: true,
      toolsHeader: true,
    },
    pageLabels: [],
    panelWidths: {
      leftPanel: 280,
      searchPanel: 280,
      notesPanel: 280,
    },
    printedNoteDateFormat: 'D/MM/YYYY h:mm:ss A',
    rotation: 0,
    savedSignatures: [],
    selectedDisplayedSignatureIndex: 0,
    selectedStampIndex: 0,
    selectedThumbnailPageIndexes: [],
    signatureFonts: ['GreatVibes-Regular'],
    sortStrategy: 'position',
    standardStamps: [],
    tab: {
      linkModal: 'URLPanelButton',
      rubberStampTab: 'standardStampPanelButton',
      signatureModal: 'inkSignaturePanelButton'
    },
    textPopup: [
      { dataElement: 'copyTextButton' },
      { dataElement: 'textHighlightToolButton' },
      { dataElement: 'textUnderlineToolButton' },
      { dataElement: 'textSquigglyToolButton' },
      { dataElement: 'textStrikeoutToolButton' },
      { dataElement: 'linkButton' }
    ],
    toolbarGroup: 'toolbarGroup-View',
    useEmbeddedPrint: false,
    userData: [],
    warning: {},
    zoom: 1,
    zoomList: defaultZoomList,


    // TODO: `toolButtonObjects`
    toolButtonObjects: {
      AnnotationCreateCountMeasurement: { dataElement: 'countMeasurementToolButton', title: 'annotation.countMeasurement', img: 'ic_check_black_24px', group: 'countTools', showColor: 'always' },
      AnnotationCreateCountMeasurement2: { dataElement: 'countMeasurementToolButton2', title: 'annotation.countMeasurement', img: 'ic_check_black_24px', group: 'countTools', showColor: 'always' },
      AnnotationCreateCountMeasurement3: { dataElement: 'countMeasurementToolButton3', title: 'annotation.countMeasurement', img: 'ic_check_black_24px', group: 'countTools', showColor: 'always' },
      AnnotationCreateCountMeasurement4: { dataElement: 'countMeasurementToolButton4', title: 'annotation.countMeasurement', img: 'ic_check_black_24px', group: 'countTools', showColor: 'always' },
      AnnotationCreateDistanceMeasurement: { dataElement: 'distanceMeasurementToolButton', title: 'annotation.distanceMeasurement', img: 'icon-tool-measurement-distance-line', group: 'distanceTools', showColor: 'always' },
      AnnotationCreateDistanceMeasurement2: { dataElement: 'distanceMeasurementToolButton2', title: 'annotation.distanceMeasurement', img: 'icon-tool-measurement-distance-line', group: 'distanceTools', showColor: 'always' },
      AnnotationCreateDistanceMeasurement3: { dataElement: 'distanceMeasurementToolButton3', title: 'annotation.distanceMeasurement', img: 'icon-tool-measurement-distance-line', group: 'distanceTools', showColor: 'always' },
      AnnotationCreateDistanceMeasurement4: { dataElement: 'distanceMeasurementToolButton4', title: 'annotation.distanceMeasurement', img: 'icon-tool-measurement-distance-line', group: 'distanceTools', showColor: 'always' },
      AnnotationCreatePerimeterMeasurement: { dataElement: 'perimeterMeasurementToolButton', title: 'annotation.perimeterMeasurement', img: 'icon-tool-measurement-perimeter', group: 'perimeterTools', showColor: 'always' },
      AnnotationCreatePerimeterMeasurement2: { dataElement: 'perimeterMeasurementToolButton2', title: 'annotation.perimeterMeasurement', img: 'icon-tool-measurement-perimeter', group: 'perimeterTools', showColor: 'always' },
      AnnotationCreatePerimeterMeasurement3: { dataElement: 'perimeterMeasurementToolButton3', title: 'annotation.perimeterMeasurement', img: 'icon-tool-measurement-perimeter', group: 'perimeterTools', showColor: 'always' },
      AnnotationCreatePerimeterMeasurement4: { dataElement: 'perimeterMeasurementToolButton4', title: 'annotation.perimeterMeasurement', img: 'icon-tool-measurement-perimeter', group: 'perimeterTools', showColor: 'always' },
      AnnotationCreateAreaMeasurement: { dataElement: 'areaMeasurementToolButton', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-polygon-line', group: 'areaTools', showColor: 'always' },
      AnnotationCreateAreaMeasurement2: { dataElement: 'areaMeasurementToolButton2', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-polygon-line', group: 'areaTools', showColor: 'always' },
      AnnotationCreateAreaMeasurement3: { dataElement: 'areaMeasurementToolButton3', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-polygon-line', group: 'areaTools', showColor: 'always' },
      AnnotationCreateAreaMeasurement4: { dataElement: 'areaMeasurementToolButton4', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-polygon-line', group: 'areaTools', showColor: 'always' },
      AnnotationCreateEllipseMeasurement: { dataElement: 'ellipseMeasurementToolButton', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-ellipse-line', group: 'ellipseAreaTools', showColor: 'always' },
      AnnotationCreateEllipseMeasurement2: { dataElement: 'ellipseMeasurementToolButton2', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-ellipse-line', group: 'ellipseAreaTools', showColor: 'always' },
      AnnotationCreateEllipseMeasurement3: { dataElement: 'ellipseMeasurementToolButton3', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-ellipse-line', group: 'ellipseAreaTools', showColor: 'always' },
      AnnotationCreateEllipseMeasurement4: { dataElement: 'ellipseMeasurementToolButton4', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-ellipse-line', group: 'ellipseAreaTools', showColor: 'always' },
      AnnotationCreateRectangularAreaMeasurement: { dataElement: 'rectangularAreaMeasurementToolButton', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-line', group: 'rectangleAreaTools', showColor: 'always' },
      AnnotationCreateRectangularAreaMeasurement2: { dataElement: 'rectangularAreaMeasurementToolButton2', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-line', group: 'rectangleAreaTools', showColor: 'always' },
      AnnotationCreateRectangularAreaMeasurement3: { dataElement: 'rectangularAreaMeasurementToolButton3', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-line', group: 'rectangleAreaTools', showColor: 'always' },
      AnnotationCreateRectangularAreaMeasurement4: { dataElement: 'rectangularAreaMeasurementToolButton4', title: 'annotation.areaMeasurement', img: 'icon-tool-measurement-area-line', group: 'rectangleAreaTools', showColor: 'always' },
      AnnotationCreateFreeHand: { dataElement: 'freeHandToolButton', title: 'annotation.freehand', img: 'icon-tool-pen-line', group: 'freeHandTools', showColor: 'always' },
      AnnotationCreateFreeHand2: { dataElement: 'freeHandToolButton2', title: 'annotation.freehand', img: 'icon-tool-pen-line', group: 'freeHandTools', showColor: 'always' },
      AnnotationCreateFreeHand3: { dataElement: 'freeHandToolButton3', title: 'annotation.freehand', img: 'icon-tool-pen-line', group: 'freeHandTools', showColor: 'always' },
      AnnotationCreateFreeHand4: { dataElement: 'freeHandToolButton4', title: 'annotation.freehand', img: 'icon-tool-pen-line', group: 'freeHandTools', showColor: 'always' },
      AnnotationCreateTextHighlight: { dataElement: 'highlightToolButton', title: 'annotation.highlight', img: 'icon-tool-text-manipulation-highlight', group: 'highlightTools', showColor: 'always' },
      AnnotationCreateTextHighlight2: { dataElement: 'highlightToolButton2', title: 'annotation.highlight', img: 'icon-tool-text-manipulation-highlight', group: 'highlightTools', showColor: 'always' },
      AnnotationCreateTextHighlight3: { dataElement: 'highlightToolButton3', title: 'annotation.highlight', img: 'icon-tool-text-manipulation-highlight', group: 'highlightTools', showColor: 'always' },
      AnnotationCreateTextHighlight4: { dataElement: 'highlightToolButton4', title: 'annotation.highlight', img: 'icon-tool-text-manipulation-highlight', group: 'highlightTools', showColor: 'always' },
      AnnotationCreateTextUnderline: { dataElement: 'underlineToolButton', title: 'annotation.underline', img: 'icon-tool-text-manipulation-underline', group: 'underlineTools', showColor: 'always' },
      AnnotationCreateTextUnderline2: { dataElement: 'underlineToolButton2', title: 'annotation.underline', img: 'icon-tool-text-manipulation-underline', group: 'underlineTools', showColor: 'always' },
      AnnotationCreateTextUnderline3: { dataElement: 'underlineToolButton3', title: 'annotation.underline', img: 'icon-tool-text-manipulation-underline', group: 'underlineTools', showColor: 'always' },
      AnnotationCreateTextUnderline4: { dataElement: 'underlineToolButton4', title: 'annotation.underline', img: 'icon-tool-text-manipulation-underline', group: 'underlineTools', showColor: 'always' },
      AnnotationCreateTextSquiggly: { dataElement: 'squigglyToolButton', title: 'annotation.squiggly', img: 'icon-tool-text-manipulation-squiggly', group: 'squigglyTools', showColor: 'always' },
      AnnotationCreateTextSquiggly2: { dataElement: 'squigglyToolButton2', title: 'annotation.squiggly', img: 'icon-tool-text-manipulation-squiggly', group: 'squigglyTools', showColor: 'always' },
      AnnotationCreateTextSquiggly3: { dataElement: 'squigglyToolButton3', title: 'annotation.squiggly', img: 'icon-tool-text-manipulation-squiggly', group: 'squigglyTools', showColor: 'always' },
      AnnotationCreateTextSquiggly4: { dataElement: 'squigglyToolButton4', title: 'annotation.squiggly', img: 'icon-tool-text-manipulation-squiggly', group: 'squigglyTools', showColor: 'always' },
      AnnotationCreateTextStrikeout: { dataElement: 'strikeoutToolButton', title: 'annotation.strikeout', img: 'icon-tool-text-manipulation-strikethrough', group: 'strikeoutTools', showColor: 'always' },
      AnnotationCreateTextStrikeout2: { dataElement: 'strikeoutToolButton2', title: 'annotation.strikeout', img: 'icon-tool-text-manipulation-strikethrough', group: 'strikeoutTools', showColor: 'always' },
      AnnotationCreateTextStrikeout3: { dataElement: 'strikeoutToolButton3', title: 'annotation.strikeout', img: 'icon-tool-text-manipulation-strikethrough', group: 'strikeoutTools', showColor: 'always' },
      AnnotationCreateTextStrikeout4: { dataElement: 'strikeoutToolButton4', title: 'annotation.strikeout', img: 'icon-tool-text-manipulation-strikethrough', group: 'strikeoutTools', showColor: 'always' },
      AnnotationCreateFreeText: { dataElement: 'freeTextToolButton', title: 'annotation.freetext', img: 'icon-tool-text-free-text', group: 'freeTextTools', showColor: 'always' },
      AnnotationCreateFreeText2: { dataElement: 'freeTextToolButton2', title: 'annotation.freetext', img: 'icon-tool-text-free-text', group: 'freeTextTools', showColor: 'always' },
      AnnotationCreateFreeText3: { dataElement: 'freeTextToolButton3', title: 'annotation.freetext', img: 'icon-tool-text-free-text', group: 'freeTextTools', showColor: 'always' },
      AnnotationCreateFreeText4: { dataElement: 'freeTextToolButton4', title: 'annotation.freetext', img: 'icon-tool-text-free-text', group: 'freeTextTools', showColor: 'always' },
      AnnotationCreateCallout: { dataElement: 'calloutToolButton', title: 'annotation.callout', img: 'icon-tool-callout-line', group: 'calloutTools', showColor: 'always' },
      AnnotationCreateCallout2: { dataElement: 'calloutToolButton2', title: 'annotation.callout', img: 'icon-tool-callout-line', group: 'calloutTools', showColor: 'always' },
      AnnotationCreateCallout3: { dataElement: 'calloutToolButton3', title: 'annotation.callout', img: 'icon-tool-callout-line', group: 'calloutTools', showColor: 'always' },
      AnnotationCreateCallout4: { dataElement: 'calloutToolButton4', title: 'annotation.callout', img: 'icon-tool-callout-line', group: 'calloutTools', showColor: 'always' },
      AnnotationCreateSticky: { dataElement: 'stickyToolButton', title: 'annotation.stickyNote', img: 'icon-tool-comment-line', group: 'stickyTools', showColor: 'always' },
      AnnotationCreateSticky2: { dataElement: 'stickyToolButton2', title: 'annotation.stickyNote', img: 'icon-tool-comment-line', group: 'stickyTools', showColor: 'always' },
      AnnotationCreateSticky3: { dataElement: 'stickyToolButton3', title: 'annotation.stickyNote', img: 'icon-tool-comment-line', group: 'stickyTools', showColor: 'always' },
      AnnotationCreateSticky4: { dataElement: 'stickyToolButton4', title: 'annotation.stickyNote', img: 'icon-tool-comment-line', group: 'stickyTools', showColor: 'always' },
      AnnotationCreateRectangle: { dataElement: 'rectangleToolButton', title: 'annotation.rectangle', img: 'icon-tool-shape-rectangle', group: 'rectangleTools', showColor: 'always' },
      AnnotationCreateRectangle2: { dataElement: 'rectangleToolButton2', title: 'annotation.rectangle', img: 'icon-tool-shape-rectangle', group: 'rectangleTools', showColor: 'always' },
      AnnotationCreateRectangle3: { dataElement: 'rectangleToolButton3', title: 'annotation.rectangle', img: 'icon-tool-shape-rectangle', group: 'rectangleTools', showColor: 'always' },
      AnnotationCreateRectangle4: { dataElement: 'rectangleToolButton4', title: 'annotation.rectangle', img: 'icon-tool-shape-rectangle', group: 'rectangleTools', showColor: 'always' },
      AnnotationCreateEllipse: { dataElement: 'ellipseToolButton', title: 'annotation.ellipse', img: 'icon-tool-shape-oval', group: 'ellipseTools', showColor: 'always' },
      AnnotationCreateEllipse2: { dataElement: 'ellipseToolButton2', title: 'annotation.ellipse', img: 'icon-tool-shape-oval', group: 'ellipseTools', showColor: 'always' },
      AnnotationCreateEllipse3: { dataElement: 'ellipseToolButton3', title: 'annotation.ellipse', img: 'icon-tool-shape-oval', group: 'ellipseTools', showColor: 'always' },
      AnnotationCreateEllipse4: { dataElement: 'ellipseToolButton4', title: 'annotation.ellipse', img: 'icon-tool-shape-oval', group: 'ellipseTools', showColor: 'always' },
      AnnotationCreateLine: { dataElement: 'lineToolButton', title: 'annotation.line', img: 'icon-tool-shape-line', group: 'lineTools', showColor: 'always' },
      AnnotationCreateLine2: { dataElement: 'lineToolButton2', title: 'annotation.line', img: 'icon-tool-shape-line', group: 'lineTools', showColor: 'always' },
      AnnotationCreateLine3: { dataElement: 'lineToolButton3', title: 'annotation.line', img: 'icon-tool-shape-line', group: 'lineTools', showColor: 'always' },
      AnnotationCreateLine4: { dataElement: 'lineToolButton4', title: 'annotation.line', img: 'icon-tool-shape-line', group: 'lineTools', showColor: 'always' },
      AnnotationCreatePolyline: { dataElement: 'polylineToolButton', title: 'annotation.polyline', img: 'icon-tool-shape-polyline', group: 'polyLineTools', showColor: 'always' },
      AnnotationCreatePolyline2: { dataElement: 'polylineToolButton2', title: 'annotation.polyline', img: 'icon-tool-shape-polyline', group: 'polyLineTools', showColor: 'always' },
      AnnotationCreatePolyline3: { dataElement: 'polylineToolButton3', title: 'annotation.polyline', img: 'icon-tool-shape-polyline', group: 'polyLineTools', showColor: 'always' },
      AnnotationCreatePolyline4: { dataElement: 'polylineToolButton4', title: 'annotation.polyline', img: 'icon-tool-shape-polyline', group: 'polyLineTools', showColor: 'always' },
      AnnotationCreatePolygon: { dataElement: 'polygonToolButton', title: 'annotation.polygon', img: 'icon-tool-shape-polygon', group: 'polygonTools', showColor: 'always' },
      AnnotationCreatePolygon2: { dataElement: 'polygonToolButton2', title: 'annotation.polygon', img: 'icon-tool-shape-polygon', group: 'polygonTools', showColor: 'always' },
      AnnotationCreatePolygon3: { dataElement: 'polygonToolButton3', title: 'annotation.polygon', img: 'icon-tool-shape-polygon', group: 'polygonTools', showColor: 'always' },
      AnnotationCreatePolygon4: { dataElement: 'polygonToolButton4', title: 'annotation.polygon', img: 'icon-tool-shape-polygon', group: 'polygonTools', showColor: 'always' },
      AnnotationCreatePolygonCloud: { dataElement: 'cloudToolButton', title: 'annotation.polygonCloud', img: 'icon-tool-shape-cloud', group: 'cloudTools', showColor: 'always' },
      AnnotationCreatePolygonCloud2: { dataElement: 'cloudToolButton2', title: 'annotation.polygonCloud', img: 'icon-tool-shape-cloud', group: 'cloudTools', showColor: 'always' },
      AnnotationCreatePolygonCloud3: { dataElement: 'cloudToolButton4', title: 'annotation.polygonCloud', img: 'icon-tool-shape-cloud', group: 'cloudTools', showColor: 'always' },
      AnnotationCreatePolygonCloud4: { dataElement: 'cloudToolButton5', title: 'annotation.polygonCloud', img: 'icon-tool-shape-cloud', group: 'cloudTools', showColor: 'always' },
      AnnotationCreateArrow: { dataElement: 'arrowToolButton', title: 'annotation.arrow', img: 'icon-tool-shape-arrow', group: 'arrowTools', showColor: 'always' },
      AnnotationCreateArrow2: { dataElement: 'arrowToolButton2', title: 'annotation.arrow', img: 'icon-tool-shape-arrow', group: 'arrowTools', showColor: 'always' },
      AnnotationCreateArrow3: { dataElement: 'arrowToolButton3', title: 'annotation.arrow', img: 'icon-tool-shape-arrow', group: 'arrowTools', showColor: 'always' },
      AnnotationCreateArrow4: { dataElement: 'arrowToolButton4', title: 'annotation.arrow', img: 'icon-tool-shape-arrow', group: 'arrowTools', showColor: 'always' },
      AnnotationCreateSignature: { dataElement: 'signatureToolButton', title: 'annotation.signature', img: 'icon-tool-signature', group: 'signatureTools', showColor: 'never' },
      AnnotationCreateFileAttachment: { dataElement: 'fileAttachmentToolButton', title: 'annotation.fileattachment', img: 'ic_fileattachment_24px', group: 'fileAttachmentTools', showColor: 'never' },
      AnnotationCreateStamp: { dataElement: 'stampToolButton', title: 'annotation.stamp', img: 'icon-tool-image-line', group: 'stampTools', showColor: 'active' },
      AnnotationCreateRubberStamp: { dataElement: 'rubberStampToolButton', title: 'annotation.rubberStamp', img: 'icon-tool-stamp-line', group: 'rubberStampTools', showColor: 'active' },
      CropPage: { dataElement: 'cropToolButton', title: 'annotation.crop', img: 'ic_crop_black_24px', showColor: 'never', group: 'cropTools' },
      AnnotationCreateRedaction: { dataElement: 'redactionButton', title: 'option.redaction.markForRedaction', img: 'icon-tool-redaction-area', group: 'redactionTools', showColor: 'never' },
      Pan: { dataElement: 'panToolButton', title: 'tool.pan', img: 'icon-header-pan', showColor: 'never' },
      AnnotationEdit: { dataElement: 'selectToolButton', title: 'tool.select', img: 'multi select', showColor: 'never' },
      TextSelect: { dataElement: 'textSelectButton', img: 'icon - header - select - line', showColor: 'never' },
      MarqueeZoomTool: { dataElement: 'marqueeToolButton', showColor: 'never' },
      AnnotationEraserTool: { dataElement: 'eraserToolButton', title: 'annotation.eraser', img: 'icon-operation-eraser', showColor: 'never' },
    },
  }
};
