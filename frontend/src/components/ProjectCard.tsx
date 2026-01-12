import { IProject } from "@/types/project";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: IProject;
    className?: string;
}

export const ProjectCard = ({ project, className }: ProjectCardProps) => {
    return (
        <Link 
            to={`/project/${project.slug}`} 
            className={cn("group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all", className)}
        >
            <div className="aspect-video w-full bg-gray-100 relative overflow-hidden">
                {project.cover_image ? (
                    <img 
                        src={project.cover_image} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        暂无图片
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
            </div>
        </Link>
    );
};
