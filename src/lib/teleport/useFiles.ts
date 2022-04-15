import { useEffect, useState } from "react";

function useTeleportFiles() {
  const [files, setFiles] = useState({});

  useEffect(() => {
    try {
      // @ts-ignore
      setFiles(JSON.parse(localStorage.getItem("teleportFiles")));
    } catch (err) {}
    const onMessage = (msg: MessageEvent) => {
      if (msg.data.type === "es-lint") {
        const cleaned: Record<string, string> = {};
        // @ts-ignore
        Object.keys(msg.data.message.allFiles).forEach(
          (file) =>
            (cleaned[file.substring(23)] = msg.data.message.allFiles[file])
        );
        console.log(msg.data.message);
        setFiles(cleaned);
        localStorage.setItem("teleportFiles", JSON.stringify(cleaned));
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);
  return files;
}

export default useTeleportFiles;
