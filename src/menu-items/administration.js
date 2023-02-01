// assets
import DomainAddOutlinedIcon from '@mui/icons-material/DomainAddOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

// constant
const icons = {
    DomainAddOutlinedIcon,
    BusinessOutlinedIcon,
    ListAltOutlinedIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const administration = {
    id: 'administration',
    title: 'Administracion',
    type: 'group',
    children: [
        {
            id: 'companies',
            title: 'Empresas',
            type: 'collapse',
            icon: icons.BusinessOutlinedIcon,

            children: [
                {
                    id: 'add-company',
                    title: 'Añadir Empresa',
                    type: 'item',
                    icon: icons.DomainAddOutlinedIcon,
                    url: '/admin/companies/new'
                },
                {
                    id: 'company-list',
                    title: 'Lista Empresas',
                    type: 'item',
                    icon: icons.ListAltOutlinedIcon,
                    url: '/admin/companies/list'
                }
            ]
        }
    ]
};

export default administration;
