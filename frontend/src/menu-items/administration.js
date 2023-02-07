// assets
import DomainAddOutlinedIcon from '@mui/icons-material/DomainAddOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArticleIcon from '@mui/icons-material/Article';

// constant
const icons = {
    DomainAddOutlinedIcon,
    BusinessOutlinedIcon,
    ListAltOutlinedIcon,
    NewspaperIcon,
    PostAddIcon,
    ArticleIcon
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
        },
        {
            id: 'contracts',
            title: 'Contratos',
            type: 'collapse',
            icon: icons.NewspaperIcon,

            children: [
                {
                    id: 'add-contract',
                    title: 'Crear Contrato',
                    type: 'item',
                    icon: icons.PostAddIcon,
                    url: '/admin/contracts/new'
                },
                {
                    id: 'company-list',
                    title: 'Lista Contratos',
                    type: 'item',
                    icon: icons.ArticleIcon,
                    url: '/admin/contracts/list'
                }
            ]
        }
    ]
};

export default administration;
