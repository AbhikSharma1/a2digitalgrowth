import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    BarChart3, FileText, Clock, CheckCircle, AlertCircle, 
    Plus, Upload, User, LogOut, Calendar, Target
} from 'lucide-react';

const EmployeePortal = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordData, setForgotPasswordData] = useState({ username: '', email: '' });

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'tasks', label: 'My Tasks', icon: FileText },
        { id: 'reports', label: 'My Reports', icon: FileText },
        { id: 'profile', label: 'Profile', icon: User }
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Check if employee is deleted
        const deletedEmployees = JSON.parse(localStorage.getItem('deletedEmployees') || '[]');
        const isDeleted = deletedEmployees.some(emp => emp.username === loginData.username);
        
        if (isDeleted) {
            alert('Access denied. Your account has been deactivated. Please contact your administrator.');
            setLoading(false);
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5000/api/employee/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                localStorage.setItem('employeeToken', result.token);
                localStorage.setItem('currentEmployee', JSON.stringify(result.employee));
                setCurrentEmployee(result.employee);
                setIsAuthenticated(true);
            } else {
                // Check for reset password in localStorage
                const resetRequests = JSON.parse(localStorage.getItem('passwordResetRequests') || '[]');
                const resetRequest = resetRequests.find(req => 
                    req.username === loginData.username && 
                    req.status === 'completed' && 
                    req.newPassword === loginData.password
                );
                
                if (resetRequest) {
                    // Create mock employee data for reset password login
                    const mockEmployee = {
                        _id: 'temp_' + Date.now(),
                        username: loginData.username,
                        fullName: loginData.username,
                        email: resetRequest.email,
                        position: 'Employee',
                        department: 'General',
                        isActive: true
                    };
                    
                    localStorage.setItem('employeeToken', 'temp_token_' + Date.now());
                    localStorage.setItem('currentEmployee', JSON.stringify(mockEmployee));
                    setCurrentEmployee(mockEmployee);
                    setIsAuthenticated(true);
                } else {
                    alert(result.message || 'Login failed');
                }
            }
        } catch (error) {
            // Fallback: Check for reset password in localStorage
            const resetRequests = JSON.parse(localStorage.getItem('passwordResetRequests') || '[]');
            const resetRequest = resetRequests.find(req => 
                req.username === loginData.username && 
                req.status === 'completed' && 
                req.newPassword === loginData.password
            );
            
            if (resetRequest) {
                const mockEmployee = {
                    _id: 'temp_' + Date.now(),
                    username: loginData.username,
                    fullName: loginData.username,
                    email: resetRequest.email,
                    position: 'Employee',
                    department: 'General',
                    isActive: true
                };
                
                localStorage.setItem('employeeToken', 'temp_token_' + Date.now());
                localStorage.setItem('currentEmployee', JSON.stringify(mockEmployee));
                setCurrentEmployee(mockEmployee);
                setIsAuthenticated(true);
            } else {
                alert('Login failed. Please check if backend is running.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('employeeToken');
        localStorage.removeItem('currentEmployee');
        setIsAuthenticated(false);
        setCurrentEmployee(null);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Store password reset request in localStorage for admin to handle
            const resetRequest = {
                _id: Date.now().toString(),
                username: forgotPasswordData.username,
                email: forgotPasswordData.email,
                requestDate: new Date().toISOString(),
                status: 'pending'
            };
            
            const existingRequests = JSON.parse(localStorage.getItem('passwordResetRequests') || '[]');
            localStorage.setItem('passwordResetRequests', JSON.stringify([resetRequest, ...existingRequests]));
            
            alert('Password reset request submitted! Please contact your admin.');
            setShowForgotPassword(false);
            setForgotPasswordData({ username: '', email: '' });
        } catch (error) {
            alert('Failed to submit password reset request.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('employeeToken');
        const savedEmployee = localStorage.getItem('currentEmployee');
        
        if (token && savedEmployee) {
            try {
                const employeeData = JSON.parse(savedEmployee);
                setCurrentEmployee(employeeData);
                setIsAuthenticated(true);
                
                // Keep using localStorage data since API is not available
            } catch (error) {
                localStorage.removeItem('employeeToken');
                localStorage.removeItem('currentEmployee');
            }
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
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Employee Portal</h1>
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
                        <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="w-full py-2 text-cyan-400 hover:text-cyan-300 text-sm transition"
                        >
                            Forgot Password?
                        </button>
                    </form>
                    
                    {showForgotPassword && (
                        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Reset Password Request</h3>
                            <form onSubmit={handleForgotPassword} className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={forgotPasswordData.username}
                                    onChange={(e) => setForgotPasswordData({...forgotPasswordData, username: e.target.value})}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={forgotPasswordData.email}
                                    onChange={(e) => setForgotPasswordData({...forgotPasswordData, email: e.target.value})}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    required
                                />
                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50"
                                    >
                                        {loading ? 'Submitting...' : 'Submit Request'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotPassword(false)}
                                        className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20 w-full overflow-x-hidden">
            <div className="flex flex-col lg:flex-row relative">
                {/* Mobile Header */}
                <div className="lg:hidden bg-gray-900 p-4 border-b border-white/10 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-cyan-400">Employee Portal</h2>
                        <p className="text-sm text-gray-400">Welcome, {currentEmployee?.fullName}</p>
                    </div>
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
                            <div>
                                <h2 className="text-xl font-bold text-cyan-400">Employee Portal</h2>
                                <p className="text-sm text-gray-400">Welcome, {currentEmployee?.fullName}</p>
                            </div>
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
                                handleLogout();
                                setSidebarOpen(false);
                            }}
                            className="w-full mt-8 flex items-center space-x-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 bg-gray-900 min-h-screen p-6 border-r border-white/10">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-cyan-400">Employee Portal</h2>
                        <p className="text-sm text-gray-400">Welcome, {currentEmployee?.fullName}</p>
                    </div>
                    
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
                        onClick={handleLogout}
                        className="w-full mt-8 flex items-center space-x-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-8 w-full overflow-x-hidden">
                    {activeTab === 'dashboard' && <EmployeeDashboard />}
                    {activeTab === 'tasks' && <EmployeeTasks />}
                    {activeTab === 'reports' && <EmployeeReports />}
                    {activeTab === 'profile' && <EmployeeProfile currentEmployee={currentEmployee} />}
                </div>
            </div>
        </div>
    );
};

const EmployeeDashboard = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            const currentEmployee = JSON.parse(localStorage.getItem('currentEmployee') || '{}');
            let adminTasks = JSON.parse(localStorage.getItem('adminTasks') || '[]');
            
            // Add sample task if no tasks exist and employee is logged in
            if (adminTasks.length === 0 && currentEmployee.username) {
                const sampleTask = {
                    _id: 'sample_task_1',
                    title: 'Sample Development Task',
                    description: 'Complete the frontend development',
                    project: 'A3 Digital Growth Website',
                    assignedTo: currentEmployee.username,
                    priority: 'Medium',
                    status: 'Assigned',
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                };
                adminTasks = [sampleTask];
                localStorage.setItem('adminTasks', JSON.stringify(adminTasks));
            }
            
            // Filter tasks assigned to current employee
            const employeeTasks = adminTasks.filter(task => 
                task.assignedTo === currentEmployee._id || 
                task.assignedTo === currentEmployee.username ||
                task.assignedTo === currentEmployee.fullName ||
                task.assignedTo === currentEmployee.email
            );
            
            // Calculate stats from employee's tasks
            const totalTasks = employeeTasks.length;
            const activeTasks = employeeTasks.filter(task => task.status === 'In Progress').length;
            const completedTasks = employeeTasks.filter(task => task.status === 'Completed').length;
            const overdueTasks = employeeTasks.filter(task => 
                new Date(task.dueDate) < new Date() && task.status !== 'Completed'
            ).length;
            
            setStats({
                totalTasks,
                activeTasks,
                completedTasks,
                overdueTasks,
                recentTasks: employeeTasks.slice(0, 5)
            });
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <StatCard title="Total Tasks" value={stats.totalTasks || 0} icon={FileText} color="blue" />
                <StatCard title="Active Tasks" value={stats.activeTasks || 0} icon={Clock} color="yellow" />
                <StatCard title="Completed" value={stats.completedTasks || 0} icon={CheckCircle} color="green" />
                <StatCard title="Overdue" value={stats.overdueTasks || 0} icon={AlertCircle} color="red" />
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Recent Tasks</h3>
                <div className="space-y-3">
                    {stats.recentTasks && stats.recentTasks.length > 0 ? (
                        stats.recentTasks.map((task, index) => (
                            <div key={task._id || index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                                <div>
                                    <p className="font-semibold">{task.title}</p>
                                    <p className="text-sm text-gray-400">{task.project}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${
                                    task.status === 'Completed' ? 'bg-green-600' :
                                    task.status === 'In Progress' ? 'bg-blue-600' : 'bg-gray-600'
                                }`}>
                                    {task.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-400">
                            <p>No tasks assigned yet.</p>
                            <p className="text-sm">Tasks assigned by admin will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EmployeeTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchTasks = async () => {
        const currentEmployee = JSON.parse(localStorage.getItem('currentEmployee') || '{}');
        let adminTasks = JSON.parse(localStorage.getItem('adminTasks') || '[]');
        
        // Add sample task if no tasks exist and employee is logged in
        if (adminTasks.length === 0 && currentEmployee.username) {
            const sampleTask = {
                _id: 'sample_task_1',
                title: 'Sample Development Task',
                description: 'Complete the frontend development for the new feature',
                project: 'A3 Digital Growth Website',
                assignedTo: currentEmployee.username,
                priority: 'Medium',
                status: 'Assigned',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString()
            };
            adminTasks = [sampleTask];
            localStorage.setItem('adminTasks', JSON.stringify(adminTasks));
        }
        
        // Filter tasks assigned to current employee
        const employeeTasks = adminTasks.filter(task => 
            task.assignedTo === currentEmployee._id || 
            task.assignedTo === currentEmployee.username ||
            task.assignedTo === currentEmployee.fullName ||
            task.assignedTo === currentEmployee.email
        );
        
        setTasks(filter ? employeeTasks.filter(task => task.status === filter) : employeeTasks);
    };



    const updateTaskStatus = async (taskId, status) => {
        try {
            const token = localStorage.getItem('employeeToken');
            const response = await fetch(`http://localhost:5000/api/employee/tasks/${taskId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                fetchTasks();
            } else {
                // Update local tasks if API fails
                setTasks(prev => prev.map(task => 
                    task._id === taskId ? { ...task, status } : task
                ));
            }
        } catch (error) {
            console.error('Failed to update task status:', error);
            // Update local tasks if API fails
            setTasks(prev => prev.map(task => 
                task._id === taskId ? { ...task, status } : task
            ));
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">My Tasks</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                >
                    <option value="">All Tasks</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <TaskCard key={task._id} task={task} onStatusUpdate={updateTaskStatus} />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-900 p-8 rounded-xl border border-white/10 text-center">
                    <p className="text-gray-400 mb-2">No tasks assigned yet.</p>
                    <p className="text-sm text-gray-500">Tasks assigned by admin will appear here.</p>
                </div>
            )}
        </div>
    );
};

const TaskCard = ({ task, onStatusUpdate }) => {
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';
    
    return (
        <div className={`p-6 rounded-xl border ${isOverdue ? 'border-red-500/50 bg-red-900/20' : 'border-white/10 bg-gray-900'}`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                    task.priority === 'Urgent' ? 'bg-red-600' :
                    task.priority === 'High' ? 'bg-orange-600' :
                    task.priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                }`}>
                    {task.priority}
                </span>
            </div>
            
            <p className="text-gray-400 mb-4">{task.description}</p>
            <p className="text-sm text-cyan-400 mb-4">Project: {task.project}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded ${
                    task.status === 'Completed' ? 'bg-green-600' :
                    task.status === 'In Progress' ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                    {task.status}
                </span>
            </div>
            
            {task.status !== 'Completed' && (
                <div className="flex space-x-2">
                    {task.status === 'Assigned' && (
                        <button
                            onClick={() => onStatusUpdate(task._id, 'In Progress')}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                            Start Task
                        </button>
                    )}
                    {task.status === 'In Progress' && (
                        <button
                            onClick={() => onStatusUpdate(task._id, 'Completed')}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                            Mark Complete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const EmployeeReports = () => {
    const [reports, setReports] = useState([]);
    const [tasks, setTasks] = useState([
        { _id: 'task1', title: 'E-commerce Website Development' },
        { _id: 'task2', title: 'Mobile App UI/UX Design' },
        { _id: 'task3', title: 'Database Schema Design' },
        { _id: 'task4', title: 'REST API Implementation' },
        { _id: 'task5', title: 'Frontend Performance Optimization' },
        { _id: 'task6', title: 'User Authentication System' },
        { _id: 'task7', title: 'Payment Gateway Integration' }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        taskId: '',
        reportType: 'Progress Update',
        title: '',
        description: '',
        workCompleted: '',
        hoursWorked: 0,
        progressPercentage: 0,
        challenges: '',
        nextSteps: '',
        isCompleted: false,
        completionNotes: ''
    });

    const fetchReports = async () => {
        // Clear corrupted data and start fresh
        localStorage.removeItem('employeeReports');
        
        // Load reports from localStorage (includes admin reviews)
        const employeeReports = JSON.parse(localStorage.getItem('employeeReports') || '[]');
        const currentEmployee = JSON.parse(localStorage.getItem('currentEmployee') || '{}');
        
        // Clean and normalize reports to prevent object rendering errors
        const cleanReports = employeeReports.map(report => ({
            ...report,
            taskId: typeof report.taskId === 'object' ? report.taskId?.title || 'Unknown Task' : report.taskId,
            employeeId: typeof report.employeeId === 'object' ? report.employeeId?._id : report.employeeId,
            employeeName: typeof report.employeeName === 'string' ? report.employeeName : currentEmployee.fullName
        }));
        
        // Filter reports for current employee
        const myReports = cleanReports.filter(report => 
            report.employeeName === currentEmployee.fullName || 
            report.employeeId === currentEmployee._id ||
            report.employeeUsername === currentEmployee.username
        );
        
        setReports(myReports);
        
        try {
            const token = localStorage.getItem('employeeToken');
            const response = await fetch('http://localhost:5000/api/employee/reports', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const apiReports = await response.json();
                // Merge API reports with localStorage reports
                setReports(prev => [...prev, ...apiReports]);
            }
        } catch (error) {
            console.error('Failed to fetch reports from API:', error);
        }
    };

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('employeeToken');
            const response = await fetch('http://localhost:5000/api/employee/tasks', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data.filter(task => task.status !== 'Completed'));
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            // Add sample data for testing
            setTasks([
                { _id: '1', title: 'Website Development', status: 'In Progress' },
                { _id: '2', title: 'Mobile App Design', status: 'Assigned' },
                { _id: '3', title: 'Database Optimization', status: 'In Progress' }
            ]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.taskId || !formData.title || !formData.description || !formData.workCompleted) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Get current employee from localStorage or context
        const employeeData = JSON.parse(localStorage.getItem('currentEmployee') || '{}');
        
        // Create new report object
        const newReport = {
            _id: Date.now().toString(),
            ...formData,
            taskId: formData.taskId,
            employeeName: employeeData?.fullName || 'Employee',
            employeeId: employeeData?._id,
            employeeUsername: employeeData?.username,
            createdAt: new Date().toISOString(),
            adminReview: { reviewed: false, approved: false, feedback: '', reviewDate: null }
        };
        
        // Add to reports list
        setReports(prev => [newReport, ...prev]);
        
        // Store in localStorage for admin access
        const existingReports = JSON.parse(localStorage.getItem('employeeReports') || '[]');
        localStorage.setItem('employeeReports', JSON.stringify([newReport, ...existingReports]));
        
        alert('Report submitted successfully!');
        setShowForm(false);
        setFormData({
            taskId: '', reportType: 'Progress Update', title: '', description: '',
            workCompleted: '', hoursWorked: 0, progressPercentage: 0,
            challenges: '', nextSteps: '', isCompleted: false, completionNotes: ''
        });
    };

    useEffect(() => {
        fetchReports();
        fetchTasks();
        // Set default tasks if none exist
        if (tasks.length === 0) {
            setTasks([
                { _id: 'task1', title: 'Website Development Project' },
                { _id: 'task2', title: 'Mobile App UI Design' },
                { _id: 'task3', title: 'Database Integration' },
                { _id: 'task4', title: 'API Development' },
                { _id: 'task5', title: 'Frontend Optimization' }
            ]);
        }
        
        // Refresh reports every 30 seconds to get latest admin reviews
        const interval = setInterval(fetchReports, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">My Reports</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                >
                    <Plus size={20} />
                    <span>Submit Report</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <select
                                value={formData.taskId}
                                onChange={(e) => setFormData({...formData, taskId: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                                required
                            >
                                <option value="">-- Select Your Assigned Task --</option>
                                <option value="Website Development">Website Development</option>
                                <option value="Mobile App Design">Mobile App Design</option>
                                <option value="Database Integration">Database Integration</option>
                                <option value="API Development">API Development</option>
                                <option value="UI/UX Enhancement">UI/UX Enhancement</option>
                            </select>
                            <select
                                value={formData.reportType}
                                onChange={(e) => setFormData({...formData, reportType: e.target.value})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                            >
                                <option value="Progress Update">Progress Update</option>
                                <option value="Completion Report">Completion Report</option>
                                <option value="Issue Report">Issue Report</option>
                                <option value="Daily Report">Daily Report</option>
                            </select>
                        </div>
                        
                        <input
                            type="text"
                            placeholder="Report Title"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            required
                        />
                        
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-32"
                            required
                        />
                        
                        <textarea
                            placeholder="Work Completed"
                            value={formData.workCompleted}
                            onChange={(e) => setFormData({...formData, workCompleted: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-24"
                            required
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="number"
                                placeholder="Hours Worked"
                                value={formData.hoursWorked}
                                onChange={(e) => setFormData({...formData, hoursWorked: parseFloat(e.target.value)})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                min="0"
                                step="0.5"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Progress %"
                                value={formData.progressPercentage}
                                onChange={(e) => setFormData({...formData, progressPercentage: parseInt(e.target.value)})}
                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                min="0"
                                max="100"
                            />
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.isCompleted}
                                onChange={(e) => setFormData({...formData, isCompleted: e.target.checked})}
                                className="mr-2"
                            />
                            <label className="text-sm">Mark task as completed</label>
                        </div>
                        
                        <div className="flex space-x-4">
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                Submit Report
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {reports.map((report) => (
                    <div key={report._id} className="bg-gray-900 p-6 rounded-xl border border-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{report.title}</h3>
                                <p className="text-sm text-gray-400">{typeof report.taskId === 'object' ? report.taskId?.title : report.taskId} - {report.reportType}</p>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    report.adminReview?.reviewed 
                                        ? (report.adminReview.approved ? 'bg-green-600 text-white' : 'bg-red-600 text-white')
                                        : 'bg-yellow-600 text-black'
                                }`}>
                                    {report.adminReview?.reviewed 
                                        ? (report.adminReview.approved ? '✓ Approved' : '✗ Rejected')
                                        : '⏳ Pending Review'
                                    }
                                </span>
                                {report.adminReview?.reviewed && (
                                    <span className="text-xs text-gray-400">
                                        {new Date(report.adminReview.reviewDate).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-300 mb-2">{report.description}</p>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Progress: {report.progressPercentage}%</span>
                            <span>Hours: {report.hoursWorked}</span>
                            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                        </div>
                        {report.adminReview?.feedback && (
                            <div className={`mt-4 p-3 rounded-lg border-l-4 ${
                                report.adminReview.approved 
                                    ? 'bg-green-900/30 border-green-500' 
                                    : 'bg-red-900/30 border-red-500'
                            }`}>
                                <p className="text-sm font-medium mb-1 flex items-center">
                                    {report.adminReview.approved ? '✓' : '✗'} Admin Feedback:
                                </p>
                                <p className="text-sm text-gray-300">{report.adminReview.feedback}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Reviewed on {new Date(report.adminReview.reviewDate).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const EmployeeProfile = ({ currentEmployee }) => {
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-8">Profile</h1>
            
            <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <p className="text-gray-300">{currentEmployee?.fullName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <p className="text-gray-300">{currentEmployee?.username}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <p className="text-gray-300">{currentEmployee?.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Position</label>
                        <p className="text-gray-300">{currentEmployee?.position}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <p className="text-gray-300">{currentEmployee?.department}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Hire Date</label>
                        <p className="text-gray-300">{new Date(currentEmployee?.hireDate).toLocaleDateString()}</p>
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

export default EmployeePortal;