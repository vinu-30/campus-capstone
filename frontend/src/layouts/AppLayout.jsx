// Common protected-page frame with sidebar, top navigation, breadcrumbs, and footer.
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer';

function AppLayout({ children }) { const [isOpen, setIsOpen] = useState(false); return <div className="app-shell"><Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} /><main className="main-area"><TopNavbar onMenuClick={() => setIsOpen(true)} /><Breadcrumbs />{children}<Footer /></main></div>; }
export default AppLayout;
