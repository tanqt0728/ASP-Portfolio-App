import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import grapesjs from "grapesjs";
import plugin from 'grapesjs-blocks-basic'


function Editor() {
  const router = useRouter();
  const { pageId } = router.query;
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [plugin],
      pluginOpts: {
        [plugin]: {},
      },
    });
    setEditor(editor);

    return () => {
      editor.destroy();
    };

  }, [pageId]);

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
      </div>
    </div>
  );
}

export default Editor;
