import { IProject } from "@/types/project";
import { useRef, useState } from "react";
import { Maximize2, RefreshCw } from "lucide-react";

interface GameFrameProps {
    project: IProject;
}

export const GameFrame = ({ project }: GameFrameProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [key, setKey] = useState(0); // To force reload

    const handleReload = () => setKey(prev => prev + 1);
    const handleFullscreen = () => {
        if (iframeRef.current) {
            if (iframeRef.current.requestFullscreen) {
                iframeRef.current.requestFullscreen();
            }
        }
    };

    const gameUrl = `/static/games/${project.slug}/${project.entry_point}`;

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-gray-800">
             <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                    onClick={handleReload}
                    className="p-2 bg-gray-800/80 text-white rounded hover:bg-gray-700 backdrop-blur-sm"
                    title="刷新"
                >
                    <RefreshCw size={18} />
                </button>
                <button 
                    onClick={handleFullscreen}
                    className="p-2 bg-gray-800/80 text-white rounded hover:bg-gray-700 backdrop-blur-sm"
                    title="全屏"
                >
                    <Maximize2 size={18} />
                </button>
            </div>
            <iframe
                key={key}
                ref={iframeRef}
                src={gameUrl}
                className="w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
    );
};
