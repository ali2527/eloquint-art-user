import CreativeEditorSDK from "@cesdk/cesdk-js";

import { useEffect, useRef, useState } from "react";

const config = {
    theme: "light",
    baseURL: "https://cdn.img.ly/packages/imgly/cesdk-js/1.14.0/assets",
    ui: {
      elements: {
        view: "default",
        panels: {
          settings: true,
        },
        navigation: {
          position: "top",
          action: {
            save: true,
            load: true,
            download: true,
            export: true,
          },
        },
      },
    },
    callbacks: {
      onUpload: "local",
      onSave: (scene) => {
        const element = document.createElement("a");
        const base64Data = btoa(unescape(encodeURIComponent(scene)));
        element.setAttribute(
          "href",
          `data:application/octet-stream;base64,${base64Data}`
        );
        element.setAttribute(
          "download",
          `cesdk-${new Date().toISOString()}.scene`
        );
  
        element.style.display = "none";
        document.body.appendChild(element);
  
        element.click();
  
        document.body.removeChild(element);
      },
      onLoad: "upload",
      onDownload: "download",
      onExport: "download",
    },
  };
  

function Editor() {
    const cesdk_container = useRef(null);
    const [cesdk, setCesdk] = useState(null);
    useEffect(() => {
      if (!cesdk_container.current) return;
  
      let cleanedUp = false;
      let instance;
      CreativeEditorSDK.create(cesdk_container.current, config).then(
        async (_instance) => {
          instance = _instance;
          if (cleanedUp) {
            instance.dispose();
            return;
          }
  
          // Do something with the instance of CreativeEditor SDK, for example:
          // Populate the asset library with default / demo asset sources.
          await Promise.all([
            instance.addDefaultAssetSources(),
            instance.addDemoAssetSources({ sceneMode: "Design" }),
          ]);
          await instance.createDesignScene();
  
          setCesdk(instance);
        }
      );
      const cleanup = () => {
        cleanedUp = true;
        instance?.dispose();
        setCesdk(null);
      };
      return cleanup;
    }, [cesdk_container]);

  return (
    <div
    ref={cesdk_container}
    style={{ width: "100vw", height: "100vh" }}
  ></div>
  )
}

export default Editor