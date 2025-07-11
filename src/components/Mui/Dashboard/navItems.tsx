import { type Navigation } from '@toolpad/core/AppProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Servers',
    },
    {
        segment: 'dashboard',
        title: 'Home Assistant',
        icon: <DashboardIcon />,
    },
    {
        segment: 'homebase',
        title: 'Home Base',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'macbookclassic',
        title: 'MacBook Classic',
        icon: <DashboardIcon />,
    },
    {
        segment: 'macbookpro',
        title: 'MacBook Pro',
        icon: <DashboardIcon />,
    },
    {
        segment: 'imac',
        title: 'iMac',
        icon: <DashboardIcon />,
    },
    {
        segment: 'bmwassistant',
        title: 'BMW Assistant',
        icon: <DashboardIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Web Servers',
    },
    {
        segment: 'reports',
        title: 'Gateway',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'GraphQL Apollo 1',
        icon: <LayersIcon />,
    },
    {
        segment: 'integrations',
        title: 'GraphQL Apollo 2',
        icon: <LayersIcon />,
    },
    {
        segment: 'integrations',
        title: 'Server Open (REST)',
        icon: <LayersIcon />,
    },
    {
        segment: 'integrations',
        title: 'Server Dev (REST)',
        icon: <LayersIcon />,
    },
    {
        segment: 'integrations',
        title: 'Server Prod (REST)',
        icon: <LayersIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Websocket Server',
    },
    {
        segment: 'integrations',
        title: 'Server Prod (ws)',
        icon: <LayersIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Web Apps',
    },
    {
        segment: 'macbookclassic',
        title: 'AiChat',
        icon: <DashboardIcon />,
    },
    {
        segment: 'macbookpro',
        title: 'OpenFitness',
        icon: <DashboardIcon />,
    },
    {
        segment: 'imac',
        title: 'Homebase Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'bmwassistant',
        title: 'Wordpress',
        icon: <DashboardIcon />,
    },
    {
        segment: 'macbookpro',
        title: 'Company Site',
        icon: <DashboardIcon />,
    },
    {
        segment: 'imac',
        title: 'SmartiCamera',
        icon: <DashboardIcon />,
    },
    {
        segment: 'bmwassistant',
        title: 'Security Center',
        icon: <DashboardIcon />,
    },
];

export default NAVIGATION;