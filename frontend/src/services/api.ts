import { IProject } from "@/types/project";

// 在生产环境使用相对路径，由 Nginx 转发；开发环境通过 Vite 代理
const API_URL = "/api";

export const getProjects = async (): Promise<IProject[]> => {
    const response = await fetch(`${API_URL}/projects/`);
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json();
};

export const getProject = async (slug: string): Promise<IProject> => {
    const response = await fetch(`${API_URL}/projects/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch project");
    return response.json();
};
