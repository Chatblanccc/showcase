import { IProject } from "@/types/project";

// 动态判断环境：如果是开发环境(localhost)，用 /api 会被 Vite 代理
// 如果是生产环境，用 /api 会被 Nginx 转发
// 只要不写死 http://localhost:8000，就能适配所有环境
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
