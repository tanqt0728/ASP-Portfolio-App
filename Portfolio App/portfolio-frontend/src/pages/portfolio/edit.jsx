import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import grapesjs from "grapesjs";
import plugin from "grapesjs-blocks-basic";
import { getPageByUserId, updatePage } from "../api/api";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Editor = () => {
  useAuth();

  const [editor, setEditor] = useState(null);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState("unpublished");
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const { pageId } = router.query;

  useEffect(() => {
    const fetchPageAndInitEditor = async () => {
      setIsLoading(true);
      try {
        const data = await getPageByUserId();
        if (data) {
          setPage(data);
          setVisibility(data.visibility);
          setSlug(data.slug);
          const editor = grapesjs.init({
            container: "#editor",
            plugins: [plugin],
            pluginOpts: {
              [plugin]: {},
            },
            components: data.components || "",
            style: data.styles || "",
          });
          editor.setComponents(data.html || "");
          editor.setStyle(data.css || "");
          setEditor(editor);
        } else {
          setError("Failed to load page data");
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        setError("Failed to fetch page");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageAndInitEditor();

    return () => editor?.destroy();
  }, [pageId]);

  const handleSave = async () => {
    if (editor && page) {
      const html = editor.getHtml();
      const css = editor.getCss();
      const components = JSON.stringify(editor.getComponents());
      const styles = JSON.stringify(editor.getStyle());

      try {
        const updatedPage = await updatePage(page._id, {
          name: page.name,
          html,
          css,
          components,
          styles,
          visibility,
          slug,
        });
        console.log("Page saved successfully:", updatedPage);
        alert("Page saved successfully.");
      } catch (error) {
        console.error("Failed to save page:", error);
        alert("Failed to save page. Please try again.");
      }
    } else {
      alert(
        "Editor or page data is not loaded properly. Please refresh and try again."
      );
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const url = `${protocol}//${host}/portfolio/${slug}`;
      navigator.clipboard.writeText(url).then(
        () => {
          toast.success("URL copied to clipboard!");
        },
        () => {
          toast.error("Failed to copy URL. Please try manually.");
        }
      );
    } else {
      console.error("Cannot execute this function server-side.");
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
        #editor {
          height: 100vh;
        }
      `}</style>

      <div className="App">
        <h2>{page?.name}</h2>
        <div>
          <label htmlFor="visibility">Visibility:</label>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>
        <div>
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <button
          onClick={handleSave}
          style={{ color: "black", marginTop: "10px" }}
        >
          Save
        </button>
        <button
          onClick={handleShare}
          style={{ color: "black", marginTop: "10px" }}
        >
          Share
        </button>
        <div id="editor"></div>
      </div>
    </div>
  );
};

export default Editor;
