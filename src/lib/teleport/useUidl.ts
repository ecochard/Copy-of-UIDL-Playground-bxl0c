import { useEffect, useState } from "react";

function useTeleportUidl() {
  const [uidl, setUidl] = useState({});

  useEffect(() => {
    try {
        // @ts-ignore
      setUidl(JSON.parse(localStorage.getItem("teleportUidl")));
    } catch (err) {}
    const onMessage = (msg: MessageEvent) => {
      if (msg.data.type === "es-lint") {
        setUidl(msg.data.message.uidl);
        localStorage.setItem(
          "teleportUidl",
          JSON.stringify(msg.data.message.uidl)
        );
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);
  return uidl;
}

export default useTeleportUidl;
