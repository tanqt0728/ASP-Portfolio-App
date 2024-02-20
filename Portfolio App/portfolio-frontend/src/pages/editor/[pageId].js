import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import grapesjs from "grapesjs";
import plugin from "grapesjs-blocks-basic";
import { update_page, loadPageFromBackend } from "../api/api";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const router = useRouter();
  const { pageId } = router.query;

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",

      plugins: [plugin],
      pluginOpts: {
        [plugin]: {},
      },
    });
    setEditor(editor);

    if (pageId) {
      loadPageFromBackend(pageId, editor);
    }

    return () => {
      editor.destroy();
    };
  }, [pageId]);

  const savePageToBackend = async () => {
    const pageContent = editor.getProjectData();
    try {
      await update_page(pageId, pageContent);
      console.log("Page saved successfully");
    } catch (error) {
      console.error("Error saving page to backend:", error);
    }
  };

  return (
    <div>
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

      <div className="App">
        <div id="editor"></div>
        <button onClick={savePageToBackend}>Save Page</button>
      </div>
    </div>
  );
};

export default Editor;
