import { useState } from 'react';
import { adminSidebarConfig } from '../../config/adminSidebarConfig';
import './sidebar.scss';
import { useNavigate } from 'react-router-dom';

function SidebarComponent() {
    const navigate = useNavigate()
    const [activeItem, setActiveItem] = useState(adminSidebarConfig[0].name);

    const changeView = (name, url) => {
        setActiveItem(name);
        navigate(url)
    };
    const displayNavigation = () => {
        return adminSidebarConfig.map((item, index) => {
            return (
                <li key={index} className={activeItem === item.name ? 'active' : null} onClick={() => changeView(item.name, item.url)}>
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                </li>
            );
        });
    };

    return (
        <>
            <div className='sidebar-wrapper'>
                <div className='sidebar'>
                    <div className='header'>
                        <h3>Admin Dashboard</h3>
                    </div>
                    <div className='navigation'>
                        <nav>
                            <ul>{displayNavigation()}</ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SidebarComponent;
