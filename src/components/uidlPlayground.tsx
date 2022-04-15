import React, { useState, useEffect } from "react";
import useFiles from "../lib/teleport/useFiles";
import useUidl from "../lib/teleport/useUidl";
import { generateCode, FileContent } from "../lib/x4/x4generator";

import jszip from "jszip";

const UidlPlayground = () => {
  const files = useFiles();
  const uidl = useUidl();

  const [generated, setFiles] = useState({});

  useEffect(() => {
    generateCode(uidl).then((res: any) => {
      console.log(res);
      setFiles(res);
    });
  }, []);

  const generateZip = () => {
    const zip = new jszip();

    // on evite de downloader nos propres sources
    // Object.keys(files).forEach( name => {
    //   // @ts-ignore
    //   zip.file(name, files[name]);
    // });

    const gen = generated as FileContent[];

    gen.forEach( file => {
      // @ts-ignore
      zip.file(file.name, file.content );
    });

    return zip.generateAsync({ type: "blob" });
  };

  const triggerDownload = (content: Blob, filename: string) => {
    const url = window.URL.createObjectURL(content);

    const a = document.createElement("a");

    a.style.display = "none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a) as HTMLAnchorElement;
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };

  const download = async () => {
    const zip = await generateZip();
    triggerDownload(zip, "files.zip");
  };

  return (
    <div style={{ padding: 16 }} className="vlayout flex">
      <div className="vlayout flex" style={{ gap: 8 }}>
        <h2 style={{ marginBottom: 16, flex: 0 }}>UIDL Playground</h2>
        <div className="hlayout flex" style={{ gap: 8 }}>
          <pre className="flex code"> {JSON.stringify(uidl, null, 2)}</pre>
          <pre className="flex code"> {JSON.stringify(generated, null, 2)}</pre>
        </div>
      </div>
      <div className="vlayout flex">
        <h2 style={{ margin: "16px 0" }}>Custom Code Files</h2>
        <pre className="flex code">{JSON.stringify(files, null, 2)}</pre>
      </div>
      <div className="cmdbar">
        <button onClick={download}>Download</button>
      </div>
    </div>
  );
};

export default UidlPlayground;
