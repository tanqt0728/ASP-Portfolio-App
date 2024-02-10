// Editor.js
import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage"
import styles from "../components/editor.module.scss";

function Editor() {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editorInstance = grapesjs.init({
      container: "#editor",
      plugins: [gjsPresetWebpage],
      pluginsOpts:{
        gjsPresetWebpage:{}
      }
      // Add more options as needed
    });

    setEditor(editorInstance);

    // Cleanup function to destroy the editor on component unmount
    return () => {
      editorInstance.destroy();
    };
  }, []);

  return (
    <div className={styles.App}>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }

        html {
          overflow: scroll;
          overflow-x: hidden;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        html::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div id="editor"></div>
    </div>
  );
}

export default Editor;
