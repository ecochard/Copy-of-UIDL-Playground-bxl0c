import React, { useState, useEffect } from "react";
import useFiles from "../lib/teleport/useFiles";
import useUidl from "../lib/teleport/useUidl";
import generateCode from "../lib/x4/x4generator";

import jszip from "jszip";

const UidlPlayground = () => {
  const files = useFiles();
  const uidl = useUidl();

  const [generated, setFiles] = useState({});

  useEffect(() => {
    generateCode(uidl).then( (res: any) => {
        console.log( res );
        debugger;
        setFiles( res );
    });
  }, []);

  const generateZip = () => {
    const zip = new jszip();
    Object.keys(files).forEach(name => {
        // @ts-ignore
        zip.file(name, files[name])
    })

    return zip.generateAsync({ type: "blob" })
  };

  const triggerDownload = (content: Blob, filename: string) => {
    const a = document.createElement("a");
    document.body.appendChild(a) as HTMLAnchorElement;
    a.style.display = "none";
    const url = window.URL.createObjectURL(content);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const download = async () => {
    const zip = await generateZip()
    triggerDownload(zip, 'files.zip')
  }

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>UIDL Playground</h2>
      <div
        style={{ display: "grid", gridTemplateColumns: "50% 50%", height: 400 }}
      >
        <div style={{ overflow: "hidden" }}>
          <textarea
            value={JSON.stringify(uidl, null, 2)}
            style={{
              border: "solid 1px #ccc",
              borderRightWidth: 0,
              overflow: "scroll",
              width: "100%",
              height: "100%",
            }}
          ></textarea>
        </div>
        <code style={{ border: "solid 1px #ccc", overflow: "scroll" }}>
          <pre> {JSON.stringify(generated, null, 2)}</pre>
        </code>
      </div>
      <h2 style={{ margin: "32px 0 16px" }}>Custom Code Files</h2>
      <pre>{JSON.stringify(files, null, 2)}</pre>
      <button onClick={download}>Download</button>
    </div>
  );
};

export default UidlPlayground;
