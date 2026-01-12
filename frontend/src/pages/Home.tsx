import { useEffect, useState } from "react";
import { IProject } from "@/types/project";
import { getProjects } from "@/services/api";
import { ProjectCard } from "@/components/ProjectCard";

export const Home = () => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects().then(setProjects).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-center">加载中...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">项目展示</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
            {projects.length === 0 && (
                <p className="text-gray-500 text-center">暂无项目。</p>
            )}
        </div>
    );
};
