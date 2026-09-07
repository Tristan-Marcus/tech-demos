/**
 * Generates src/data/icons.generated.ts from the hand-picked lists below.
 *
 *   bun run curate
 *
 * Every name is validated against @hugeicons/core-free-icons at generation
 * time, so a typo or a renamed icon fails loudly here instead of at runtime.
 * The output uses named imports so Vite tree-shakes the pack down to what is
 * listed. Base names are preferred over numbered variants (Home01Icon, ...)
 * unless the numbered one is clearly the canonical shape.
 */
import * as Free from '@hugeicons/core-free-icons'

type CollectionSpec = {
  id: string
  label: string
  blurb: string
  keywords: string[]
  names: string[]
}

const collections: CollectionSpec[] = [
  {
    id: 'interface',
    label: 'Interface',
    blurb: 'Navigation, actions and status glyphs every product needs.',
    keywords: ['ui', 'app', 'nav', 'action'],
    names: [
      'Home01Icon', 'Home09Icon', 'Menu01Icon', 'Menu09Icon', 'MenuTwoLineIcon', 'MoreHorizontalIcon', 'MoreVerticalIcon',
      'Search01Icon', 'SearchListIcon', 'FilterIcon', 'FilterHorizontalIcon', 'Settings01Icon', 'Settings02Icon',
      'Notification01Icon', 'Notification03Icon', 'NotificationOff01Icon', 'BellIcon', 'BellRingIcon',
      'UserIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMultipleIcon', 'UserAddIcon', 'UserSettingsIcon',
      'Calendar03Icon', 'CalendarCheckIcon', 'Clock01Icon', 'ClockCheckIcon', 'Time01Icon',
      'Mail01Icon', 'MailOpenIcon', 'MailSendIcon', 'Message01Icon', 'MessageMultipleIcon', 'Comment01Icon', 'ChatIcon',
      'Add01Icon', 'PlusSignIcon', 'PlusSignCircleIcon', 'MinusSignIcon', 'Cancel01Icon', 'CancelCircleIcon',
      'Tick01Icon', 'TickDoubleIcon', 'CheckmarkCircle01Icon', 'CheckmarkBadge01Icon',
      'InformationCircleIcon', 'Alert01Icon', 'AlertCircleIcon', 'HelpCircleIcon',
      'Delete01Icon', 'Delete02Icon', 'Edit01Icon', 'Edit02Icon', 'PencilEdit01Icon', 'Copy01Icon', 'CopyLinkIcon',
      'Link01Icon', 'LinkSquare01Icon', 'Share01Icon', 'Share08Icon', 'Download01Icon', 'Download04Icon', 'Upload01Icon',
      'StarIcon', 'FavouriteIcon', 'Bookmark01Icon', 'BookmarkAdd01Icon', 'ViewIcon', 'ViewOffIcon', 'EyeIcon',
      'Logout01Icon', 'Login01Icon', 'Loading03Icon', 'RefreshIcon', 'ReloadIcon', 'SortingIcon', 'SortByDown01Icon',
      'ZoomInAreaIcon', 'ZoomOutAreaIcon', 'PinIcon', 'PinOffIcon', 'Tag01Icon', 'TagsIcon', 'LabelIcon', 'Flag01Icon',
      'CommandIcon', 'KeyboardIcon', 'CursorPointer01Icon', 'MouseIcon', 'ToggleOnIcon', 'ToggleOffIcon',
      'SidebarLeftIcon', 'SidebarRightIcon', 'LayoutGridIcon', 'LayoutListIcon', 'DashboardSquare01Icon', 'DashboardCircleIcon',
      'GridViewIcon', 'ListViewIcon', 'Grid2X2Icon', 'Grid3X3Icon',
      'Sun01Icon', 'Moon02Icon', 'DarkModeIcon', 'Globe02Icon', 'Location01Icon', 'MapsIcon', 'Navigation03Icon',
      'LockIcon', 'LockOpenIcon', 'Shield01Icon', 'ShieldCheckIcon',
      'Maximize01Icon', 'Minimize01Icon', 'FullScreenIcon', 'ArrowExpandIcon', 'ArrowShrinkIcon',
      'ThumbsUpIcon', 'ThumbsDownIcon', 'SmileIcon', 'Rocket01Icon', 'SparklesIcon', 'CircleIcon', 'SquareIcon',
    ],
  },
  {
    id: 'arrows',
    label: 'Arrows',
    blurb: 'Direction, motion and every chevron you will ever need.',
    keywords: ['direction', 'chevron', 'navigate', 'back', 'next'],
    names: [
      'ArrowUp01Icon', 'ArrowDown01Icon', 'ArrowLeft01Icon', 'ArrowRight01Icon',
      'ArrowUp02Icon', 'ArrowDown02Icon', 'ArrowLeft02Icon', 'ArrowRight02Icon',
      'ArrowUpRight01Icon', 'ArrowUpLeft01Icon', 'ArrowDownRight01Icon', 'ArrowDownLeft01Icon',
      'ArrowUpDoubleIcon', 'ArrowDownDoubleIcon', 'ArrowLeftDoubleIcon', 'ArrowRightDoubleIcon',
      'ArrowUpDownIcon', 'ArrowLeftRightIcon', 'ArrowHorizontalIcon', 'ArrowVerticalIcon', 'ArrowAllDirectionIcon',
      'ArrowDiagonalIcon', 'ArrowExpandDiagonalIcon', 'ArrowExpand01Icon', 'ArrowShrink01Icon',
      'ArrowDataTransferHorizontalIcon', 'ArrowDataTransferVerticalIcon', 'ArrowDataTransferDiagonalIcon',
      'ArrowTurnBackwardIcon', 'ArrowTurnForwardIcon', 'ArrowTurnUpIcon', 'ArrowTurnDownIcon',
      'ArrowReloadHorizontalIcon', 'ArrowReloadVerticalIcon',
      'ArrowMoveUpLeftIcon', 'ArrowMoveUpRightIcon', 'ArrowMoveDownLeftIcon', 'ArrowMoveDownRightIcon',
      'ArrowUpFromLineIcon', 'ArrowDownToLineIcon', 'ArrowLeftFromLineIcon', 'ArrowRightToLineIcon',
      'ArrowUpBigIcon', 'ArrowDownBigIcon', 'ArrowLeftBigIcon', 'ArrowRightBigIcon',
      'ArrowUpAzIcon', 'ArrowDownZaIcon', 'ArrowUpWideNarrowIcon', 'ArrowDownNarrowWideIcon',
      'ChevronUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon',
      'ChevronsUpIcon', 'ChevronsDownIcon', 'ChevronsLeftIcon', 'ChevronsRightIcon',
      'ChevronsLeftRightIcon', 'ChevronsRightLeftIcon', 'ChevronsDownUpIcon', 'ChevronFirstIcon', 'ChevronLastIcon',
      'CircleArrowUp01Icon', 'CircleArrowDown01Icon', 'CircleArrowLeft01Icon', 'CircleArrowRight01Icon',
      'CircleArrowUpRightIcon', 'CircleArrowDownLeftIcon', 'CircleArrowReloadIcon', 'CircleArrowExpandIcon',
      'SquareArrowUp01Icon', 'SquareArrowDown01Icon', 'SquareArrowLeft01Icon', 'SquareArrowRight01Icon',
      'SquareArrowUpRightIcon', 'SquareArrowRightEnterIcon', 'SquareArrowRightExitIcon',
      'CornerUpLeftIcon', 'CornerUpRightIcon', 'CornerDownLeftIcon', 'CornerDownRightIcon',
      'UndoIcon', 'RedoIcon', 'UndoDotIcon', 'RedoDotIcon', 'RotateLeftIcon', 'RotateRightIcon', 'RotateCwIcon', 'RotateCcwIcon',
      'MoveIcon', 'MoveUpIcon', 'MoveDownIcon', 'MoveLeftIcon', 'MoveRightIcon', 'MoveDiagonalIcon',
      'ExchangeIcon', 'RepeatIcon', 'RepeatOneIcon', 'ShuffleIcon', 'LinkBackwardIcon', 'LinkForwardIcon',
      'ExpandIcon', 'ShrinkIcon', 'MaximizeIcon', 'MinimizeIcon',
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    blurb: 'Bars, lines, pies and the data plumbing behind them.',
    keywords: ['data', 'analytics', 'graph', 'stats', 'metric'],
    names: [
      'ChartIcon', 'ChartUpIcon', 'ChartDownIcon', 'ChartIncreaseIcon', 'ChartDecreaseIcon', 'ChartAverageIcon',
      'ChartLineIcon', 'ChartLineDataIcon', 'ChartSplineIcon', 'ChartAreaIcon',
      'ChartBarBigIcon', 'ChartBarIncreasingIcon', 'ChartBarDecreasingIcon', 'ChartBarStackedIcon', 'ChartBarLineIcon',
      'ChartColumnIcon', 'ChartColumnBigIcon', 'ChartColumnIncreasingIcon', 'ChartColumnDecreasingIcon', 'ChartColumnStackedIcon',
      'ChartNoAxesColumnIcon', 'ChartNoAxesColumnIncreasingIcon', 'ChartNoAxesCombinedIcon', 'ChartNoAxesGanttIcon',
      'ChartHistogramIcon', 'ChartScatterIcon', 'ChartBubbleIcon', 'ChartRadarIcon', 'ChartRoseIcon', 'ChartRingIcon',
      'ChartCandlestickIcon', 'ChartHighLowIcon', 'ChartGanttIcon', 'ChartNetworkIcon', 'ChartRelationshipIcon',
      'ChartBreakoutCircleIcon', 'ChartBreakoutSquareIcon', 'ChartMaximumIcon', 'ChartMinimumIcon', 'ChartEvaluationIcon',
      'PieChartIcon', 'PieChartSquareIcon', 'PieIcon', 'BarChartIcon', 'BarChartHorizontalIcon',
      'AnalyticsUpIcon', 'AnalyticsDownIcon', 'AnalyticsIcon', 'TrendingUpIcon', 'TrendingDownIcon', 'TrendingUpDownIcon',
      'PresentationBarChartIcon', 'PresentationLineChartIcon', 'PresentationIcon',
      'DatabaseIcon', 'DatabaseSyncIcon', 'DatabaseExportIcon', 'DatabaseImportIcon', 'DatabaseBackupIcon', 'DatabaseSearchIcon',
      'DatabaseZapIcon', 'DatabaseLockedIcon', 'DataRecoveryIcon',
      'FileChartLineIcon', 'FileChartColumnIcon', 'FileChartPieIcon', 'FileSpreadsheetIcon', 'TableIcon', 'GridTableIcon',
      'DashboardSpeed01Icon', 'CircleGaugeIcon', 'PercentCircleIcon', 'ActivityIcon', 'Target01Icon', 'DiscoverCircleIcon',
    ],
  },
  {
    id: 'media',
    label: 'Media',
    blurb: 'Playback, capture and everything with a waveform.',
    keywords: ['audio', 'video', 'photo', 'music', 'player'],
    names: [
      'PlayIcon', 'PlayCircleIcon', 'PlaySquareIcon', 'PauseIcon', 'PauseCircleIcon', 'StopIcon', 'StopCircleIcon', 'RecordIcon',
      'NextIcon', 'PreviousIcon', 'ForwardIcon', 'BackwardIcon', 'FastForwardIcon', 'RewindIcon', 'RepeatIcon', 'RepeatOffIcon', 'ShuffleIcon',
      'VolumeHighIcon', 'VolumeLowIcon', 'VolumeMuteIcon', 'VolumeOffIcon', 'VolumeUpIcon', 'VolumeMinusIcon', 'MuteIcon', 'SpeakerIcon',
      'MusicNote01Icon', 'MusicNoteSquareIcon', 'PlaylistIcon', 'PlayListAddIcon', 'PlayListFavouriteIcon', 'AlbumIcon', 'VynilIcon',
      'AudioWaveIcon', 'AudioLinesIcon', 'AudioWaveformIcon', 'WaveIcon', 'WaveSquareIcon',
      'Mic01Icon', 'MicOff01Icon', 'MicVocalIcon', 'PodcastIcon', 'RadioIcon', 'HeadphonesIcon', 'HeadphoneMuteIcon',
      'Camera01Icon', 'CameraOffIcon', 'CameraLensIcon', 'CameraVideoIcon', 'CameraTripodIcon', 'CameraRotatedIcon',
      'Video01Icon', 'VideoOffIcon', 'VideoReplayIcon', 'ClapperboardIcon', 'FilmIcon', 'FilmRollIcon', 'VideotapeIcon',
      'Image01Icon', 'ImageAddIcon', 'ImageCropIcon', 'ImageUploadIcon', 'ImageNotFoundIcon', 'ImagesIcon', 'ImageCompositionIcon',
      'GalleryHorizontalIcon', 'GalleryVerticalIcon', 'GalleryThumbnailsIcon',
      'PictureInPictureIcon', 'PictureInPictureExitIcon', 'TvIcon', 'TvMinimalPlayIcon', 'TvSmartIcon',
      'AirplayIcon', 'StopWatchIcon', 'Timer01Icon', 'Film01Icon', 'MusicIcon',
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    blurb: 'Money in, money out, and the plastic in between.',
    keywords: ['money', 'payment', 'commerce', 'shop', 'currency'],
    names: [
      'WalletIcon', 'WalletAddIcon', 'WalletDoneIcon', 'WalletCardsIcon', 'WalletMinimalIcon', 'WalletNotFoundIcon', 'PurseIcon',
      'CreditCardIcon', 'CreditCardAddIcon', 'CreditCardAcceptIcon', 'CreditCardPosIcon', 'CreditCardFreezeIcon', 'CreditCardValidationIcon',
      'MoneyIcon', 'MoneyBagIcon', 'MoneyAddIcon', 'MoneySendIcon', 'MoneyReceiveIcon', 'MoneyExchangeIcon', 'MoneySafeIcon', 'MoneySavingJarIcon',
      'CashIcon', 'CashbackIcon', 'BanknoteIcon', 'BanknoteArrowUpIcon', 'BanknoteArrowDownIcon', 'CoinsIcon', 'CoinsSwapIcon', 'CoinsDollarIcon',
      'DollarIcon', 'DollarCircleIcon', 'DollarSquareIcon', 'EuroIcon', 'EuroCircleIcon', 'PoundIcon', 'PoundCircleIcon', 'YenIcon', 'YenCircleIcon',
      'BitcoinIcon', 'BitcoinCircleIcon', 'BitcoinWalletIcon', 'EthereumIcon', 'CoinbaseIcon',
      'BankIcon', 'AtmIcon', 'SafeIcon', 'SafeBoxIcon', 'VaultIcon', 'PiggyBankIcon', 'SavingsIcon',
      'InvoiceIcon', 'ReceiptIcon', 'ReceiptTextIcon', 'ReceiptDollarIcon', 'PaymentIcon', 'PaymentSuccessIcon', 'TaxesIcon',
      'PercentIcon', 'PercentSquareIcon', 'DiscountIcon', 'DiscountTagIcon', 'SaleTagIcon', 'CouponIcon', 'CouponPercentIcon', 'GiftIcon', 'GiftCardIcon',
      'ShoppingCartIcon', 'ShoppingCartAddIcon', 'ShoppingCartCheckIcon', 'ShoppingBagIcon', 'ShoppingBagCheckIcon', 'ShoppingBasketIcon',
      'StoreIcon', 'StoreLocationIcon', 'StoreVerifiedIcon', 'ShopSignIcon', 'CashierIcon',
      'TradeUpIcon', 'TradeDownIcon', 'ExchangeDollarIcon', 'BadgeDollarSignIcon', 'BadgePercentIcon',
      'TicketIcon', 'TicketPercentIcon', 'TicketStarIcon', 'ChartCandlestickIcon', 'StripeIcon', 'PaypalIcon',
    ],
  },
  {
    id: 'files',
    label: 'Files',
    blurb: 'Documents, folders and the states they get into.',
    keywords: ['document', 'folder', 'storage', 'attachment'],
    names: [
      'File01Icon', 'File02Icon', 'FileAddIcon', 'FileRemoveIcon', 'FileEditIcon', 'FileCheckIcon', 'FileXIcon',
      'FileSearchIcon', 'FileDownloadIcon', 'FileUploadIcon', 'FileExportIcon', 'FileImportIcon', 'FileSyncIcon',
      'FileTextIcon', 'FileCodeIcon', 'FileBracesIcon', 'FileScriptIcon', 'FileTerminalIcon', 'FileDatabaseIcon', 'FileDiffIcon',
      'FileImageIcon', 'FileVideoIcon', 'FileAudioIcon', 'FileMusicIcon', 'FileZipIcon', 'FileArchiveIcon', 'FilePlayIcon',
      'FileLockIcon', 'FileUnlockedIcon', 'FileKeyIcon', 'FileSecurityIcon', 'FileVerifiedIcon', 'FileValidationIcon',
      'FileStarIcon', 'FileHeartIcon', 'FilePinIcon', 'FileBookmarkIcon', 'FileLinkIcon', 'FileAttachmentIcon', 'FileCloudIcon',
      'FileClockIcon', 'FileCorruptIcon', 'FileNotFoundIcon', 'FileEmptyIcon', 'FileQuestionMarkIcon', 'FileShredderIcon',
      'FileStackIcon', 'FilesIcon', 'Files01Icon', 'FileManagementIcon', 'FileSpreadsheetIcon', 'FileDollarIcon',
      'Folder01Icon', 'Folder02Icon', 'FolderOpenIcon', 'FolderClosedIcon', 'FolderAddIcon', 'FolderRemoveIcon', 'FolderCheckIcon', 'FolderXIcon',
      'FolderSearchIcon', 'FolderDownloadIcon', 'FolderUploadIcon', 'FolderSyncIcon', 'FolderCloudIcon', 'FolderExportIcon', 'FolderImportIcon',
      'FolderLockIcon', 'FolderUnlockedIcon', 'FolderKeyIcon', 'FolderSecurityIcon', 'FolderSharedIcon', 'FolderLinksIcon',
      'FolderCodeIcon', 'FolderGitIcon', 'FolderKanbanIcon', 'FolderTreeIcon', 'FolderRootIcon', 'FolderLibraryIcon',
      'FolderFavouriteIcon', 'FolderHeartIcon', 'FolderPinIcon', 'FolderZipIcon', 'FolderArchiveIcon', 'FolderVideoIcon', 'FolderMusicIcon',
      'FolderDetailsIcon', 'FolderManagementIcon', 'FolderTransferIcon', 'FoldersIcon', 'FolderFileStorageIcon',
      'ClipboardIcon', 'ClipboardCheckIcon', 'ClipboardCopyIcon', 'ClipboardListIcon', 'ClipboardPasteIcon',
      'AttachmentIcon', 'PaperclipIcon', 'Archive01Icon', 'ArchiveIcon', 'InboxIcon', 'Book01Icon', 'BookOpen01Icon', 'Note01Icon', 'StickyNoteIcon',
    ],
  },
  {
    id: 'devices',
    label: 'Devices',
    blurb: 'Hardware, connectivity and the state of your battery.',
    keywords: ['hardware', 'phone', 'computer', 'connectivity'],
    names: [
      'SmartPhone01Icon', 'SmartPhoneLandscapeIcon', 'SmartphoneChargingIcon', 'SmartphoneNfcIcon', 'SmartphoneWifiIcon', 'SmartphoneLostWifiIcon',
      'PhoneIcon', 'PhoneLockIcon', 'PhoneOffIcon', 'PhoneCheckIcon', 'PhoneDeveloperModeIcon', 'PhoneShakeIcon',
      'Call02Icon', 'CallIncomingIcon', 'CallOutgoingIcon', 'CallMissedIcon', 'CallEndIcon', 'CallRingingIcon', 'TelephoneIcon',
      'TabletIcon', 'TabletPenIcon', 'TabletSmartphoneIcon', 'TabletConnectedWifiIcon',
      'LaptopIcon', 'LaptopMinimalIcon', 'LaptopChargingIcon', 'LaptopProgrammingIcon', 'LaptopSettingsIcon', 'LaptopVideoIcon', 'LaptopPerformanceIcon',
      'ComputerIcon', 'ComputerDeskIcon', 'ComputerTerminalIcon', 'ComputerProgrammingIcon', 'ComputerCloudIcon', 'ComputerProtectionIcon',
      'MonitorIcon', 'MonitorDotIcon', 'MonitorPlayIcon', 'MonitorSmartphoneIcon', 'MonitorSpeakerIcon', 'MonitorOffIcon', 'MonitorCogIcon',
      'SmartWatchIcon', 'WatchIcon', 'AirpodIcon', 'HeadphonesIcon', 'SpeakerIcon', 'WebcamIcon', 'ProjectorIcon', 'DroneIcon',
      'KeyboardIcon', 'KeyboardOffIcon', 'MouseIcon', 'MouseLeftClickIcon', 'MouseRightClickIcon', 'MouseScrollIcon', 'GamepadIcon', 'JoystickIcon',
      'PrinterIcon', 'PrinterOffIcon', 'PrinterThreeDIcon', 'ScreenShareIcon', 'ScreenRotationIcon', 'ScreenLockRotationIcon',
      'BatteryFullIcon', 'BatteryMediumIcon', 'BatteryLowIcon', 'BatteryEmptyIcon', 'BatteryChargingIcon', 'BatteryWarningIcon', 'BatteryEcoChargingIcon',
      'PlugIcon', 'PlugSocketIcon', 'PlugZapIcon', 'PowerIcon', 'PowerOffIcon', 'PowerSocketIcon', 'CableIcon', 'FlashIcon', 'FlashlightIcon',
      'WifiIcon', 'WifiFullSignalIcon', 'WifiLowSignalIcon', 'WifiNoSignalIcon', 'WifiOffIcon', 'WifiLockIcon', 'WifiSyncIcon', 'RouterIcon',
      'BluetoothIcon', 'BluetoothConnectedIcon', 'BluetoothSearchIcon', 'BluetoothOffIcon',
      'SignalFullIcon', 'SignalMediumIcon', 'SignalLowIcon', 'SignalNoIcon', 'CellularNetworkIcon', 'CellularNetworkOfflineIcon',
      'UsbIcon', 'UsbConnectedIcon', 'UsbMemoryIcon', 'SdCardIcon', 'SimcardIcon', 'MemoryStickIcon', 'RamMemoryIcon', 'HardDriveIcon', 'HddIcon',
      'CpuIcon', 'CpuChargeIcon', 'ChipIcon', 'MicrochipIcon', 'GraphicCardIcon',
    ],
  },
  {
    id: 'development',
    label: 'Development',
    blurb: 'Code, git, infra and the terminal you live in.',
    keywords: ['code', 'programming', 'git', 'infra', 'terminal', 'api'],
    names: [
      'CodeIcon', 'CodeSimpleIcon', 'CodeSquareIcon', 'CodeCircleIcon', 'CodeFolderIcon', 'CodeXmlIcon', 'SourceCodeIcon', 'SourceCodeSquareIcon',
      'BracketsIcon', 'BracesIcon', 'FirstBracketIcon', 'SecondBracketIcon', 'ThirdBracketIcon', 'BinaryCodeIcon', 'BinaryIcon',
      'TerminalIcon', 'CommandLineIcon', 'ConsoleIcon', 'CommandIcon', 'FunctionIcon', 'FunctionSquareIcon', 'VariableIcon',
      'GitBranchIcon', 'GitBranchPlusIcon', 'GitCommitIcon', 'GitCommitHorizontalIcon', 'GitMergeIcon', 'GitMergeConflictIcon', 'GitForkIcon', 'GitCompareIcon', 'GitGraphIcon',
      'GitPullRequestIcon', 'GitPullRequestDraftIcon', 'GitPullRequestClosedIcon', 'GitPullRequestCreateIcon',
      'BugIcon', 'Bug01Icon', 'WebhookIcon', 'WebhookOffIcon', 'ApiIcon', 'ApiGatewayIcon', 'AwsLambdaIcon',
      'ServerIcon', 'ServerStackIcon', 'ServerCogIcon', 'ServerCrashIcon', 'ServerOffIcon', 'CloudServerIcon', 'CloudCogIcon',
      'DatabaseIcon', 'DatabaseAddIcon', 'DatabaseSettingIcon', 'DatabaseRestoreIcon', 'DatabaseLightningIcon',
      'CpuIcon', 'CpuSettingsIcon', 'ChipIcon', 'MicrochipIcon', 'ComputerProgrammingIcon', 'LaptopProgrammingIcon', 'MobileProgrammingIcon',
      'PackageIcon', 'PackageOpenIcon', 'PackageCheckIcon', 'PackageSearchIcon', 'PackagePlusIcon', 'BoxIcon', 'BoxesIcon',
      'NpmIcon', 'ReactIcon', 'TypescriptIcon', 'JavaScriptIcon', 'PythonIcon', 'JavaIcon', 'HtmlFiveIcon', 'CssThreeIcon', 'NodeAddIcon',
      'GithubIcon', 'GitlabIcon', 'CodepenIcon', 'CodesandboxIcon', 'FigmaIcon', 'FramerIcon', 'GitbookIcon',
      'FileCodeIcon', 'FileScriptIcon', 'FileTerminalIcon', 'FolderCodeIcon', 'FolderGitIcon', 'MessageProgrammingIcon',
      'RocketIcon', 'Rocket01Icon', 'ProgrammingFlagIcon', 'Layers01Icon', 'ComponentIcon', 'PuzzleIcon', 'WorkflowSquare01Icon',
      'BotIcon', 'HierarchyIcon', 'HierarchySquare01Icon', 'LockPasswordIcon', 'KeyboardIcon', 'DocumentCodeIcon', 'CloudUploadIcon',
    ],
  },
  {
    id: 'editor',
    label: 'Editor',
    blurb: 'Text formatting, layout and design-tool primitives.',
    keywords: ['text', 'typography', 'format', 'design', 'layout'],
    names: [
      'TextIcon', 'TextBoldIcon', 'TextItalicIcon', 'TextUnderlineIcon', 'TextStrikethroughIcon', 'TextSubscriptIcon', 'TextSuperscriptIcon',
      'TextAlignLeftIcon', 'TextAlignCenterIcon', 'TextAlignRightIcon', 'TextAlignJustifyCenterIcon',
      'TextIndentIcon', 'TextIndentMoreIcon', 'TextIndentLessIcon', 'TextWrapIcon', 'TextKerningIcon', 'TextTrackingIcon',
      'TextFontIcon', 'TextColorIcon', 'TextAllCapsIcon', 'TextSmallcapsIcon', 'TextClearIcon', 'TextSelectionIcon', 'TextSearchIcon', 'TextCheckIcon',
      'HeadingIcon', 'Heading01Icon', 'Heading02Icon', 'Heading03Icon', 'ParagraphIcon', 'ParagraphSpacingIcon', 'ParagraphBulletsPointIcon',
      'BoldIcon', 'ItalicIcon', 'UnderlineIcon', 'StrikethroughIcon', 'TypeIcon', 'TypeCursorIcon', 'LetterSpacingIcon', 'SpellCheckIcon',
      'ListIcon', 'ListOrderedIcon', 'ListChecksIcon', 'ListTodoIcon', 'ListTreeIcon', 'ListCollapseIcon', 'ListIndentIncreaseIcon', 'ListIndentDecreaseIcon',
      'QuoteUpIcon', 'QuoteDownIcon', 'QuotesIcon', 'TextQuoteIcon', 'HashtagIcon', 'AtIcon', 'AsteriskIcon',
      'LinkIcon', 'LinkOffIcon', 'AttachmentIcon', 'ImageIcon', 'TableIcon', 'TableOfContentsIcon', 'TableCellsMergeIcon', 'TableCellsSplitIcon',
      'ColumnInsertIcon', 'ColumnDeleteIcon', 'RowInsertIcon', 'RowDeleteIcon',
      'PenIcon', 'PenLineIcon', 'PencilIcon', 'PencilLineIcon', 'PencilRulerIcon', 'PenToolIcon', 'PenToolAddIcon', 'HighlighterIcon', 'EraserIcon', 'BrushIcon', 'PaintBucketIcon',
      'CropIcon', 'ScissorIcon', 'FrameIcon', 'ArtboardIcon', 'CanvasIcon', 'AnchorPointIcon', 'ColorPickerIcon', 'ColorsIcon', 'BlurIcon',
      'AlignLeftIcon', 'AlignRightIcon', 'AlignTopIcon', 'AlignBottomIcon', 'AlignHorizontalCenterIcon', 'AlignVerticalCenterIcon',
      'AlignBoxTopLeftIcon', 'AlignBoxMiddleCenterIcon', 'AlignBoxBottomRightIcon', 'AlignHorizontalDistributeCenterIcon', 'AlignVerticalDistributeCenterIcon',
      'FlipHorizontalIcon', 'FlipVerticalIcon', 'GroupItemsIcon', 'GroupLayersIcon', 'Layers01Icon', 'LayoutIcon', 'LayoutTemplateIcon',
      'LayoutTwoColumnIcon', 'LayoutThreeColumnIcon', 'LayoutPanelLeftIcon', 'LayoutPanelTopIcon', 'LayoutTableIcon',
      'CircleIcon', 'SquareIcon', 'TriangleIcon', 'HexagonIcon', 'PentagonIcon', 'DiamondIcon', 'EllipseIcon', 'CubeIcon', 'CylinderIcon',
      'CursorIcon', 'CursorTextIcon', 'CursorMoveIcon', 'CursorRectangleSelectionIcon', 'CursorMagicSelectionIcon', 'HandIcon', 'HandGrabIcon',
    ],
  },
  {
    id: 'security',
    label: 'Security',
    blurb: 'Locks, keys, shields and identity.',
    keywords: ['auth', 'privacy', 'protection', 'identity', 'password'],
    names: [
      'LockIcon', 'LockOpenIcon', 'LockKeyholeIcon', 'LockKeyholeOpenIcon', 'LockPasswordIcon', 'LockKeyIcon', 'LockComputerIcon', 'LockSyncIcon', 'LockedIcon',
      'CircleLockIcon', 'CircleLockCheckIcon', 'CircleLockAddIcon', 'CircleUnlockIcon', 'SquareLock01Icon', 'SquareUnlock01Icon',
      'KeyIcon', 'Key01Icon', 'Key02Icon', 'KeyRoundIcon', 'KeySquareIcon', 'KeyGeneratorFobIcon', 'RotateCcwKeyIcon',
      'ShieldIcon', 'Shield01Icon', 'Shield02Icon', 'ShieldCheckIcon', 'ShieldAlertIcon', 'ShieldBanIcon', 'ShieldOffIcon', 'ShieldHalfIcon',
      'ShieldKeyIcon', 'ShieldUserIcon', 'ShieldPlusIcon', 'ShieldMinusIcon', 'ShieldXIcon', 'ShieldEllipsisIcon', 'ShieldQuestionMarkIcon', 'ShieldCogIcon', 'ShieldEnergyIcon', 'ShieldBlockchainIcon',
      'SecurityIcon', 'SecurityCheckIcon', 'SecurityLockIcon', 'SecurityPasswordIcon', 'SecurityValidationIcon', 'SecurityWarningIcon', 'SecurityBlockIcon', 'SecurityWifiIcon', 'SecurityKeyUsbIcon', 'SecuredNetworkIcon',
      'FingerprintPatternIcon', 'FaceIdIcon', 'ScanFaceIcon', 'ScanEyeIcon', 'BiometricAccessIcon', 'BiometricDeviceIcon',
      'EyeIcon', 'EyeOffIcon', 'EyeClosedIcon', 'ViewIcon', 'ViewOffIcon', 'IncognitoIcon', 'AnonymousIcon',
      'PasswordValidationIcon', 'CirclePasswordIcon', 'PinCodeIcon', 'EncryptIcon', 'FirewallIcon', 'SecuredNetworkIcon',
      'IdIcon', 'IdCardIcon', 'IdVerifiedIcon', 'IdNotVerifiedIcon', 'IdentityCardIcon', 'IdentityCardCheckIcon', 'IdentificationIcon', 'PassportIcon', 'PassportValidIcon',
      'UserLockIcon', 'UserUnlockIcon', 'UserShieldIcon', 'UserKeyIcon', 'UserCheckIcon', 'UserBlockIcon', 'UserWarningIcon', 'UserIdVerificationIcon',
      'QrCodeIcon', 'QrCodeScanIcon', 'BarcodeIcon', 'BarcodeScanIcon', 'ScanIcon', 'ScanLineIcon', 'ScanSearchIcon',
      'SafeIcon', 'SafeBoxIcon', 'VaultIcon', 'BugIcon', 'DangerIcon', 'AlertDiamondIcon', 'AlertSquareIcon', 'CheckmarkBadge01Icon', 'BadgeCheckIcon',
      'MailLockIcon', 'MailSecureIcon', 'MessageLockIcon', 'MessageSecureIcon', 'FolderLockIcon', 'FileLockIcon', 'DatabaseLockedIcon', 'WifiLockIcon', 'CloudCheckIcon',
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    blurb: 'Sparkles, brains and the new generation of product glyphs.',
    keywords: ['ml', 'assistant', 'generate', 'llm', 'magic', 'sparkle'],
    names: [
      'SparklesIcon', 'SparkleIcon', 'AiSparklesIcon', 'MagicWand01Icon', 'MagicWandIcon', 'WandSparklesIcon', 'WandIcon',
      'AiBrainIcon', 'BrainIcon', 'BrainCircuitIcon', 'BrainCogIcon', 'NeuralNetworkIcon', 'ArtificialIntelligenceIcon', 'AiChipIcon', 'AiNetworkIcon',
      'AiChatIcon', 'ChatBotIcon', 'BotIcon', 'BotMessageSquareIcon', 'BotOffIcon', 'RobotIcon', 'RoboticIcon', 'ChatSparkIcon', 'CallSparkIcon',
      'AiGenerateIcon', 'AiGenerativeIcon', 'AiContentGeneratorIcon', 'AiMagicIcon', 'AiIdeaIcon', 'AiInnovationIcon', 'AiLearningIcon',
      'AiSearchIcon', 'AiSearchLinesIcon', 'AiWebBrowsingIcon', 'AiBrowserIcon', 'AiScanIcon', 'AiScanTextIcon', 'AiVisionRecognitionIcon', 'AiViewIcon',
      'AiImageIcon', 'AiImageEditIcon', 'AiImagineIcon', 'AiArtIcon', 'AiDrawingIcon', 'AiSketchIcon', 'AiPaintbrushIcon', 'AiEraserIcon', 'AiBackgroundEraserIcon', 'AiCropIcon', 'AiExpandIcon', 'AiHdResolutionIcon', 'AiBeautifyIcon', 'AiReplaceIcon', 'AiSwapIcon',
      'AiVideoIcon', 'AiCameraIcon', 'AiAudioIcon', 'AiVoiceIcon', 'AiVoiceGeneratorIcon', 'AiSpeechIcon', 'AiMicIcon', 'AiTranscribeAudioIcon', 'AiTranslateIcon',
      'AiEditingIcon', 'AiCoEditingIcon', 'AiFileIcon', 'AiFolderIcon', 'AiBookIcon', 'AiMailIcon', 'AiSheetsIcon', 'AiTemplateIcon', 'AiSchedulingIcon',
      'AiProgrammingIcon', 'AiComputerIcon', 'AiLaptopIcon', 'AiPhoneIcon', 'AiSmartwatchIcon', 'AiCloudIcon', 'AiSettingIcon', 'AiSecurityIcon', 'AiLockIcon', 'AiUserIcon',
      'ChatGptIcon', 'ClaudeIcon', 'GoogleGeminiIcon', 'AppleIntelligenceIcon', 'IdeaIcon', 'Idea01Icon', 'BulbIcon', 'BulbChargingIcon', 'AtomIcon', 'AtomicPowerIcon',
    ],
  },
  {
    id: 'brands',
    label: 'Brands',
    blurb: 'Logos for the tools and platforms your product talks to.',
    keywords: ['logo', 'social', 'platform', 'company'],
    names: [
      'GithubIcon', 'GitlabIcon', 'FigmaIcon', 'FramerIcon', 'NotionIcon', 'SlackIcon', 'DiscordIcon', 'TelegramIcon', 'WhatsappIcon', 'WhatsappBusinessIcon',
      'NewTwitterIcon', 'NewTwitterRectangleIcon', 'ThreadsIcon', 'InstagramIcon', 'FacebookIcon', 'LinkedinIcon', 'RedditIcon', 'TiktokIcon', 'SnapchatIcon', 'PinterestIcon', 'XingIcon',
      'YoutubeIcon', 'TwitchIcon', 'VimeoIcon', 'SpotifyIcon', 'SoundcloudIcon', 'AppleMusicIcon', 'MediumIcon', 'DribbbleIcon', 'BehanceIcon',
      'AppleIcon', 'AppleFinderIcon', 'AppleVisionProIcon', 'GoogleIcon', 'GoogleDriveIcon', 'GoogleDocIcon', 'GoogleSheetIcon', 'GoogleMapsIcon', 'GooglePhotosIcon', 'GoogleGeminiIcon',
      'MicrosoftIcon', 'WindowsNewIcon', 'WindowsOldIcon', 'AndroidIcon', 'PlayStoreIcon', 'ChromeIcon', 'SafariIcon', 'MetaIcon', 'AmazonIcon',
      'ChatGptIcon', 'ClaudeIcon', 'NpmIcon', 'ReactIcon', 'TypescriptIcon', 'JavaScriptIcon', 'PythonIcon', 'JavaIcon', 'HtmlFiveIcon', 'CssThreeIcon',
      'CodepenIcon', 'CodesandboxIcon', 'GitbookIcon', 'HackerrankIcon', 'WordpressIcon', 'ShopifyIcon', 'StripeIcon', 'PaypalIcon', 'CoinbaseIcon', 'AirbnbIcon', 'MicrosoftAdminIcon',
    ],
  },
]

/** Words a designer types that do not appear in the icon's name. */
const synonyms: Record<string, string[]> = {
  trash: ['Delete01Icon', 'Delete02Icon'],
  bin: ['Delete01Icon', 'Delete02Icon'],
  gear: ['Settings01Icon', 'Settings02Icon'],
  cog: ['Settings01Icon', 'Settings02Icon'],
  close: ['Cancel01Icon', 'CancelCircleIcon'],
  x: ['Cancel01Icon', 'CancelCircleIcon'],
  check: ['Tick01Icon', 'TickDoubleIcon', 'CheckmarkCircle01Icon'],
  hamburger: ['Menu01Icon', 'Menu09Icon', 'MenuTwoLineIcon'],
  dots: ['MoreHorizontalIcon', 'MoreVerticalIcon'],
  kebab: ['MoreVerticalIcon'],
  meatball: ['MoreHorizontalIcon'],
  magnifier: ['Search01Icon'],
  heart: ['FavouriteIcon'],
  like: ['ThumbsUpIcon', 'FavouriteIcon'],
  avatar: ['UserIcon', 'UserCircleIcon'],
  people: ['UserGroupIcon', 'UserMultipleIcon'],
  team: ['UserGroupIcon', 'UserMultipleIcon'],
  email: ['Mail01Icon', 'MailOpenIcon', 'MailSendIcon'],
  spinner: ['Loading03Icon'],
  fullscreen: ['FullScreenIcon', 'Maximize01Icon'],
  twitter: ['NewTwitterIcon', 'NewTwitterRectangleIcon'],
  x_com: ['NewTwitterIcon'],
  openai: ['ChatGptIcon'],
  anthropic: ['ClaudeIcon'],
  gemini: ['GoogleGeminiIcon'],
  mac: ['AppleIcon', 'AppleFinderIcon'],
  photo: ['Image01Icon', 'Camera01Icon'],
  picture: ['Image01Icon'],
  card: ['CreditCardIcon'],
  crypto: ['BitcoinIcon', 'EthereumIcon'],
  pr: ['GitPullRequestIcon'],
  merge: ['GitMergeIcon'],
  shell: ['TerminalIcon', 'CommandLineIcon'],
  cli: ['TerminalIcon', 'CommandLineIcon'],
  db: ['DatabaseIcon'],
  sql: ['DatabaseIcon'],
  password: ['LockPasswordIcon', 'SecurityPasswordIcon'],
  auth: ['LockIcon', 'KeyIcon', 'FingerprintPatternIcon'],
  llm: ['AiChatIcon', 'AiBrainIcon', 'SparklesIcon'],
  theme: ['Sun01Icon', 'Moon02Icon', 'DarkModeIcon'],
  bell: ['Notification01Icon', 'Notification03Icon'],
  bold: ['TextBoldIcon', 'BoldIcon'],
  font: ['TextFontIcon', 'TypeIcon'],
  pen: ['PenIcon', 'PenToolIcon', 'PencilIcon'],
}

const pack = Free as unknown as Record<string, unknown>
const missing = new Set<string>()
const seen = new Map<string, string[]>()

for (const c of collections) {
  for (const name of c.names) {
    if (!(name in pack)) missing.add(name)
    const list = seen.get(name) ?? []
    list.push(c.id)
    seen.set(name, list)
  }
}
for (const list of Object.values(synonyms)) {
  for (const name of list) if (!(name in pack)) missing.add(name)
}

if (missing.size) {
  console.error('Unknown icon names in @hugeicons/core-free-icons:')
  for (const m of [...missing].sort()) console.error('  ' + m)
  process.exit(1)
}

const uniqueNames = [...seen.keys()].sort()
const nameToSynonyms = new Map<string, string[]>()
for (const [word, names] of Object.entries(synonyms)) {
  for (const n of names) {
    const list = nameToSynonyms.get(n) ?? []
    list.push(word.replace(/_/g, ' '))
    nameToSynonyms.set(n, list)
  }
}

const lines: string[] = []
lines.push('// GENERATED by scripts/curate.ts — do not edit by hand. Run `bun run curate`.')
lines.push("import type { IconSvgElement } from '@hugeicons/react'")
lines.push('import {')
for (const n of uniqueNames) lines.push(`  ${n},`)
lines.push("} from '@hugeicons/core-free-icons'")
lines.push('')
lines.push('export type IconEntry = {')
lines.push('  /** Exact export name from @hugeicons/core-free-icons. */')
lines.push('  name: string')
lines.push('  icon: IconSvgElement')
lines.push('  collections: string[]')
lines.push('  /** Extra search words that do not appear in the name. */')
lines.push('  synonyms: string[]')
lines.push('}')
lines.push('')
lines.push('export type Collection = { id: string; label: string; blurb: string; keywords: string[]; count: number }')
lines.push('')
lines.push('export const collections: Collection[] = [')
for (const c of collections) {
  const count = new Set(c.names).size
  lines.push(
    `  { id: ${JSON.stringify(c.id)}, label: ${JSON.stringify(c.label)}, blurb: ${JSON.stringify(c.blurb)}, keywords: ${JSON.stringify(c.keywords)}, count: ${count} },`,
  )
}
lines.push(']')
lines.push('')
lines.push('export const icons: IconEntry[] = [')
for (const n of uniqueNames) {
  const cols = seen.get(n)!
  const syn = nameToSynonyms.get(n) ?? []
  lines.push(`  { name: ${JSON.stringify(n)}, icon: ${n}, collections: ${JSON.stringify(cols)}, synonyms: ${JSON.stringify(syn)} },`)
}
lines.push(']')
lines.push('')
lines.push(`export const TOTAL_FREE_ICONS = ${Object.keys(pack).filter((k) => k.endsWith('Icon')).length}`)
lines.push('')

const out = new URL('../src/data/icons.generated.ts', import.meta.url)
await Bun.write(out, lines.join('\n'))
console.log(`Wrote ${uniqueNames.length} icons across ${collections.length} collections → src/data/icons.generated.ts`)
