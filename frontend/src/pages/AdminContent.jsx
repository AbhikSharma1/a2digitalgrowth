import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const ContentManager = () => {
    const [contents, setContents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [selectedPage, setSelectedPage] = useState('home');
    const [formData, setFormData] = useState({
        page: 'home',
        title: '',
        content: '',
        type: 'text'
    });

    const fetchContents = async (page = '') => {
        try {
            const token = localStorage.getItem('adminToken');
            const url = page ? `http://localhost:5000/api/admin/content?page=${page}` : 'http://localhost:5000/api/admin/content';
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setContents(data);
            }
        } catch (error) {
            console.error('Failed to fetch contents:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const url = editingContent 
                ? `http://localhost:5000/api/admin/content/${editingContent._id}`
                : 'http://localhost:5000/api/admin/content';
            
            const response = await fetch(url, {
                method: editingContent ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                fetchContents(selectedPage);
                setShowForm(false);
                setEditingContent(null);
                setFormData({ page: selectedPage, title: '', content: '', type: 'text' });
            }
        } catch (error) {
            console.error('Failed to save content:', error);
        }
    };

    const deleteContent = async (contentId) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://localhost:5000/api/admin/content/${contentId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    fetchContents(selectedPage);
                }
            } catch (error) {
                console.error('Failed to delete content:', error);
            }
        }
    };

    useEffect(() => {
        fetchContents(selectedPage);
    }, [selectedPage]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Content Management</h1>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value)}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    >
                        <option value="home">Home Page</option>
                        <option value="about">About Page</option>
                        <option value="services">Services Page</option>
                        <option value="portfolio">Portfolio Page</option>
                        <option value="career">Career Page</option>
                        <option value="contact">Contact Page</option>
                    </select>
                    <button
                        onClick={() => {
                            setFormData({page: selectedPage, title: '', content: '', type: 'text'});
                            setShowForm(true);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                    >
                        <Plus size={20} />
                        <span>Add Content</span>
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Content Title (e.g., Hero Heading, About Description)"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            required
                        />
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        >
                            <option value="text">Text</option>
                            <option value="image">Image URL</option>
                            <option value="html">HTML Content</option>
                        </select>
                        {formData.type === 'image' ? (
                            <div className="space-y-2">
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                    required
                                />
                                {formData.content && (
                                    <img src={formData.content} alt="Preview" className="w-32 h-32 object-cover rounded" />
                                )}
                            </div>
                        ) : (
                            <textarea
                                placeholder={formData.type === 'html' ? 'HTML Content' : 'Text Content'}
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-32"
                                required
                            />
                        )}
                        <div className="flex space-x-4">
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                <Save size={16} className="inline mr-2" />
                                Save
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
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Content</th>
                                <th className="px-6 py-3 text-left">Type</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contents.map((content) => (
                                <tr key={content._id} className="border-t border-gray-700">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">{content.title || content.key}</div>
                                        <div className="text-sm text-gray-400">{content.page}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs">
                                            {content.type === 'image' ? (
                                                <img src={content.content || content.value} alt={content.title} className="w-16 h-16 object-cover rounded" />
                                            ) : (
                                                <span className="truncate block">{content.content || content.value}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-700 text-xs rounded">{content.type || 'text'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingContent(content);
                                                    setFormData({
                                                        page: content.page,
                                                        title: content.title || content.key || '',
                                                        content: content.content || content.value || '',
                                                        type: content.type || 'text'
                                                    });
                                                    setShowForm(true);
                                                }}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => deleteContent(content._id)}
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

export default ContentManager;