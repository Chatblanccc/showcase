import { useState } from "react";
import { ArrowLeft, Upload, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

export const Admin = () => {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [showGuide, setShowGuide] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);
        setMessage("");

        const formData = new FormData(e.currentTarget);
        
        try {
            const res = await fetch("/api/projects/", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || "上传失败");
            }
            setMessage("项目上传成功！");
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            setMessage(`错误: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-8">
                <ArrowLeft size={16} className="mr-1" /> 返回首页
            </Link>

            <h1 className="text-3xl font-bold mb-6">上传新项目</h1>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <button 
                    type="button"
                    onClick={() => setShowGuide(!showGuide)}
                    className="flex items-center justify-between w-full text-blue-800 font-medium hover:text-blue-900"
                >
                    <span className="flex items-center gap-2">
                        <Info size={18} />
                        关于前后端分离项目的打包指南
                    </span>
                    {showGuide ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {showGuide && (
                    <div className="mt-3 text-sm text-blue-700 space-y-2 border-t border-blue-200 pt-3">
                        <p>本平台支持 React, Vue, Cocos Creator 等现代框架构建的 Web 游戏。</p>
                        <p className="font-bold">⚠️ 关键配置说明：</p>
                        <ul className="list-disc list-inside space-y-1 ml-1">
                            <li>
                                <strong>资源路径问题：</strong> 项目将被托管在子目录中（如 <code>/static/games/my-game/</code>）。
                                请务必将构建工具的 <strong>Base URL (公共路径)</strong> 设置为相对路径 <code>./</code>，否则 CSS/JS 资源将加载失败。
                            </li>
                            <li className="mt-2 text-xs bg-white p-2 rounded border border-blue-100">
                                <strong>Vite (React/Vue):</strong> 在 <code>vite.config.ts</code> 中设置 <code>base: './'</code><br/>
                                <strong>Create React App:</strong> 在 <code>package.json</code> 中设置 <code>"homepage": "."</code><br/>
                                <strong>Cocos Creator:</strong> 构建发布时设置 MD5 Cache 并确认资源路径为相对路径。
                            </li>
                            <li className="mt-2">
                                <strong>路由模式：</strong> 推荐使用 <code>HashRouter</code> (React) 或 <code>HashWebHistory</code> (Vue)。如果使用 History 模式，刷新页面可能会 404。
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow border border-gray-200">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                    <input name="title" required className="w-full border rounded px-3 py-2" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL标识)</label>
                    <input name="slug" required className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                    <textarea name="description" className="w-full border rounded px-3 py-2" rows={3} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">游戏包 (Zip格式)</label>
                    <input type="file" name="file" accept=".zip" required className="w-full" />
                    <p className="text-xs text-gray-500 mt-1">压缩包内必须包含 index.html</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">封面图片</label>
                    <input type="file" name="cover" accept="image/*" className="w-full" />
                </div>

                {message && (
                    <div className={`p-3 rounded ${message.startsWith("Error") || message.startsWith("错误") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                        {message}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={uploading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {uploading ? "上传中..." : <><Upload size={18} /> 上传项目</>}
                </button>
            </form>
        </div>
    );
};
