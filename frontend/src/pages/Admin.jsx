import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, FileText, Briefcase, Mail, Upload, Settings as SettingsIcon, Cog,
    BarChart3, Plus, Edit, Trash2, Eye, Search, Save, X, Check
} from 'lucide-react';
import ContentManager from './AdminContent';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [dashboardStats, setDashboardStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'content', label: 'Content', icon: FileText },
        { id: 'jobs', label: 'Jobs', icon: Briefcase },
        { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'tasks', label: 'Tasks', icon: FileText },
        { id: 'reports', label: 'Task Reports', icon: FileText },
        { id: 'password-resets', label: 'Password Resets', icon: Users },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'contacts', label: 'Contacts', icon: Mail },
        { id: 'services', label: 'Service Requests', icon: Cog },
        { id: 'media', label: 'Media', icon: Upload },
        { id: 'admins', label: 'Admin Users', icon: Users },
        { id: 'settings', label: 'Settings', icon: SettingsIcon }
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                localStorage.setItem('adminToken', result.token);
                const user = result.admin || { username: loginData.username, email: loginData.email || '' };
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                setIsAuthenticated(true);
                fetchDashboardStats();
            } else {
                alert(result.message || 'Login failed');
            }
        } catch (error) {
            alert('Login failed. Please check if backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/dashboard', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const stats = await response.json();
                
                // Fetch additional data for team and portfolio counts
                const [teamRes, portfolioRes] = await Promise.all([
                    fetch('http://localhost:5000/api/admin/team', { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch('http://localhost:5000/api/admin/portfolio', { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                
                const teamData = teamRes.ok ? await teamRes.json() : [];
                const portfolioData = portfolioRes.ok ? await portfolioRes.json() : [];
                
                setDashboardStats({
                    ...stats,
                    portfolioProjects: portfolioData.length || 0,
                    teamMembers: teamData.filter(member => member.isActive).length || 0
                });
            }
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
            // Fetch individual counts if main API fails
            const [teamRes, portfolioRes] = await Promise.all([
                fetch('http://localhost:5000/api/admin/team', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('http://localhost:5000/api/admin/portfolio', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            
            const teamData = teamRes.ok ? await teamRes.json() : [];
            const portfolioData = portfolioRes.ok ? await portfolioRes.json() : [];
            
            setDashboardStats({
                contacts: 0,
                serviceRequests: 0,
                jobApplications: 0,
                activeJobs: 0,
                portfolioProjects: portfolioData.length || 0,
                teamMembers: teamData.filter(member => member.isActive).length || 0,
                recentContacts: [],
                recentApplications: []
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            // Try to get user info from token or localStorage
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                setCurrentUser(JSON.parse(savedUser));
            }
            setIsAuthenticated(true);
            fetchDashboardStats();
        }
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 p-8 rounded-xl border border-white/10 w-full max-w-md"
                >
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={loginData.username}
                            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20 w-full overflow-x-hidden">
            <div className="flex flex-col lg:flex-row relative">
                {/* Mobile Header */}
                <div className="lg:hidden bg-gray-900 p-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-cyan-400">Admin Panel</h2>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-white hover:bg-gray-800 rounded-lg transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div 
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Mobile Sliding Sidebar */}
                <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-cyan-400">Admin Panel</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 text-white hover:bg-gray-800 rounded-lg transition"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <nav className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition text-left ${
                                            activeTab === tab.id 
                                                ? 'bg-cyan-600 text-white' 
                                                : 'text-gray-300 hover:bg-gray-800'
                                        }`}
                                    >
                                        <Icon size={20} />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                        <button
                            onClick={() => {
                                localStorage.removeItem('adminToken');
                                localStorage.removeItem('currentUser');
                                setIsAuthenticated(false);
                                setCurrentUser(null);
                            }}
                            className="w-full mt-8 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 bg-gray-900 min-h-screen p-6 border-r border-white/10">
                    <h2 className="text-xl font-bold mb-8 text-cyan-400">Admin Panel</h2>
                    <nav className="space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                                        activeTab === tab.id 
                                            ? 'bg-cyan-600 text-white' 
                                            : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                                >
                                    <Icon size={20} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                    <button
                        onClick={() => {
                            localStorage.removeItem('adminToken');
                            localStorage.removeItem('currentUser');
                            setIsAuthenticated(false);
                            setCurrentUser(null);
                        }}
                        className="w-full mt-8 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-8 w-full overflow-x-hidden">
                    {activeTab === 'dashboard' && <Dashboard stats={dashboardStats} currentUser={currentUser} />}
                    {activeTab === 'content' && <ContentManager />}
                    {activeTab === 'jobs' && <JobManager />}
                    {activeTab === 'portfolio' && <PortfolioManager />}
                    {activeTab === 'employees' && <EmployeeManager />}
                    {activeTab === 'tasks' && <TaskManager />}
                    {activeTab === 'reports' && <TaskReportManager />}
                    {activeTab === 'password-resets' && <PasswordResetManager />}
                    {activeTab === 'team' && <TeamManager />}
                    {activeTab === 'contacts' && <ContactManager />}
                    {activeTab === 'services' && <ServiceRequestManager />}
                    {activeTab === 'media' && <MediaManager />}
                    {activeTab === 'admins' && <AdminManager currentUser={currentUser} setCurrentUser={setCurrentUser} />}
                    {activeTab === 'settings' && <Settings />}
                </div>
            </div>
        </div>
    );
};

const Dashboard = ({ stats, currentUser }) => {
    const [showAnalytics, setShowAnalytics] = useState(false);
    
    return (
    <div>
        <div 
            className="mb-8 p-6 bg-gray-900 rounded-xl border border-white/10 cursor-pointer hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg"
            onClick={() => setShowAnalytics(!showAnalytics)}
        >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {currentUser?.username || 'Admin'}! 🚀</h1>
            <p className="text-gray-400">Here's what's happening with your platform today.</p>
            <p className="text-sm text-cyan-400 mt-2">→ Click to {showAnalytics ? 'hide' : 'view'} detailed analytics</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <StatCard title="Total Contacts" value={stats.contacts || 0} icon={Mail} color="cyan" />
            <StatCard title="Service Requests" value={stats.serviceRequests || 0} icon={FileText} color="blue" />
            <StatCard title="Job Applications" value={stats.jobApplications || 0} icon={Users} color="green" />
            <StatCard title="Active Jobs" value={stats.activeJobs || 0} icon={Briefcase} color="purple" />
        </div>
        
        {showAnalytics && (
            <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-cyan-400/30">
                <h2 className="text-xl font-bold mb-4 text-cyan-400">📊 Detailed Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Total Contacts</h3>
                        <p className="text-2xl font-bold text-green-400">{stats.contacts || 0}</p>
                        <p className="text-sm text-gray-400">All time contacts</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Service Requests</h3>
                        <p className="text-2xl font-bold text-blue-400">{stats.serviceRequests || 0}</p>
                        <p className="text-sm text-gray-400">Total requests</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Job Applications</h3>
                        <p className="text-2xl font-bold text-purple-400">{stats.jobApplications || 0}</p>
                        <p className="text-sm text-gray-400">Total applications</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Active Jobs</h3>
                        <p className="text-2xl font-bold text-yellow-400">{stats.activeJobs || 0}</p>
                        <p className="text-sm text-gray-400">Currently open</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Portfolio Projects</h3>
                        <p className="text-2xl font-bold text-cyan-400">{stats.portfolioProjects || 0}</p>
                        <p className="text-sm text-gray-400">Completed projects</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Team Members</h3>
                        <p className="text-2xl font-bold text-green-400">{stats.teamMembers || 0}</p>
                        <p className="text-sm text-gray-400">Active employees</p>
                    </div>
                </div>
            </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Recent Contacts</h3>
                <div className="space-y-3">
                    {stats.recentContacts?.map((contact, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                            <div>
                                <p className="font-semibold">{contact.name}</p>
                                <p className="text-sm text-gray-400">{contact.email}</p>
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(contact.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Recent Applications</h3>
                <div className="space-y-3">
                    {stats.recentApplications?.map((app, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                            <div>
                                <p className="font-semibold">{app.applicantName}</p>
                                <p className="text-sm text-gray-400">{app.jobTitle}</p>
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-sm">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            <Icon className={`text-${color}-400`} size={24} />
        </div>
    </div>
);



const JobManager = () => {
    const [jobs, setJobs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        type: 'Full-Time',
        location: '',
        description: '',
        requirements: [''],
        responsibilities: [''],
        skills: [''],
        experience: { min: 0, max: 5 },
        salary: { min: '', max: '', currency: 'USD' },
        benefits: [''],
        isActive: true,
        priority: 0
    });

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/jobs', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setJobs(data);
            }
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const url = editingJob 
                ? `http://localhost:5000/api/admin/jobs/${editingJob._id}`
                : 'http://localhost:5000/api/admin/jobs';
            
            const response = await fetch(url, {
                method: editingJob ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    requirements: formData.requirements.filter(r => r.trim()),
                    responsibilities: formData.responsibilities.filter(r => r.trim()),
                    skills: formData.skills.filter(s => s.trim()),
                    benefits: formData.benefits.filter(b => b.trim())
                })
            });

            if (response.ok) {
                fetchJobs();
                setShowForm(false);
                setEditingJob(null);
                setFormData({
                    title: '', department: '', type: 'Full-Time', location: '', description: '',
                    requirements: [''], responsibilities: [''], skills: [''], benefits: [''],
                    experience: { min: 0, max: 5 }, salary: { min: '', max: '', currency: 'USD' },
                    isActive: true, priority: 0
                });
            }
        } catch (error) {
            console.error('Failed to save job:', error);
        }
    };

    const addArrayField = (field) => {
        setFormData({
            ...formData,
            [field]: [...formData[field], '']
        });
    };

    const updateArrayField = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({
            ...formData,
            [field]: newArray
        });
    };

    const toggleJobStatus = async (jobId, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isActive: !currentStatus })
            });
            
            if (response.ok) {
                fetchJobs();
            }
        } catch (error) {
            console.error('Failed to toggle job status:', error);
        }
    };

    const deleteJob = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://localhost:5000/api/admin/jobs/${jobId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    fetchJobs();
                }
            } catch (error) {
                console.error('Failed to delete job:', error);
            }
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Job Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                    <Plus size={20} />
                    <span>Add Job</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Department"
                                value={formData.department}
                                onChange={(e) => setFormData({...formData, department: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Location"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>
                        <textarea
                            placeholder="Job Description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-32"
                            required
                        />
                        
                        {/* Requirements */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Requirements</label>
                            {formData.requirements.map((req, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Requirement"
                                    value={req}
                                    onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayField('requirements')}
                                className="text-cyan-400 text-sm"
                            >
                                + Add Requirement
                            </button>
                        </div>

                        {/* Responsibilities */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Responsibilities</label>
                            {formData.responsibilities.map((resp, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Responsibility"
                                    value={resp}
                                    onChange={(e) => updateArrayField('responsibilities', index, e.target.value)}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayField('responsibilities')}
                                className="text-cyan-400 text-sm"
                            >
                                + Add Responsibility
                            </button>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Required Skills</label>
                            {formData.skills.map((skill, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Skill"
                                    value={skill}
                                    onChange={(e) => updateArrayField('skills', index, e.target.value)}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayField('skills')}
                                className="text-cyan-400 text-sm"
                            >
                                + Add Skill
                            </button>
                        </div>

                        {/* Experience & Salary */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Experience (Years)</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={formData.experience.min}
                                        onChange={(e) => setFormData({...formData, experience: {...formData.experience, min: parseInt(e.target.value) || 0}})}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={formData.experience.max}
                                        onChange={(e) => setFormData({...formData, experience: {...formData.experience, max: parseInt(e.target.value) || 0}})}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Salary Range</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min Salary"
                                        value={formData.salary.min}
                                        onChange={(e) => setFormData({...formData, salary: {...formData.salary, min: e.target.value}})}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max Salary"
                                        value={formData.salary.max}
                                        onChange={(e) => setFormData({...formData, salary: {...formData.salary, max: e.target.value}})}
                                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Priority (Higher number = Higher priority)</label>
                            <input
                                type="number"
                                placeholder="Priority"
                                value={formData.priority}
                                onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value) || 0})}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                <Save size={16} className="inline mr-2" />
                                Save Job
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            >
                                <X size={16} className="inline mr-2" />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left">Job Title</th>
                                <th className="px-6 py-3 text-left">Department</th>
                                <th className="px-6 py-3 text-left">Type</th>
                                <th className="px-6 py-3 text-left">Location</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job._id} className="border-t border-gray-700">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold">{job.title}</p>
                                            <p className="text-sm text-gray-400 truncate max-w-xs">{job.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{job.department}</td>
                                    <td className="px-6 py-4">{job.type}</td>
                                    <td className="px-6 py-4">{job.location}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleJobStatus(job._id, job.isActive)}
                                            className={`px-3 py-1 rounded text-xs font-medium ${
                                                job.isActive 
                                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                            }`}
                                        >
                                            {job.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingJob(job);
                                                    setFormData({
                                                        ...job,
                                                        requirements: job.requirements || [''],
                                                        responsibilities: job.responsibilities || [''],
                                                        skills: job.skills || [''],
                                                        benefits: job.benefits || [''],
                                                        salary: job.salary || { min: '', max: '', currency: 'USD' }
                                                    });
                                                    setShowForm(true);
                                                }}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteJob(job._id)}
                                                className="text-red-400 hover:text-red-300 p-1"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ContactManager = () => {
    const [activeSection, setActiveSection] = useState('contacts');
    const [contacts, setContacts] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/contacts', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setContacts(data.contacts);
            }
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/applications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setApplications(data.applications);
            }
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateApplicationStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/applications/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            
            if (response.ok) {
                fetchApplications();
            }
        } catch (error) {
            console.error('Failed to update application status:', error);
        }
    };

    useEffect(() => {
        if (activeSection === 'contacts') {
            fetchContacts();
        } else {
            fetchApplications();
        }
    }, [activeSection]);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Contact & Applications Management</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setActiveSection('contacts')}
                        className={`px-4 py-2 rounded-lg transition ${
                            activeSection === 'contacts' 
                                ? 'bg-cyan-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Contacts
                    </button>
                    <button
                        onClick={() => setActiveSection('applications')}
                        className={`px-4 py-2 rounded-lg transition ${
                            activeSection === 'applications' 
                                ? 'bg-cyan-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Job Applications
                    </button>
                </div>
            </div>
            
            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : (
                <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        {activeSection === 'contacts' ? (
                            <table className="w-full">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Name</th>
                                        <th className="px-6 py-3 text-left">Email</th>
                                        <th className="px-6 py-3 text-left">Subject</th>
                                        <th className="px-6 py-3 text-left">Date</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((contact) => (
                                        <tr key={contact._id} className="border-t border-gray-700">
                                            <td className="px-6 py-4">{contact.name}</td>
                                            <td className="px-6 py-4">{contact.email}</td>
                                            <td className="px-6 py-4">{contact.subject}</td>
                                            <td className="px-6 py-4">{new Date(contact.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    contact.status === 'new' ? 'bg-blue-600' : 
                                                    contact.status === 'contacted' ? 'bg-yellow-600' : 'bg-green-600'
                                                }`}>
                                                    {contact.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Applicant</th>
                                        <th className="px-6 py-3 text-left">Job Title</th>
                                        <th className="px-6 py-3 text-left">Experience</th>
                                        <th className="px-6 py-3 text-left">Applied Date</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app._id} className="border-t border-gray-700">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold">{app.applicantName}</p>
                                                    <p className="text-sm text-gray-400">{app.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{app.jobTitle}</td>
                                            <td className="px-6 py-4">{app.experience} years</td>
                                            <td className="px-6 py-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={app.status}
                                                    onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                                                    className={`px-2 py-1 rounded text-xs bg-gray-700 border border-gray-600 ${
                                                        app.status === 'applied' ? 'text-blue-300' :
                                                        app.status === 'screening' ? 'text-yellow-300' :
                                                        app.status === 'interview' ? 'text-purple-300' :
                                                        app.status === 'selected' ? 'text-green-300' :
                                                        app.status === 'rejected' ? 'text-red-300' : 'text-gray-300'
                                                    }`}
                                                >
                                                    <option value="applied">Applied</option>
                                                    <option value="screening">Screening</option>
                                                    <option value="interview">Interview</option>
                                                    <option value="selected">Selected</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="on-hold">On Hold</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => window.open(`http://localhost:5000/${app.resumeUrl}`, '_blank')}
                                                        className="text-cyan-400 hover:text-cyan-300 text-sm"
                                                        title="View Resume"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const MediaManager = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                setUploadedFiles([...uploadedFiles, result]);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Media Management</h1>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                <h3 className="text-xl font-bold mb-4">Upload Files</h3>
                <form onSubmit={handleFileUpload} className="space-y-4">
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                    <button
                        type="submit"
                        disabled={!selectedFile || uploading}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : 'Upload File'}
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {uploadedFiles.map((file, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-gray-400 mb-2">{file.filename}</p>
                        <p className="text-xs text-gray-500">{file.url}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ServiceRequestManager = () => {
    const [allRequests, setAllRequests] = useState([
        {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            company: 'Tech Corp',
            serviceType: 'web-design-development',
            budget: '5k-15k',
            timeline: '1-month',
            description: 'Need a modern website for my business with responsive design',
            status: 'pending',
            priority: 'medium',
            createdAt: new Date()
        },
        {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            company: 'Marketing Inc',
            serviceType: 'software-development',
            budget: '15k-50k',
            timeline: '2-3-months',
            description: 'Custom CRM software development for our sales team',
            status: 'active',
            priority: 'high',
            createdAt: new Date()
        },
        {
            _id: '3',
            name: 'Bob Wilson',
            email: 'bob@example.com',
            company: 'AI Solutions',
            serviceType: 'ai-works-automation',
            budget: '50k-100k',
            timeline: '3-6-months',
            description: 'AI automation for business processes and workflow optimization',
            status: 'pending',
            priority: 'high',
            createdAt: new Date()
        }
    ]);
    const [serviceRequests, setServiceRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterServiceType, setFilterServiceType] = useState('');

    const fetchAllRequests = async () => {
        // Use sample data for now, but also try to fetch from API
        setServiceRequests(allRequests);
        
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/service-requests', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.serviceRequests && data.serviceRequests.length > 0) {
                    setAllRequests(data.serviceRequests);
                    setServiceRequests(data.serviceRequests);
                }
            }
        } catch (error) {
            console.error('Failed to fetch service requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterRequests = () => {
        let filtered = [...allRequests];
        if (filterStatus) {
            filtered = filtered.filter(req => req.status === filterStatus);
        }
        if (filterServiceType) {
            filtered = filtered.filter(req => req.serviceType === filterServiceType);
        }
        setServiceRequests(filtered);
    };

    const updateServiceRequestStatus = async (id, status, priority, assignedTo, notes) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/service-requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status, priority, assignedTo, notes })
            });
            
            if (response.ok) {
                fetchAllRequests();
            }
        } catch (error) {
            console.error('Failed to update service request:', error);
        }
    };

    useEffect(() => {
        fetchAllRequests();
    }, []);

    useEffect(() => {
        filterRequests();
    }, [filterStatus, filterServiceType, allRequests]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-300 bg-yellow-600/20';
            case 'active': return 'text-green-300 bg-green-600/20';
            case 'inactive': return 'text-gray-300 bg-gray-600/20';
            case 'completed': return 'text-blue-300 bg-blue-600/20';
            case 'cancelled': return 'text-red-300 bg-red-600/20';
            default: return 'text-gray-300 bg-gray-600/20';
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Service Requests</h1>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <select
                        value={filterServiceType}
                        onChange={(e) => setFilterServiceType(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    >
                        <option value="">All Services</option>
                        <option value="web-design-development">Web Design & Development (MERN)</option>
                        <option value="software-development">Software Development</option>
                        <option value="ai-works-automation">AI Works & Automation</option>
                        <option value="seo">SEO (Search Engine Optimization)</option>
                        <option value="fb-insta-google-youtube-ads">FB & Insta / Google / YouTube Ads</option>
                        <option value="social-media-marketing">Social Media Marketing</option>
                        <option value="content-marketing">Content Marketing</option>
                        <option value="lead-generation">Lead Generation</option>
                        <option value="graphics-designing">Graphics Designing</option>
                        <option value="advertisement-design">Advertisement Design</option>
                        <option value="banner-poster-design">Banner | Poster Design</option>
                        <option value="all-cards-design">All Cards Design</option>
                        <option value="logo-designing">Logo Designing</option>
                        <option value="video-editing">Video Editing</option>
                        <option value="vfx-video-editing">VFX Video Editing</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            
            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : serviceRequests.length === 0 ? (
                <div className="bg-gray-900 rounded-xl border border-white/10 p-8 text-center">
                    <p className="text-gray-400">No service requests found.</p>
                    <p className="text-sm text-gray-500 mt-2">Service requests will appear here when clients submit them.</p>
                </div>
            ) : (
                <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left">Client</th>
                                    <th className="px-6 py-3 text-left">Service Type</th>
                                    <th className="px-6 py-3 text-left">Budget</th>
                                    <th className="px-6 py-3 text-left">Timeline</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Priority</th>
                                    <th className="px-6 py-3 text-left">Date</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceRequests.map((request) => (
                                    <tr key={request._id} className="border-t border-gray-700">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold">{request.name}</p>
                                                <p className="text-sm text-gray-400">{request.email}</p>
                                                {request.company && <p className="text-xs text-gray-500">{request.company}</p>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize">{request.serviceType ? request.serviceType.replace('-', ' ') : 'Not specified'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize">{request.budget || 'Not specified'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize">{request.timeline || 'Not specified'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={request.status || 'pending'}
                                                onChange={(e) => updateServiceRequestStatus(request._id, e.target.value, request.priority, request.assignedTo, request.notes)}
                                                className={`px-2 py-1 rounded text-xs bg-gray-700 border border-gray-600 text-white ${getStatusColor(request.status)}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={request.priority || 'medium'}
                                                onChange={(e) => updateServiceRequestStatus(request._id, request.status, e.target.value, request.assignedTo, request.notes)}
                                                className="px-2 py-1 rounded text-xs bg-gray-700 border border-gray-600 text-white"
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    const description = request.description.length > 100 
                                                        ? request.description.substring(0, 100) + '...' 
                                                        : request.description;
                                                    alert(`Description: ${description}\n\nRequirements: ${request.requirements || 'None'}\n\nNotes: ${request.notes || 'None'}`);
                                                }}
                                                className="text-cyan-400 hover:text-cyan-300 text-sm"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        bio: '',
        image: '',
        skills: [''],
        experience: '',
        email: '',
        linkedin: '',
        github: '',
        isActive: true,
        order: 0
    });

    const fetchTeam = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/team', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTeam(data);
            }
        } catch (error) {
            console.error('Failed to fetch team:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const url = editingMember 
                ? `http://localhost:5000/api/admin/team/${editingMember._id}`
                : 'http://localhost:5000/api/admin/team';
            
            const response = await fetch(url, {
                method: editingMember ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    skills: formData.skills.filter(s => s.trim())
                })
            });

            if (response.ok) {
                fetchTeam();
                setShowForm(false);
                setEditingMember(null);
                setFormData({
                    name: '', position: '', bio: '', image: '', skills: [''],
                    experience: '', email: '', linkedin: '', github: '',
                    isActive: true, order: 0
                });
            }
        } catch (error) {
            console.error('Failed to save team member:', error);
        }
    };

    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, '']
        });
    };

    const updateSkill = (index, value) => {
        const newSkills = [...formData.skills];
        newSkills[index] = value;
        setFormData({
            ...formData,
            skills: newSkills
        });
    };

    const toggleMemberStatus = async (memberId, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/team/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isActive: !currentStatus })
            });
            
            if (response.ok) {
                fetchTeam();
            }
        } catch (error) {
            console.error('Failed to toggle member status:', error);
        }
    };

    const deleteMember = async (memberId) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://localhost:5000/api/admin/team/${memberId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    fetchTeam();
                }
            } catch (error) {
                console.error('Failed to delete team member:', error);
            }
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Team Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                    <Plus size={20} />
                    <span>Add Team Member</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Position/Title"
                                value={formData.position}
                                onChange={(e) => setFormData({...formData, position: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>
                        <textarea
                            placeholder="Bio/Description"
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-32"
                            required
                        />
                        <div className="space-y-2">
                            <input
                                type="url"
                                placeholder="Profile Image URL"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            {formData.image && (
                                <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-full" />
                            )}
                        </div>
                        
                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Skills</label>
                            {formData.skills.map((skill, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Skill"
                                    value={skill}
                                    onChange={(e) => updateSkill(index, e.target.value)}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={addSkill}
                                className="text-cyan-400 text-sm"
                            >
                                + Add Skill
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Experience (e.g., 5+ years)"
                                value={formData.experience}
                                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                            <input
                                type="email"
                                placeholder="Email (optional)"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="url"
                                placeholder="LinkedIn URL (optional)"
                                value={formData.linkedin}
                                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                            <input
                                type="url"
                                placeholder="GitHub URL (optional)"
                                value={formData.github}
                                onChange={(e) => setFormData({...formData, github: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Display Order (Lower number = Higher priority)</label>
                            <input
                                type="number"
                                placeholder="Order"
                                value={formData.order}
                                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                <Save size={16} className="inline mr-2" />
                                Save Member
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            >
                                <X size={16} className="inline mr-2" />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left">Member</th>
                                <th className="px-6 py-3 text-left">Position</th>
                                <th className="px-6 py-3 text-left">Skills</th>
                                <th className="px-6 py-3 text-left">Experience</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team.map((member) => (
                                <tr key={member._id} className="border-t border-gray-700">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-12 h-12 object-cover rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold">{member.name}</p>
                                                <p className="text-sm text-gray-400 truncate max-w-xs">{member.bio}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{member.position}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {member.skills?.slice(0, 3).map((skill, index) => (
                                                <span key={index} className="px-2 py-1 bg-cyan-600 text-xs rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                            {member.skills?.length > 3 && (
                                                <span className="text-xs text-gray-400">+{member.skills.length - 3}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{member.experience || 'Not specified'}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleMemberStatus(member._id, member.isActive)}
                                            className={`px-3 py-1 rounded text-xs font-medium ${
                                                member.isActive 
                                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                            }`}
                                        >
                                            {member.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingMember(member);
                                                    setFormData({
                                                        ...member,
                                                        skills: member.skills || ['']
                                                    });
                                                    setShowForm(true);
                                                }}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteMember(member._id)}
                                                className="text-red-400 hover:text-red-300 p-1"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AdminManager = ({ currentUser, setCurrentUser }) => {
    const [admins, setAdmins] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'admin'
    });
    const [message, setMessage] = useState('');

    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/admins', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAdmins(data);
            }
        } catch (error) {
            console.error('Failed to fetch admins:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const url = editingAdmin 
                ? `http://localhost:5000/api/admin/admins/${editingAdmin._id}`
                : 'http://localhost:5000/api/admin/admins';
            
            const response = await fetch(url, {
                method: editingAdmin ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage(editingAdmin ? 'Admin updated successfully!' : 'Admin created successfully!');
                
                // Update current user if editing own profile
                if (editingAdmin && currentUser && 
                    (editingAdmin._id === currentUser._id || 
                     editingAdmin.username === currentUser.username || 
                     editingAdmin.email === currentUser.email)) {
                    const updatedUser = { ...currentUser, username: formData.username, email: formData.email };
                    setCurrentUser(updatedUser);
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                }
                
                setFormData({ username: '', email: '', password: '', role: 'admin' });
                setShowForm(false);
                setEditingAdmin(null);
                fetchAdmins();
            } else {
                const result = await response.json();
                setMessage(result.message || `Failed to ${editingAdmin ? 'update' : 'create'} admin`);
            }
        } catch (error) {
            setMessage(`Failed to ${editingAdmin ? 'update' : 'create'} admin`);
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const toggleAdminStatus = async (adminId, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/admins/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isActive: !currentStatus })
            });
            
            if (response.ok) {
                fetchAdmins();
            }
        } catch (error) {
            console.error('Failed to toggle admin status:', error);
        }
    };

    const resetAdminPassword = async (adminId, newPassword) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/admins/${adminId}/reset-password`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPassword })
            });
            
            if (response.ok) {
                setMessage('Password reset successfully!');
            } else {
                const result = await response.json();
                setMessage(result.message || 'Failed to reset password');
            }
        } catch (error) {
            setMessage('Failed to reset password');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const deleteAdmin = async (adminId) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://localhost:5000/api/admin/admins/${adminId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    setMessage('Admin deleted successfully!');
                    fetchAdmins();
                } else {
                    const result = await response.json();
                    setMessage(result.message || 'Failed to delete admin');
                }
            } catch (error) {
                setMessage('Failed to delete admin');
            }
            setTimeout(() => setMessage(''), 3000);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Users</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                    <Plus size={20} />
                    <span>Add Admin</span>
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg mb-6 ${
                    message.includes('successfully') 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-red-900 text-red-300'
                }`}>
                    {message}
                </div>
            )}

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                    <h3 className="text-xl font-bold mb-4">{editingAdmin ? 'Edit Admin' : 'Add New Admin'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="password"
                                placeholder={editingAdmin ? "New Password (leave blank to keep current)" : "Password"}
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required={!editingAdmin}
                                minLength="6"
                            />
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            >
                                <option value="admin">Admin</option>
                                <option value="super-admin">Super Admin</option>
                                <option value="editor">Editor</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                {editingAdmin ? 'Update Admin' : 'Create Admin'}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingAdmin(null);
                                    setFormData({ username: '', email: '', password: '', role: 'admin' });
                                }}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-3 sm:px-6 py-3 text-left">Username</th>
                                <th className="px-3 sm:px-6 py-3 text-left hidden sm:table-cell">Email</th>
                                <th className="px-3 sm:px-6 py-3 text-left">Role</th>
                                <th className="px-3 sm:px-6 py-3 text-left">Status</th>
                                <th className="px-3 sm:px-6 py-3 text-left hidden md:table-cell">Created</th>
                                <th className="px-3 sm:px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin._id} className="border-t border-gray-700">
                                    <td className="px-3 sm:px-6 py-4">
                                        <div>
                                            <p className="font-semibold">{admin.username}</p>
                                            <p className="text-sm text-gray-400 sm:hidden">{admin.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">{admin.email}</td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            admin.role === 'super-admin' ? 'bg-purple-600' :
                                            admin.role === 'admin' ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}>
                                            {admin.role}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <button
                                            onClick={() => toggleAdminStatus(admin._id, admin.isActive)}
                                            className={`px-2 sm:px-3 py-1 rounded text-xs font-medium ${
                                                admin.isActive 
                                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                            }`}
                                        >
                                            {admin.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-400 hidden md:table-cell">
                                        {new Date(admin.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 sm:px-6 py-4">
                                        <div className="flex space-x-1 sm:space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingAdmin(admin);
                                                    setFormData({
                                                        username: admin.username,
                                                        email: admin.email,
                                                        password: '',
                                                        role: admin.role
                                                    });
                                                    setShowForm(true);
                                                }}
                                                className="text-blue-400 hover:text-blue-300 p-1 sm:p-2 rounded hover:bg-gray-800"
                                                title="Edit Admin"
                                            >
                                                <Edit size={14} className="sm:w-4 sm:h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteAdmin(admin._id)}
                                                className="text-red-400 hover:text-red-300 p-1 sm:p-2 rounded hover:bg-gray-800"
                                                title="Delete Admin"
                                            >
                                                <Trash2 size={14} className="sm:w-4 sm:h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const EmployeeManager = () => {
    const [employees, setEmployees] = useState([]);
    const [applications, setApplications] = useState([]);
    const [showHireForm, setShowHireForm] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [hireData, setHireData] = useState({
        username: '',
        password: '',
        position: '',
        department: ''
    });

    const deleteEmployee = async (employeeId, username) => {
        if (window.confirm(`Are you sure you want to delete employee ${username}? This will prevent them from logging in.`)) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://localhost:5000/api/admin/employees/${employeeId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    fetchEmployees();
                } else {
                    // Fallback to local deletion
                    const localEmployees = JSON.parse(localStorage.getItem('localEmployees') || '[]');
                    const updatedEmployees = localEmployees.filter(emp => emp._id !== employeeId);
                    localStorage.setItem('localEmployees', JSON.stringify(updatedEmployees));
                    setEmployees(prev => prev.filter(emp => emp._id !== employeeId));
                }
            } catch (error) {
                // Fallback to local deletion
                const localEmployees = JSON.parse(localStorage.getItem('localEmployees') || '[]');
                const updatedEmployees = localEmployees.filter(emp => emp._id !== employeeId);
                localStorage.setItem('localEmployees', JSON.stringify(updatedEmployees));
                setEmployees(prev => prev.filter(emp => emp._id !== employeeId));
            }
            
            // Store deleted employee info for login blocking
            const deletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
            deletedEmployees.push({ id: employeeId, username, deletedAt: new Date().toISOString() });
            localStorage.setItem('deletedEmployees', JSON.stringify(deletedEmployees));
            
            alert(`Employee ${username} has been deleted and can no longer login.`);
        }
    };

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/employees', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const apiEmployees = await response.json();
                const localEmployees = JSON.parse(localStorage.getItem('localEmployees') || '[]');
                setEmployees([...localEmployees, ...apiEmployees]);
            } else {
                // Load from localStorage if API fails
                let localEmployees = JSON.parse(localStorage.getItem('localEmployees') || '[]');
                
                if (localEmployees.length === 0) {
                    // Add sample employees if none exist
                    const sampleEmployees = [
                        {
                            _id: 'emp1',
                            username: 'john_dev',
                            fullName: 'John Developer',
                            email: 'john@a3digital.com',
                            position: 'Frontend Developer',
                            department: 'Development',
                            hireDate: new Date().toISOString(),
                            isActive: true
                        },
                        {
                            _id: 'emp2',
                            username: 'sarah_design',
                            fullName: 'Sarah Designer',
                            email: 'sarah@a3digital.com',
                            position: 'UI/UX Designer',
                            department: 'Design',
                            hireDate: new Date().toISOString(),
                            isActive: true
                        }
                    ];
                    localStorage.setItem('localEmployees', JSON.stringify(sampleEmployees));
                    localEmployees = sampleEmployees;
                }
                
                // Filter out deleted employees
                const deletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
                const deletedIds = deletedEmployees.map(emp => emp.id);
                const activeEmployees = localEmployees.filter(emp => !deletedIds.includes(emp._id));
                
                setEmployees(activeEmployees);
            }
        } catch (error) {
            console.error('Failed to fetch employees:', error);
            let localEmployees = JSON.parse(localStorage.getItem('localEmployees') || '[]');
            
            // Filter out deleted employees
            const deletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
            const deletedIds = deletedEmployees.map(emp => emp.id);
            const activeEmployees = localEmployees.filter(emp => !deletedIds.includes(emp._id));
            
            setEmployees(activeEmployees);
        }
    };

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/applications?status=selected', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setApplications(data.applications);
            }
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        }
    };

    const handleHire = async (e) => {
        e.preventDefault();
        
        // Check for duplicate username or email
        const duplicateUsername = employees.find(emp => emp.username === hireData.username);
        const duplicateEmail = employees.find(emp => emp.email === selectedApplication.email);
        
        if (duplicateUsername) {
            alert('Username already exists. Please choose a different username.');
            return;
        }
        
        if (duplicateEmail) {
            alert('Email already exists. This employee is already hired.');
            return;
        }
        
        try {
            const token = localStorage.getItem('adminToken');
            const payload = {
                ...hireData,
                applicationId: selectedApplication._id
            };
            console.log('Hiring payload:', payload);
            
            const response = await fetch('http://localhost:5000/api/admin/hire-candidate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log('Hire response:', result);

            if (response.ok) {
                alert('Candidate hired successfully!');
                fetchEmployees();
                fetchApplications();
            } else {
                // Store in localStorage if API fails
                const newEmployee = {
                    _id: Date.now().toString(),
                    username: hireData.username,
                    fullName: selectedApplication.applicantName,
                    email: selectedApplication.email,
                    position: hireData.position,
                    department: hireData.department,
                    hireDate: new Date().toISOString(),
                    isActive: true
                };
                
                const localEmployees = JSON.parse(localStorage.getItem('localEmployees') || '[]');
                localStorage.setItem('localEmployees', JSON.stringify([newEmployee, ...localEmployees]));
                
                alert('Candidate hired successfully!');
                fetchEmployees();
            }
            
            setShowHireForm(false);
            setHireData({ username: '', password: '', position: '', department: '' });
            setSelectedApplication(null);
        } catch (error) {
            console.error('Failed to hire candidate:', error);
            alert('Error hiring candidate: ' + error.message);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchApplications();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Employee Management</h1>
            </div>

            {/* Selected Applications for Hiring */}
            <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                <h3 className="text-xl font-bold mb-4">Selected Candidates for Hiring</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {applications.map((app) => (
                        <div key={app._id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <h4 className="font-semibold">{app.applicantName}</h4>
                            <p className="text-sm text-gray-400">{app.email}</p>
                            <p className="text-sm text-gray-400">{app.jobTitle}</p>
                            <button
                                onClick={() => {
                                    setSelectedApplication(app);
                                    setShowHireForm(true);
                                }}
                                className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                                Hire
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hire Form */}
            {showHireForm && selectedApplication && (
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                    <h3 className="text-xl font-bold mb-4">Hire {selectedApplication.applicantName}</h3>
                    <form onSubmit={handleHire} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={hireData.username}
                                onChange={(e) => setHireData({...hireData, username: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={hireData.password}
                                onChange={(e) => setHireData({...hireData, password: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                                minLength="6"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Position"
                                value={hireData.position}
                                onChange={(e) => setHireData({...hireData, position: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Department"
                                value={hireData.department}
                                onChange={(e) => setHireData({...hireData, department: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                Hire Employee
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowHireForm(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Employees List */}
            <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left">Employee</th>
                                <th className="px-6 py-3 text-left">Position</th>
                                <th className="px-6 py-3 text-left">Department</th>
                                <th className="px-6 py-3 text-left">Hire Date</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee._id} className="border-t border-gray-700">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold">{employee.fullName}</p>
                                            <p className="text-sm text-gray-400">{employee.username}</p>
                                            <p className="text-sm text-gray-400">{employee.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{employee.position}</td>
                                    <td className="px-6 py-4">{employee.department}</td>
                                    <td className="px-6 py-4">{new Date(employee.hireDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded text-xs font-medium ${
                                            employee.isActive 
                                                ? 'bg-green-600 text-white' 
                                                : 'bg-red-600 text-white'
                                        }`}>
                                            {employee.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => deleteEmployee(employee._id, employee.username)}
                                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        project: '',
        assignedTo: '',
        priority: 'Medium',
        dueDate: '',
        estimatedHours: 0,
        requirements: [''],
        deliverables: ['']
    });

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/tasks', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const apiTasks = await response.json();
                const localTasks = JSON.parse(localStorage.getItem('adminTasks') || '[]');
                setTasks([...localTasks, ...apiTasks]);
            } else {
                // Load from localStorage if API fails
                const localTasks = JSON.parse(localStorage.getItem('adminTasks') || '[]');
                setTasks(localTasks);
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            // Load from localStorage if API fails
            const localTasks = JSON.parse(localStorage.getItem('adminTasks') || '[]');
            setTasks(localTasks);
        }
    };

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/employees', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setEmployees(data.filter(emp => emp.isActive));
            } else {
                // Load from localStorage if API fails
                const localEmployees = JSON.parse(localStorage.getItem('localEmployees') || '[]');
                const deletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
                const deletedIds = deletedEmployees.map(emp => emp.id);
                const activeEmployees = localEmployees.filter(emp => !deletedIds.includes(emp._id) && emp.isActive);
                setEmployees(activeEmployees);
            }
        } catch (error) {
            console.error('Failed to fetch employees:', error);
            // Load from localStorage if API fails
            const localEmployees = JSON.parse(localStorage.getItem('localEmployees') || '[]');
            const deletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
            const deletedIds = deletedEmployees.map(emp => emp.id);
            const activeEmployees = localEmployees.filter(emp => !deletedIds.includes(emp._id) && emp.isActive);
            setEmployees(activeEmployees);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const url = editingTask 
                ? `http://localhost:5000/api/admin/tasks/${editingTask._id}`
                : 'http://localhost:5000/api/admin/tasks';
            
            const response = await fetch(url, {
                method: editingTask ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    requirements: formData.requirements.filter(r => r.trim()),
                    deliverables: formData.deliverables.filter(d => d.trim())
                })
            });

            if (response.ok) {
                fetchTasks();
            } else {
                // Store/update task in localStorage if API fails
                const existingTasks = JSON.parse(localStorage.getItem('adminTasks') || '[]');
                
                if (editingTask) {
                    // Update existing task
                    const updatedTasks = existingTasks.map(task => 
                        task._id === editingTask._id 
                            ? { ...task, ...formData }
                            : task
                    );
                    localStorage.setItem('adminTasks', JSON.stringify(updatedTasks));
                } else {
                    // Create new task
                    const newTask = {
                        _id: Date.now().toString(),
                        ...formData,
                        status: 'Assigned',
                        createdAt: new Date().toISOString()
                    };
                    localStorage.setItem('adminTasks', JSON.stringify([newTask, ...existingTasks]));
                }
                fetchTasks();
            }
            
            setShowForm(false);
            setEditingTask(null);
            setFormData({
                title: '', description: '', project: '', assignedTo: '',
                priority: 'Medium', dueDate: '', estimatedHours: 0,
                requirements: [''], deliverables: ['']
            });
        } catch (error) {
            console.error('Failed to save task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://localhost:5000/api/admin/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    fetchTasks();
                } else {
                    // Delete from localStorage if API fails
                    const existingTasks = JSON.parse(localStorage.getItem('adminTasks') || '[]');
                    const updatedTasks = existingTasks.filter(task => task._id !== taskId);
                    localStorage.setItem('adminTasks', JSON.stringify(updatedTasks));
                    fetchTasks();
                }
            } catch (error) {
                // Delete from localStorage if API fails
                const existingTasks = JSON.parse(localStorage.getItem('adminTasks') || '[]');
                const updatedTasks = existingTasks.filter(task => task._id !== taskId);
                localStorage.setItem('adminTasks', JSON.stringify(updatedTasks));
                fetchTasks();
            }
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Task Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                    <Plus size={20} />
                    <span>Assign Task</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={formData.project}
                                onChange={(e) => setFormData({...formData, project: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>
                        
                        <textarea
                            placeholder="Task Description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-32"
                            required
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <select
                                value={formData.assignedTo}
                                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp.username || emp._id}>{emp.fullName} - {emp.position}</option>
                                ))}
                                {/* Add sample employees if none exist */}
                                <option value="john_dev">John Developer - Frontend Developer</option>
                                <option value="sarah_design">Sarah Designer - UI/UX Designer</option>
                            </select>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                            <input
                                type="datetime-local"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                <Save size={16} className="inline mr-2" />
                                Assign Task
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            >
                                <X size={16} className="inline mr-2" />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left">Task</th>
                                <th className="px-6 py-3 text-left">Assigned To</th>
                                <th className="px-6 py-3 text-left">Priority</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Due Date</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task._id} className="border-t border-gray-700">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold">{task.title}</p>
                                            <p className="text-sm text-gray-400">{task.project}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{typeof task.assignedTo === 'object' ? task.assignedTo?.fullName || task.assignedTo?.username : task.assignedTo}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            task.priority === 'Urgent' ? 'bg-red-600' :
                                            task.priority === 'High' ? 'bg-orange-600' :
                                            task.priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                                        }`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            task.status === 'Completed' ? 'bg-green-600' :
                                            task.status === 'In Progress' ? 'bg-blue-600' :
                                            task.status === 'Overdue' ? 'bg-red-600' : 'bg-gray-600'
                                        }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingTask(task);
                                                    setFormData({
                                                        ...task,
                                                        requirements: task.requirements || [''],
                                                        deliverables: task.deliverables || ['']
                                                    });
                                                    setShowForm(true);
                                                }}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                title="Edit Task"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task._id)}
                                                className="text-red-400 hover:text-red-300 p-1"
                                                title="Delete Task"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const TaskReportManager = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [reviewData, setReviewData] = useState({ feedback: '', approved: false });

    const fetchReports = async () => {
        // Load reports from localStorage (submitted by employees)
        const employeeReports = JSON.parse(localStorage.getItem('employeeReports') || '[]');
        
        // Clean reports to prevent object rendering errors
        const cleanReports = employeeReports.map(report => ({
            ...report,
            taskId: typeof report.taskId === 'object' ? report.taskId?.title || 'Unknown Task' : report.taskId,
            employeeId: typeof report.employeeId === 'object' ? report.employeeId?._id : report.employeeId
        }));
        
        setReports(cleanReports);
        
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/task-reports', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const apiData = await response.json();
                // Only use API data if localStorage is empty, otherwise use localStorage as source of truth
                if (employeeReports.length === 0) {
                    setReports(apiData);
                }
            }
        } catch (error) {
            console.error('Failed to fetch reports from API:', error);
        }
    };

    const deleteReport = async (reportId) => {
        if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
            // Remove from localStorage
            const employeeReports = JSON.parse(localStorage.getItem('employeeReports') || '[]');
            const updatedReports = employeeReports.filter(report => report._id !== reportId);
            localStorage.setItem('employeeReports', JSON.stringify(updatedReports));
            
            // Update state immediately
            setReports(updatedReports);
            
            try {
                const token = localStorage.getItem('adminToken');
                await fetch(`http://localhost:5000/api/admin/task-reports/${reportId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Failed to delete report via API:', error);
            }
            
            alert('Report deleted successfully!');
        }
    };

    const handleReview = async (reportId, approved) => {
        if (!reviewData.feedback.trim()) {
            alert('Please provide feedback before submitting review');
            return;
        }
        
        // Update localStorage reports
        const employeeReports = JSON.parse(localStorage.getItem('employeeReports') || '[]');
        const updatedReports = employeeReports.map(report => 
            report._id === reportId 
                ? { ...report, adminReview: { reviewed: true, approved, feedback: reviewData.feedback, reviewDate: new Date().toISOString() } }
                : report
        );
        localStorage.setItem('employeeReports', JSON.stringify(updatedReports));
        
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/task-reports/${reportId}/review`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...reviewData, approved })
            });

            if (response.ok) {
                fetchReports();
            }
        } catch (error) {
            console.error('Failed to review report via API:', error);
            // Still update local state even if API fails
            fetchReports();
        }
        
        alert(`Report ${approved ? 'approved' : 'rejected'} successfully!`);
        setSelectedReport(null);
        setReviewData({ feedback: '', approved: false });
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Task Reports</h1>
                <button
                    onClick={fetchReports}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                    Refresh Reports
                </button>
            </div>

            {reports.length === 0 ? (
                <div className="bg-gray-900 rounded-xl border border-white/10 p-8 text-center">
                    <p className="text-gray-400">No task reports found.</p>
                    <p className="text-sm text-gray-500 mt-2">Reports will appear here when employees submit them.</p>
                </div>
            ) : (
                <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left">Report</th>
                                    <th className="px-6 py-3 text-left">Employee</th>
                                    <th className="px-6 py-3 text-left">Task</th>
                                    <th className="px-6 py-3 text-left">Type</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                <tr key={report._id} className="border-t border-gray-700">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold">{report.title}</p>
                                            <p className="text-sm text-gray-400">{report.progressPercentage || 0}% Complete</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{report.employeeName || (typeof report.employeeId === 'object' ? report.employeeId?.fullName : report.employeeId) || 'Unknown'}</td>
                                    <td className="px-6 py-4">{typeof report.taskId === 'object' ? report.taskId?.title : report.taskId}</td>
                                    <td className="px-6 py-4">{report.reportType}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            report.adminReview?.reviewed 
                                                ? (report.adminReview.approved ? 'bg-green-600' : 'bg-red-600')
                                                : 'bg-yellow-600'
                                        }`}>
                                            {report.adminReview?.reviewed 
                                                ? (report.adminReview.approved ? 'Approved' : 'Rejected')
                                                : 'Pending Review'
                                            }
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setSelectedReport(report)}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                title="View Report"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteReport(report._id)}
                                                className="text-red-400 hover:text-red-300 p-1"
                                                title="Delete Report"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Report Review Modal */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-xl border border-white/10 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{selectedReport.title}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <p className="text-gray-300">{selectedReport.description}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Work Completed</label>
                                <p className="text-gray-300">{selectedReport.workCompleted}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Hours Worked</label>
                                    <p className="text-gray-300">{selectedReport.hoursWorked}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Progress</label>
                                    <p className="text-gray-300">{selectedReport.progressPercentage}%</p>
                                </div>
                            </div>
                            
                            {!selectedReport.adminReview?.reviewed && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Admin Feedback *</label>
                                        <textarea
                                            value={reviewData.feedback}
                                            onChange={(e) => setReviewData({...reviewData, feedback: e.target.value})}
                                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                            rows="3"
                                            placeholder="Provide feedback for the employee..."
                                            required
                                        />
                                    </div>
                                </div>
                            )}
                            
                            {selectedReport.adminReview?.reviewed && (
                                <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                                    <p className="text-sm font-medium mb-2">Previous Review:</p>
                                    <p className="text-sm text-gray-300 mb-2">{selectedReport.adminReview.feedback}</p>
                                    <p className="text-xs text-gray-400">Status: {selectedReport.adminReview.approved ? 'Approved' : 'Rejected'}</p>
                                    <p className="text-xs text-gray-400">Reviewed on: {new Date(selectedReport.adminReview.reviewDate).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex space-x-4 mt-6">
                            {!selectedReport.adminReview?.reviewed && (
                                <>
                                    <button
                                        onClick={() => handleReview(selectedReport._id, true)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Approve Report
                                    </button>
                                    <button
                                        onClick={() => handleReview(selectedReport._id, false)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Reject Report
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => {
                                    setSelectedReport(null);
                                    setReviewData({ feedback: '', approved: false });
                                }}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PortfolioManager = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        clientCompany: '',
        category: 'Web Development',
        description: '',
        result: '',
        image: '',
        technologies: [''],
        projectUrl: '',
        completionDate: new Date().toISOString().split('T')[0],
        isActive: true,
        isFeatured: false,
        order: 0
    });

    const categories = [
        'Web Development',
        'Software Development', 
        'SEO & Marketing',
        'Graphics Design',
        'Video & VFX',
        'Mobile App',
        'E-Commerce',
        'AI & Automation',
        'Other'
    ];

    const fetchPortfolio = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/portfolio', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPortfolio(data);
            }
        } catch (error) {
            console.error('Failed to fetch portfolio:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const url = editingProject 
                ? `http://localhost:5000/api/admin/portfolio/${editingProject._id}`
                : 'http://localhost:5000/api/admin/portfolio';
            
            const response = await fetch(url, {
                method: editingProject ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    technologies: formData.technologies.filter(t => t.trim())
                })
            });

            if (response.ok) {
                fetchPortfolio();
                setShowForm(false);
                setEditingProject(null);
                setFormData({
                    title: '', clientCompany: '', category: 'Web Development', description: '',
                    result: '', image: '', technologies: [''], projectUrl: '',
                    completionDate: new Date().toISOString().split('T')[0],
                    isActive: true, isFeatured: false, order: 0
                });
            }
        } catch (error) {
            console.error('Failed to save project:', error);
        }
    };

    const addTechnology = () => {
        setFormData({
            ...formData,
            technologies: [...formData.technologies, '']
        });
    };

    const updateTechnology = (index, value) => {
        const newTechnologies = [...formData.technologies];
        newTechnologies[index] = value;
        setFormData({
            ...formData,
            technologies: newTechnologies
        });
    };

    const toggleProjectStatus = async (projectId, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/admin/portfolio/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isActive: !currentStatus })
            });
            
            if (response.ok) {
                fetchPortfolio();
            }
        } catch (error) {
            console.error('Failed to toggle project status:', error);
        }
    };

    const deleteProject = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://localhost:5000/api/admin/portfolio/${projectId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    fetchPortfolio();
                }
            } catch (error) {
                console.error('Failed to delete project:', error);
            }
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Portfolio Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                    <Plus size={20} />
                    <span>Add Project</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Project Title"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Client Company"
                                value={formData.clientCompany}
                                onChange={(e) => setFormData({...formData, clientCompany: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Result/Achievement"
                                value={formData.result}
                                onChange={(e) => setFormData({...formData, result: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>

                        <textarea
                            placeholder="Project Description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-32"
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="url"
                                placeholder="Project Image URL"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                            <input
                                type="url"
                                placeholder="Project URL (optional)"
                                value={formData.projectUrl}
                                onChange={(e) => setFormData({...formData, projectUrl: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>

                        {/* Technologies */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Technologies Used</label>
                            {formData.technologies.map((tech, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Technology"
                                    value={tech}
                                    onChange={(e) => updateTechnology(index, e.target.value)}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-2"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={addTechnology}
                                className="text-cyan-400 text-sm"
                            >
                                + Add Technology
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="date"
                                value={formData.completionDate}
                                onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                                    className="mr-2"
                                />
                                <label className="text-sm">Featured Project</label>
                            </div>
                            <input
                                type="number"
                                placeholder="Display Order"
                                value={formData.order}
                                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                <Save size={16} className="inline mr-2" />
                                Save Project
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            >
                                <X size={16} className="inline mr-2" />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left">Project</th>
                                <th className="px-6 py-3 text-left">Client</th>
                                <th className="px-6 py-3 text-left">Category</th>
                                <th className="px-6 py-3 text-left">Result</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map((project) => (
                                <tr key={project._id} className="border-t border-gray-700">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <img 
                                                src={project.image} 
                                                alt={project.title}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-semibold">{project.title}</p>
                                                <p className="text-sm text-gray-400 truncate max-w-xs">{project.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{project.clientCompany}</td>
                                    <td className="px-6 py-4">{project.category}</td>
                                    <td className="px-6 py-4">{project.result}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => toggleProjectStatus(project._id, project.isActive)}
                                                className={`px-3 py-1 rounded text-xs font-medium ${
                                                    project.isActive 
                                                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                                }`}
                                            >
                                                {project.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                            {project.isFeatured && (
                                                <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingProject(project);
                                                    setFormData({
                                                        ...project,
                                                        technologies: project.technologies || [''],
                                                        completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                                                    });
                                                    setShowForm(true);
                                                }}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteProject(project._id)}
                                                className="text-red-400 hover:text-red-300 p-1"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PasswordResetManager = () => {
    const [resetRequests, setResetRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    const fetchResetRequests = () => {
        const requests = JSON.parse(localStorage.getItem('passwordResetRequests') || '[]');
        setResetRequests(requests);
    };

    const handleResetPassword = async (request) => {
        if (!newPassword) {
            alert('Please enter a new password');
            return;
        }

        try {
            // Update the request status
            const updatedRequests = resetRequests.map(req => 
                req._id === request._id 
                    ? { ...req, status: 'completed', newPassword, completedDate: new Date().toISOString() }
                    : req
            );
            localStorage.setItem('passwordResetRequests', JSON.stringify(updatedRequests));
            
            alert(`Password reset for ${request.username}. New password: ${newPassword}`);
            setSelectedRequest(null);
            setNewPassword('');
            fetchResetRequests();
        } catch (error) {
            alert('Failed to reset password');
        }
    };

    useEffect(() => {
        fetchResetRequests();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Password Reset Requests</h1>
                <button
                    onClick={fetchResetRequests}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                    Refresh
                </button>
            </div>

            {resetRequests.length === 0 ? (
                <div className="bg-gray-900 rounded-xl border border-white/10 p-8 text-center">
                    <p className="text-gray-400">No password reset requests found.</p>
                </div>
            ) : (
                <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left">Employee</th>
                                    <th className="px-6 py-3 text-left">Email</th>
                                    <th className="px-6 py-3 text-left">Request Date</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resetRequests.map((request) => (
                                    <tr key={request._id} className="border-t border-gray-700">
                                        <td className="px-6 py-4">{request.username}</td>
                                        <td className="px-6 py-4">{request.email}</td>
                                        <td className="px-6 py-4">{new Date(request.requestDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                request.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
                                            }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {request.status === 'pending' && (
                                                <button
                                                    onClick={() => setSelectedRequest(request)}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                                >
                                                    Reset Password
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Password Reset Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-xl border border-white/10 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold mb-4">Reset Password for {selectedRequest.username}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                    placeholder="Enter new password"
                                    minLength="6"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="flex space-x-4 mt-6">
                            <button
                                onClick={() => handleResetPassword(selectedRequest)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Reset Password
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedRequest(null);
                                    setNewPassword('');
                                }}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Settings = () => {
    const [settings, setSettings] = useState({
        siteName: 'A3 Digital Growth',
        adminEmail: 'admin@a3digitalgrowth.com',
        supportEmail: 'support@a3digitalgrowth.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business St, City, State 12345',
        emailNotifications: true,
        maintenanceMode: false
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/settings', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settings)
            });
            
            if (response.ok) {
                setMessage('Settings saved successfully!');
                localStorage.setItem('siteSettings', JSON.stringify(settings));
            } else {
                setMessage('Failed to save settings');
            }
        } catch (error) {
            console.error('Save settings error:', error);
            localStorage.setItem('siteSettings', JSON.stringify(settings));
            setMessage('Settings saved locally!');
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage('New passwords do not match');
            setTimeout(() => setPasswordMessage(''), 3000);
            return;
        }
        
        if (passwordData.newPassword.length < 6) {
            setPasswordMessage('Password must be at least 6 characters');
            setTimeout(() => setPasswordMessage(''), 3000);
            return;
        }
        
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/admin/change-password', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setPasswordMessage('Password changed successfully!');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setPasswordMessage(result.message || 'Failed to change password');
            }
        } catch (error) {
            console.error('Password change error:', error);
            setPasswordMessage('Failed to change password');
        }
        setTimeout(() => setPasswordMessage(''), 3000);
    };

    const loadSettings = () => {
        const saved = localStorage.getItem('siteSettings');
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-8">Settings</h1>
            
            {message && (
                <div className="bg-green-900 text-green-300 p-4 rounded-lg mb-6">
                    {message}
                </div>
            )}

            <div className="space-y-6">
                {/* General Settings */}
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-4">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Admin Email</label>
                            <input
                                type="email"
                                name="adminEmail"
                                value={settings.adminEmail}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Support Email</label>
                            <input
                                type="email"
                                name="supportEmail"
                                value={settings.supportEmail}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={settings.phone}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* System Settings */}
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-4">System Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleChange}
                                className="mr-3 w-4 h-4"
                            />
                            <label className="text-sm">Enable Email Notifications</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleChange}
                                className="mr-3 w-4 h-4"
                            />
                            <label className="text-sm">Maintenance Mode</label>
                        </div>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-4">Change Password</h3>
                    
                    {passwordMessage && (
                        <div className={`p-4 rounded-lg mb-4 ${
                            passwordMessage.includes('successfully') 
                                ? 'bg-green-900 text-green-300' 
                                : 'bg-red-900 text-red-300'
                        }`}>
                            {passwordMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Current Password</label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">New Password</label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                                minLength="6"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                required
                                minLength="6"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Change Password
                        </button>
                    </form>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;