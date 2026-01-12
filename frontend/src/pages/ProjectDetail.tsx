import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IProject } from "@/types/project";
import { getProject } from "@/services/api";
import { GameFrame } from "@/components/GameFrame";
import { ArrowLeft } from "lucide-react";

export const ProjectDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<IProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            getProject(slug)
                .then(setProject)
                .catch((e) => setError(e.message))
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) return <div className="p-8 text-center">加载中...</div>;
    if (error || !project) return <div className="p-8 text-center text-red-500">错误: {error || "未找到该项目"}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-4">
                <ArrowLeft size={16} className="mr-1" /> 返回首页
            </Link>
            
            <div className="mb-6">
                <GameFrame project={project} />
            </div>

            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-gray-600 whitespace-pre-wrap">{project.description}</p>
        </div>
    );
};
