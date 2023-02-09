import React from 'react'
import { Roles } from './config/Roles'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Area
const Area = React.lazy(() => import('./views/area/Area'))
const AreaDetail = React.lazy(() => import('./views/area/AreaDetail'))
// House
const House = React.lazy(() => import('./views/house/House'))
const HouseDetail = React.lazy(() => import('./views/house/HouseDetail'))
// Image
const AreaImage = React.lazy(() => import('./components/area-details/area-image/AreaImage'))
const HouseImage = React.lazy(() => import('./components/house-details/house-image/HouseImage'))
const ImageDetail = React.lazy(() => import('./components/area-details/area-image/ImageDetail'))
// File
const AreaFile = React.lazy(() => import('./components/area-details/area-file/AreaFile'))
const HouseFile = React.lazy(() => import('./components/house-details/house-file/HouseFile'))
const FileDetail = React.lazy(() => import('./components/area-details/area-file/FileDetail'))

// Chat
const Chat = React.lazy(() => import('./views/chat/Chat'))
const BoxChat = React.lazy(() => import('./views/chat/BoxChat'))
const PhoneChat = React.lazy(() => import('./views/chat/PhoneChat'))

// Account
const Account = React.lazy(() => import('./views/account/Account'))

//Profile
const Profile = React.lazy(() => import('./views/profile/Profile'))

// Category
const AreaCategory = React.lazy(() => import('./views/category/area-category/AreaCategory'))
const HouseCategory = React.lazy(() => import('./views/category/house-category/HouseCategory'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
    permission: [Roles.SALE, Roles.ADMIN, Roles.EDITOR],
  },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    element: ButtonGroups,
  },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  {
    path: '/forms/checks-radios',
    name: 'Checks & Radios',
    element: ChecksRadios,
  },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  {
    path: '/forms/floating-labels',
    name: 'Floating Labels',
    element: FloatingLabels,
  },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  {
    path: '/notifications',
    name: 'Notifications',
    element: Alerts,
    exact: true,
  },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },

  { path: '/widgets', name: 'Widgets', element: Widgets },
  // area
  {
    path: '/areas',
    name: 'Area',
    element: Area,
    permission: [Roles.SALE, Roles.ADMIN],
    exact: true,
  },
  {
    path: '/areas/:areaId',
    name: 'Area Details',
    element: AreaDetail,
    permission: [Roles.SALE, Roles.ADMIN],
    exact: true,
  },
  // house
  {
    path: '/houses',
    name: 'Area',
    element: Area,
    permission: [Roles.SALE, Roles.ADMIN],
    exact: true,
  },
  {
    path: '/houses/:areaId',
    name: 'House',
    element: House,
    permission: [Roles.SALE, Roles.ADMIN],
    exact: true,
  },
  {
    path: '/houses/:areaId/:id',
    name: 'House Details',
    element: HouseDetail,
    permission: [Roles.SALE, Roles.ADMIN],
    exact: true,
  },
  /*
  // image
  { path: '/image/area', name: 'Area Images', element: AreaImage, exact: true },
  { path: '/image/area/:id', name: 'Image Details', element: ImageDetail, exact: true },
  {
    path: '/image/house',
    name: 'House Images',
    element: HouseImage,
    exact: true,
  },
  { path: '/image/house/:id', name: 'Image Details', element: ImageDetail, exact: true },
  // file
  { path: '/file/area', name: 'Area Files', element: AreaFile, exact: true },
  { path: '/file/area/:id', name: 'File Details', element: FileDetail, exact: true },
  { path: '/file/house', name: 'House Files', element: HouseFile, exact: true },
  { path: '/file/house/:id', name: 'File Details', element: FileDetail, exact: true },
  */
  // chat
  {
    path: '/chat',
    name: 'Chat',
    element: Chat,
    permission: [Roles.SALE, Roles.ADMIN],
    exact: true,
  },
  {
    path: '/chat/:roomId',
    name: 'BoxChat',
    element: BoxChat,
    permission: [Roles.SALE, Roles.ADMIN],
    exact: true,
  },
  {
    path: '/chat/phone',
    name: 'PhoneChat',
    element: PhoneChat,
    permission: [Roles.SALE, Roles.ADMIN],
    exact: true,
  },
  // account
  {
    path: '/accounts',
    name: 'Account',
    element: Account,
    permission: [Roles.ADMIN],
    exact: true,
  },
  // profile
  {
    path: '/profile',
    name: 'Profile',
    element: Profile,
    permission: [Roles.SALE, Roles.ADMIN, Roles.EDITOR],
    exact: true,
  },
  {
    path: '/category/area',
    name: 'Area Categories',
    element: AreaCategory,
    permission: [Roles.EDITOR],
    exact: true,
  },
  {
    path: '/category/house',
    name: 'House Categories',
    element: HouseCategory,
    permission: [Roles.EDITOR],
    exact: true,
  },
]

export default routes
